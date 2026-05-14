import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../composables/useApi'
import type { Item } from '../types'
import { useListsStore } from './lists'
import { useShopAreasStore } from './shopAreas'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { findMatchingItem, mergeQuantities, pluralizeName } from '../utils/itemMerge'
import { enqueue } from '../offline/mutationQueue'
import { useNetworkStatus, isNetworkError } from '../offline/networkStatus'
import { markServerFetched } from '../offline/piniaPlugin'

export const useItemsStore = defineStore('items', () => {
	const itemsByList = ref<Record<number, Item[]>>({})
	const loading = ref(false)

	const listsStore = useListsStore()
	const { isOnline } = useNetworkStatus()

	const currentItems = computed(() => {
		if (!listsStore.currentListId) return []
		return itemsByList.value[listsStore.currentListId] ?? []
	})

	const uncheckedItems = computed(() =>
		currentItems.value.filter(i => !i.checked),
	)

	const checkedItems = computed(() =>
		currentItems.value.filter(i => i.checked),
	)

	const itemsByArea = computed(() => {
		const grouped: Record<number | 'none', Item[]> = { none: [] }
		for (const item of uncheckedItems.value) {
			const key = item.shopAreaId ?? 'none'
			if (!grouped[key]) grouped[key] = []
			grouped[key].push(item)
		}
		return grouped
	})

	async function fetchByList(listId: number) {
		const isInitialLoad = !(listId in itemsByList.value)
		if (isInitialLoad) {
			loading.value = true
		}
		try {
			const response = await api.items.getAll(listId)
			itemsByList.value[listId] = response.data.ocs.data
			markServerFetched('items')
		} catch (e) {
			// Only show error if we have no cached data
			if (isInitialLoad) {
				showError(t('shopping_list', 'Failed to load items'))
			}
			console.error(e)
		} finally {
			if (isInitialLoad) {
				loading.value = false
			}
		}
	}

	async function create(listId: number, data: Record<string, unknown>) {
		try {
			const existingItems = itemsByList.value[listId] ?? []
			const match = findMatchingItem(existingItems, data.name as string)

			if (match) {
				const merged = mergeQuantities(match.quantity, data.quantity as string | null)
				const updateData: Record<string, unknown> = { quantity: merged }

				const oldQty = parseFloat(match.quantity ?? '')
				const newQty = parseFloat(merged)
				if (oldQty <= 1 && newQty > 1) {
					updateData.name = pluralizeName(match.name)
				}

				// Optimistic update
				const items = itemsByList.value[listId] ?? []
				const idx = items.findIndex(i => i.id === match.id)
				if (idx !== -1) {
					items[idx] = { ...items[idx], ...updateData }
				}

				if (!isOnline.value) {
					await enqueue({ type: 'item.update', listId, itemId: match.id, payload: updateData })
					showSuccess(t('shopping_list', '"{name}" updated — quantity merged', { name: (updateData.name ?? match.name) as string }))
					return
				}

				try {
					await api.items.update(listId, match.id, updateData)
					await fetchByList(listId)
				} catch (e) {
					if (isNetworkError(e)) {
						await enqueue({ type: 'item.update', listId, itemId: match.id, payload: updateData })
					} else {
						// Revert optimistic update
						if (idx !== -1) items[idx] = match
						throw e
					}
				}
				showSuccess(t('shopping_list', '"{name}" updated — quantity merged', { name: (updateData.name ?? match.name) as string }))
				return
			}

			// New item — create with temp ID for optimistic insert
			const tempId = -(Date.now())
			const tempItem: Item = {
				id: tempId,
				listId,
				name: data.name as string,
				quantity: (data.quantity as string) ?? '1',
				unit: (data.unit as string) ?? null,
				shopAreaId: (data.shopAreaId as number) ?? null,
				checked: false,
				checkedBy: null,
				sortOrder: existingItems.length,
				tags: [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			}

			if (!itemsByList.value[listId]) itemsByList.value[listId] = []
			itemsByList.value[listId].push(tempItem)

			if (!isOnline.value) {
				await enqueue({ type: 'item.create', listId, payload: data, tempId: String(tempId) })
				return
			}

			try {
				await api.items.create(listId, data)
				await fetchByList(listId)

				if (data.areaExplicit) {
					const shopAreasStore = useShopAreasStore()
					await shopAreasStore.fetchByList(listId)
				}
			} catch (e) {
				if (isNetworkError(e)) {
					await enqueue({ type: 'item.create', listId, payload: data, tempId: String(tempId) })
				} else {
					// Revert — remove temp item
					const items = itemsByList.value[listId]
					const tidx = items.findIndex(i => i.id === tempId)
					if (tidx !== -1) items.splice(tidx, 1)
					throw e
				}
			}
		} catch (e) {
			showError(t('shopping_list', 'Failed to add item'))
			console.error(e)
		}
	}

	async function update(listId: number, id: number, data: Record<string, unknown>) {
		const items = itemsByList.value[listId] ?? []
		const index = items.findIndex(i => i.id === id)
		const previous = index !== -1 ? { ...items[index] } : null

		// Optimistic update
		if (index !== -1) {
			items[index] = { ...items[index], ...data } as Item
		}

		if (!isOnline.value) {
			await enqueue({ type: 'item.update', listId, itemId: id, payload: data })
			return items[index]
		}

		try {
			const response = await api.items.update(listId, id, data)
			const updated: Item = response.data.ocs.data
			if (index !== -1) {
				items[index] = updated
			}

			if (data.areaExplicit) {
				const shopAreasStore = useShopAreasStore()
				await shopAreasStore.fetchByList(listId)
			}

			return updated
		} catch (e) {
			if (isNetworkError(e)) {
				await enqueue({ type: 'item.update', listId, itemId: id, payload: data })
				return items[index]
			}
			// Revert on non-network error
			if (previous && index !== -1) {
				items[index] = previous as Item
			}
			showError(t('shopping_list', 'Failed to update item'))
			console.error(e)
		}
	}

	async function toggleCheck(listId: number, id: number) {
		const items = itemsByList.value[listId] ?? []
		const item = items.find(i => i.id === id)
		if (!item) return

		// Optimistic update
		const previousState = item.checked
		item.checked = !item.checked

		if (!isOnline.value) {
			await enqueue({ type: 'item.check', listId, itemId: id, payload: { checked: item.checked } })
			return
		}

		try {
			await api.items.check(listId, id, item.checked)
		} catch (e) {
			if (isNetworkError(e)) {
				await enqueue({ type: 'item.check', listId, itemId: id, payload: { checked: item.checked } })
			} else {
				item.checked = previousState
				showError(t('shopping_list', 'Failed to update item'))
				console.error(e)
			}
		}
	}

	async function remove(listId: number, id: number) {
		const items = itemsByList.value[listId] ?? []
		const index = items.findIndex(i => i.id === id)
		if (index === -1) return

		// Optimistic delete
		const removed = items.splice(index, 1)[0]

		if (!isOnline.value) {
			// Don't queue deletes for temp items that haven't been synced yet
			if (id > 0) {
				await enqueue({ type: 'item.delete', listId, itemId: id, payload: {} })
			}
			return
		}

		try {
			await api.items.delete(listId, id)
		} catch (e) {
			if (isNetworkError(e)) {
				if (id > 0) {
					await enqueue({ type: 'item.delete', listId, itemId: id, payload: {} })
				}
			} else {
				items.splice(index, 0, removed)
				showError(t('shopping_list', 'Failed to delete item'))
				console.error(e)
			}
		}
	}

	async function reorder(listId: number, sortedIds: number[]) {
		// Optimistic: update local sort orders
		const items = itemsByList.value[listId] ?? []
		sortedIds.forEach((id, i) => {
			const item = items.find(it => it.id === id)
			if (item) item.sortOrder = i
		})

		if (!isOnline.value) {
			await enqueue({ type: 'item.reorder', listId, payload: { sortedIds } })
			return
		}

		try {
			await api.items.reorder(listId, sortedIds)
		} catch (e) {
			if (isNetworkError(e)) {
				await enqueue({ type: 'item.reorder', listId, payload: { sortedIds } })
			} else {
				showError(t('shopping_list', 'Failed to reorder items'))
				console.error(e)
			}
		}
	}

	async function clearChecked(listId: number) {
		const items = itemsByList.value[listId] ?? []
		const previousItems = [...items]

		// Optimistic
		itemsByList.value[listId] = items.filter(i => !i.checked)

		if (!isOnline.value) {
			await enqueue({ type: 'item.clearChecked', listId, payload: {} })
			return
		}

		try {
			await api.items.clearChecked(listId)
		} catch (e) {
			if (isNetworkError(e)) {
				await enqueue({ type: 'item.clearChecked', listId, payload: {} })
			} else {
				itemsByList.value[listId] = previousItems
				showError(t('shopping_list', 'Failed to clear checked items'))
				console.error(e)
			}
		}
	}

	async function uncheckAll(listId: number) {
		const items = itemsByList.value[listId] ?? []
		const previousStates = items.map(i => ({ id: i.id, checked: i.checked }))

		// Optimistic
		items.forEach(i => { i.checked = false })

		if (!isOnline.value) {
			await enqueue({ type: 'item.uncheckAll', listId, payload: {} })
			return
		}

		try {
			await api.items.uncheckAll(listId)
		} catch (e) {
			if (isNetworkError(e)) {
				await enqueue({ type: 'item.uncheckAll', listId, payload: {} })
			} else {
				previousStates.forEach(({ id, checked }) => {
					const item = items.find(i => i.id === id)
					if (item) item.checked = checked
				})
				showError(t('shopping_list', 'Failed to uncheck items'))
				console.error(e)
			}
		}
	}

	/** Replace a temp ID with the real server ID after sync */
	function replaceTempId(listId: number, tempId: number, realItem: Item) {
		const items = itemsByList.value[listId]
		if (!items) return
		const idx = items.findIndex(i => i.id === tempId)
		if (idx !== -1) {
			items[idx] = realItem
		}
	}

	return {
		itemsByList,
		loading,
		currentItems,
		uncheckedItems,
		checkedItems,
		itemsByArea,
		fetchByList,
		create,
		update,
		toggleCheck,
		remove,
		reorder,
		clearChecked,
		uncheckAll,
		replaceTempId,
	}
})
