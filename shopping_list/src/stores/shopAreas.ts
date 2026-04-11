import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'
import type { ShopArea } from '../types'
import { showError } from '@nextcloud/dialogs'

export const useShopAreasStore = defineStore('shopAreas', () => {
	const areasByList = ref<Record<number, ShopArea[]>>({})

	async function fetchByList(listId: number) {
		try {
			const response = await api.areas.getForList(listId)
			areasByList.value[listId] = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shop areas')
			console.error(e)
		}
	}

	async function create(listId: number, name: string, color?: string, keywords?: string[]) {
		try {
			const response = await api.areas.create(listId, name, color, keywords)
			const newArea: ShopArea = response.data.ocs.data
			if (!areasByList.value[listId]) {
				areasByList.value[listId] = []
			}
			areasByList.value[listId].push(newArea)
			return newArea
		} catch (e) {
			showError('Failed to create shop area')
			console.error(e)
		}
	}

	async function update(listId: number, id: number, data: Record<string, unknown>) {
		try {
			const response = await api.areas.update(listId, id, data)
			const updated: ShopArea = response.data.ocs.data
			const areas = areasByList.value[listId]
			if (areas) {
				const idx = areas.findIndex(a => a.id === id)
				if (idx !== -1) {
					areas[idx] = updated
				}
			}
		} catch (e) {
			showError('Failed to update shop area')
			console.error(e)
		}
	}

	async function remove(listId: number, id: number) {
		try {
			await api.areas.delete(listId, id)
			if (areasByList.value[listId]) {
				areasByList.value[listId] = areasByList.value[listId].filter(a => a.id !== id)
			}
		} catch (e) {
			showError('Failed to delete shop area')
			console.error(e)
		}
	}

	return {
		areasByList,
		fetchByList,
		create,
		update,
		remove,
	}
})
