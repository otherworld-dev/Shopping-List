import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'
import type { ShopArea } from '../types'
import { showError } from '@nextcloud/dialogs'

export const useShopAreasStore = defineStore('shopAreas', () => {
	const areasByList = ref<Record<number, ShopArea[]>>({})

	async function fetchByList(listId: number) {
		try {
			const response = await api.areas.getAll(listId)
			areasByList.value[listId] = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shop areas')
			console.error(e)
		}
	}

	async function create(listId: number, name: string, color?: string) {
		try {
			const response = await api.areas.create(listId, name, color)
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

	async function update(id: number, data: Record<string, unknown>, listId: number) {
		try {
			const response = await api.areas.update(id, data)
			const updated: ShopArea = response.data.ocs.data
			const areas = areasByList.value[listId] ?? []
			const index = areas.findIndex(a => a.id === id)
			if (index !== -1) {
				areas[index] = updated
			}
		} catch (e) {
			showError('Failed to update shop area')
			console.error(e)
		}
	}

	async function remove(id: number, listId: number) {
		try {
			await api.areas.delete(id)
			const areas = areasByList.value[listId] ?? []
			areasByList.value[listId] = areas.filter(a => a.id !== id)
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
