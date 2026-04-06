import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../composables/useApi'
import type { Item } from '../types'
import { useListsStore } from './lists'
import { showError } from '@nextcloud/dialogs'

export const useItemsStore = defineStore('items', () => {
	const itemsByList = ref<Record<number, Item[]>>({})
	const loading = ref(false)

	const listsStore = useListsStore()

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
		} catch (e) {
			showError('Failed to load items')
			console.error(e)
		} finally {
			if (isInitialLoad) {
				loading.value = false
			}
		}
	}

	async function create(listId: number, data: Record<string, unknown>) {
		try {
			await api.items.create(listId, data)
			await fetchByList(listId)
		} catch (e) {
			showError('Failed to add item')
			console.error(e)
		}
	}

	async function update(listId: number, id: number, data: Record<string, unknown>) {
		try {
			const response = await api.items.update(listId, id, data)
			const updated: Item = response.data.ocs.data
			const items = itemsByList.value[listId] ?? []
			const index = items.findIndex(i => i.id === id)
			if (index !== -1) {
				items[index] = updated
			}
			return updated
		} catch (e) {
			showError('Failed to update item')
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

		try {
			await api.items.check(listId, id, item.checked)
		} catch (e) {
			// Revert on failure
			item.checked = previousState
			showError('Failed to update item')
			console.error(e)
		}
	}

	async function remove(listId: number, id: number) {
		const items = itemsByList.value[listId] ?? []
		const index = items.findIndex(i => i.id === id)
		if (index === -1) return

		// Optimistic delete
		const removed = items.splice(index, 1)[0]

		try {
			await api.items.delete(listId, id)
		} catch (e) {
			// Revert on failure
			items.splice(index, 0, removed)
			showError('Failed to delete item')
			console.error(e)
		}
	}

	async function reorder(listId: number, sortedIds: number[]) {
		try {
			await api.items.reorder(listId, sortedIds)
		} catch (e) {
			showError('Failed to reorder items')
			console.error(e)
		}
	}

	async function clearChecked(listId: number) {
		try {
			await api.items.clearChecked(listId)
			const items = itemsByList.value[listId] ?? []
			itemsByList.value[listId] = items.filter(i => !i.checked)
		} catch (e) {
			showError('Failed to clear checked items')
			console.error(e)
		}
	}

	async function uncheckAll(listId: number) {
		try {
			await api.items.uncheckAll(listId)
			const items = itemsByList.value[listId] ?? []
			items.forEach(i => { i.checked = false })
		} catch (e) {
			showError('Failed to uncheck items')
			console.error(e)
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
	}
})
