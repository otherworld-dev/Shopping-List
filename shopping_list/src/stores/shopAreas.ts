import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'
import type { ShopArea } from '../types'
import { showError } from '@nextcloud/dialogs'

export const useShopAreasStore = defineStore('shopAreas', () => {
	const areasByList = ref<Record<number, ShopArea[]>>({})
	const myAreas = ref<ShopArea[]>([])

	async function fetchByList(listId: number) {
		try {
			const response = await api.areas.getForList(listId)
			areasByList.value[listId] = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shop areas')
			console.error(e)
		}
	}

	async function fetchMine() {
		try {
			const response = await api.areas.getMine()
			myAreas.value = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shop areas')
			console.error(e)
		}
	}

	async function create(name: string, color?: string, keywords?: string[]) {
		try {
			const response = await api.areas.create(name, color, keywords)
			const newArea: ShopArea = response.data.ocs.data
			myAreas.value.push(newArea)
			// Also update any cached list views
			for (const listId in areasByList.value) {
				areasByList.value[listId].push(newArea)
			}
			return newArea
		} catch (e) {
			showError('Failed to create shop area')
			console.error(e)
		}
	}

	async function update(id: number, data: Record<string, unknown>) {
		try {
			const response = await api.areas.update(id, data)
			const updated: ShopArea = response.data.ocs.data
			// Update in myAreas
			const myIdx = myAreas.value.findIndex(a => a.id === id)
			if (myIdx !== -1) {
				myAreas.value[myIdx] = updated
			}
			// Update in any cached list views
			for (const listId in areasByList.value) {
				const areas = areasByList.value[listId]
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

	async function remove(id: number) {
		try {
			await api.areas.delete(id)
			myAreas.value = myAreas.value.filter(a => a.id !== id)
			// Remove from any cached list views
			for (const listId in areasByList.value) {
				areasByList.value[listId] = areasByList.value[listId].filter(a => a.id !== id)
			}
		} catch (e) {
			showError('Failed to delete shop area')
			console.error(e)
		}
	}

	return {
		areasByList,
		myAreas,
		fetchByList,
		fetchMine,
		create,
		update,
		remove,
	}
})
