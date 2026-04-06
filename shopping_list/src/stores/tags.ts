import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'
import type { Tag } from '../types'
import { showError } from '@nextcloud/dialogs'

export const useTagsStore = defineStore('tags', () => {
	const tags = ref<Tag[]>([])

	async function fetchAll() {
		try {
			const response = await api.tags.getAll()
			tags.value = response.data.ocs.data
		} catch (e) {
			showError('Failed to load tags')
			console.error(e)
		}
	}

	async function create(name: string) {
		try {
			const response = await api.tags.create(name)
			const newTag: Tag = response.data.ocs.data
			tags.value.push(newTag)
			return newTag
		} catch (e) {
			showError('Failed to create tag')
			console.error(e)
		}
	}

	async function remove(id: number) {
		try {
			await api.tags.delete(id)
			tags.value = tags.value.filter(t => t.id !== id)
		} catch (e) {
			showError('Failed to delete tag')
			console.error(e)
		}
	}

	return {
		tags,
		fetchAll,
		create,
		remove,
	}
})
