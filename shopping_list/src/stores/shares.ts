import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'
import type { ListShare } from '../types'
import { showError } from '@nextcloud/dialogs'

export const useSharesStore = defineStore('shares', () => {
	const sharesByList = ref<Record<number, ListShare[]>>({})

	async function fetchByList(listId: number) {
		try {
			const response = await api.shares.getAll(listId)
			sharesByList.value[listId] = response.data.ocs.data
		} catch (e) {
			showError('Failed to load shares')
			console.error(e)
		}
	}

	async function create(listId: number, sharedWith: string, type: number, permission: number) {
		try {
			const response = await api.shares.create(listId, sharedWith, type, permission)
			const newShare: ListShare = response.data.ocs.data
			if (!sharesByList.value[listId]) {
				sharesByList.value[listId] = []
			}
			sharesByList.value[listId].push(newShare)
			return newShare
		} catch (e) {
			showError('Failed to share list')
			console.error(e)
		}
	}

	async function updatePermission(shareId: number, permission: number, listId: number) {
		try {
			const response = await api.shares.update(shareId, permission)
			const updated: ListShare = response.data.ocs.data
			const shares = sharesByList.value[listId] ?? []
			const index = shares.findIndex(s => s.id === shareId)
			if (index !== -1) {
				shares[index] = updated
			}
		} catch (e) {
			showError('Failed to update share')
			console.error(e)
		}
	}

	async function remove(shareId: number, listId: number) {
		try {
			await api.shares.delete(shareId)
			const shares = sharesByList.value[listId] ?? []
			sharesByList.value[listId] = shares.filter(s => s.id !== shareId)
		} catch (e) {
			showError('Failed to remove share')
			console.error(e)
		}
	}

	function getLinkShare(listId: number): ListShare | undefined {
		return (sharesByList.value[listId] ?? []).find(s => s.sharedWithType === 3)
	}

	async function createLinkShare(listId: number, permission: number, password?: string, expiresAt?: string) {
		try {
			const response = await api.shares.createLink(listId, permission, password, expiresAt)
			const newShare: ListShare = response.data.ocs.data
			if (!sharesByList.value[listId]) {
				sharesByList.value[listId] = []
			}
			sharesByList.value[listId].push(newShare)
			return newShare
		} catch (e) {
			showError('Failed to create public link')
			console.error(e)
		}
	}

	async function updateLinkShare(shareId: number, listId: number, data: Record<string, unknown>) {
		try {
			const response = await api.shares.updateLink(shareId, data)
			const updated: ListShare = response.data.ocs.data
			const shares = sharesByList.value[listId] ?? []
			const index = shares.findIndex(s => s.id === shareId)
			if (index !== -1) {
				shares[index] = updated
			}
		} catch (e) {
			showError('Failed to update public link')
			console.error(e)
		}
	}

	async function removeLinkShare(shareId: number, listId: number) {
		try {
			await api.shares.deleteLink(shareId)
			const shares = sharesByList.value[listId] ?? []
			sharesByList.value[listId] = shares.filter(s => s.id !== shareId)
		} catch (e) {
			showError('Failed to remove public link')
			console.error(e)
		}
	}

	return {
		sharesByList,
		fetchByList,
		create,
		updatePermission,
		remove,
		getLinkShare,
		createLinkShare,
		updateLinkShare,
		removeLinkShare,
	}
})
