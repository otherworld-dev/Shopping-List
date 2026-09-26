import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../composables/useApi'
import type { ShoppingList } from '../types'
import { showError } from '@nextcloud/dialogs'
import { getLanguage, t } from '@nextcloud/l10n'
import { loadState } from '@nextcloud/initial-state'
import { readListSort, sortLists } from '../utils/listSort'
import type { ListSort, SectionKey } from '../utils/listSort'
import { freezeOrder, planListReorder } from '../utils/listReorder'
import { markServerFetched } from '../offline/piniaPlugin'

export const useListsStore = defineStore('lists', () => {
	const lists = ref<ShoppingList[]>([])
	const currentListId = ref<number | null>(null)
	const loading = ref(false)

	const currentList = computed(() =>
		lists.value.find(l => l.id === currentListId.value) ?? null,
	)

	const ownedLists = computed(() =>
		lists.value.filter(l => l.isOwner),
	)

	const sharedLists = computed(() =>
		lists.value.filter(l => !l.isOwner),
	)

	const listSort = ref<ListSort>(readListSort(loadState<{ listSort?: string }>('shopping_list', 'settings', {}).listSort))
	const language = getLanguage()
	const sections = computed(() => sortLists(lists.value, listSort.value, language))
	const pinnedLists = computed(() => sections.value.pinned)
	const unpinnedOwnedLists = computed(() => sections.value.owned)
	const unpinnedSharedLists = computed(() => sections.value.shared)

	async function fetchAll() {
		loading.value = true
		try {
			const response = await api.lists.getAll()
			lists.value = response.data.ocs.data
			markServerFetched('lists')
		} catch (e) {
			showError(t('shopping_list', 'Failed to load shopping lists'))
			console.error(e)
		} finally {
			loading.value = false
		}
	}

	async function create(title: string) {
		try {
			const response = await api.lists.create(title)
			const newList: ShoppingList = response.data.ocs.data
			lists.value.unshift(newList)
			currentListId.value = newList.id
			return newList
		} catch (e) {
			showError(t('shopping_list', 'Failed to create list'))
			console.error(e)
		}
	}

	async function update(id: number, title: string) {
		try {
			const response = await api.lists.update(id, title)
			const updated: ShoppingList = response.data.ocs.data
			const index = lists.value.findIndex(l => l.id === id)
			if (index !== -1) {
				lists.value[index] = updated
			}
			return updated
		} catch (e) {
			showError(t('shopping_list', 'Failed to update list'))
			console.error(e)
		}
	}

	async function remove(id: number) {
		try {
			await api.lists.delete(id)
			lists.value = lists.value.filter(l => l.id !== id)
			if (currentListId.value === id) {
				currentListId.value = lists.value[0]?.id ?? null
			}
		} catch (e) {
			showError(t('shopping_list', 'Failed to delete list'))
			console.error(e)
		}
	}

	function selectList(id: number) {
		currentListId.value = id
	}

	async function setPinned(id: number, isPinned: boolean) {
		try {
			await api.lists.setPinned(id, isPinned)
			const list = lists.value.find(l => l.id === id)
			if (list) {
				list.isPinned = isPinned
				list.position = null
			}
		} catch (e) {
			showError(isPinned
				? t('shopping_list', 'Failed to pin list')
				: t('shopping_list', 'Failed to unpin list'))
			console.error(e)
		}
	}

	/** Show a new order at once; the server confirms it or the lists are fetched again. */
	function applyPositions(ids: number[]) {
		ids.forEach((id, index) => {
			const list = lists.value.find(l => l.id === id)
			if (list) list.position = index
		})
	}

	async function reorderSection(key: SectionKey, ids: number[]) {
		const previous = listSort.value
		const plan = planListReorder(sections.value, key, ids, previous)
		plan.saves.forEach(applyPositions)
		if (plan.switchToCustom) listSort.value = 'custom'
		try {
			for (const save of plan.saves) await api.lists.reorder(save)
			if (plan.switchToCustom) await api.settings.update({ listSort: 'custom' })
		} catch (e) {
			listSort.value = previous
			showError(t('shopping_list', 'Failed to save the list order'))
			console.error(e)
			await fetchAll()
		}
	}

	async function setListSort(mode: ListSort) {
		if (mode === listSort.value) return
		const previous = listSort.value
		// Switching to Custom keeps the order on screen, so nothing jumps.
		const saves = mode === 'custom' ? freezeOrder(sections.value) : []
		saves.forEach(applyPositions)
		listSort.value = mode
		try {
			for (const save of saves) await api.lists.reorder(save)
			await api.settings.update({ listSort: mode })
		} catch (e) {
			listSort.value = previous
			showError(t('shopping_list', 'Failed to save setting'))
			console.error(e)
			await fetchAll()
		}
	}

	return {
		lists,
		currentListId,
		loading,
		currentList,
		ownedLists,
		sharedLists,
		pinnedLists,
		unpinnedOwnedLists,
		unpinnedSharedLists,
		listSort,
		sections,
		fetchAll,
		create,
		update,
		remove,
		selectList,
		setPinned,
		reorderSection,
		setListSort,
	}
})
