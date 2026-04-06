import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../composables/useApi'
import type { ShoppingList } from '../types'
import { showError } from '@nextcloud/dialogs'

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

	async function fetchAll() {
		loading.value = true
		try {
			const response = await api.lists.getAll()
			lists.value = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shopping lists')
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
			showError('Failed to create list')
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
			showError('Failed to update list')
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
			showError('Failed to delete list')
			console.error(e)
		}
	}

	function selectList(id: number) {
		currentListId.value = id
	}

	return {
		lists,
		currentListId,
		loading,
		currentList,
		ownedLists,
		sharedLists,
		fetchAll,
		create,
		update,
		remove,
		selectList,
	}
})
