import { ref, readonly } from 'vue'
import { api } from '../composables/useApi'
import { peekAll, removeMutation, enqueue as enqueueMutation } from './mutationQueue'
import { isNetworkError, useNetworkStatus } from './networkStatus'
import { useItemsStore } from '../stores/items'
import { useListsStore } from '../stores/lists'
import type { QueuedMutation } from './mutationQueue'

const syncing = ref(false)
const pendingCount = ref(0)
let draining = false

async function replayMutation(m: QueuedMutation) {
	switch (m.type) {
	case 'item.check':
		return api.items.check(m.listId, m.itemId!, m.payload.checked as boolean)
	case 'item.create':
		return api.items.create(m.listId, m.payload)
	case 'item.update':
		return api.items.update(m.listId, m.itemId!, m.payload)
	case 'item.delete':
		return api.items.delete(m.listId, m.itemId!)
	case 'item.reorder':
		return api.items.reorder(m.listId, m.payload.sortedIds as number[])
	case 'item.clearChecked':
		return api.items.clearChecked(m.listId)
	case 'item.uncheckAll':
		return api.items.uncheckAll(m.listId)
	default:
		throw new Error(`Unknown mutation type: ${m.type}`)
	}
}

function getHttpStatus(error: unknown): number | null {
	if (!error || typeof error !== 'object') return null
	const resp = (error as Record<string, unknown>).response as Record<string, unknown> | undefined
	return resp?.status as number ?? null
}

export async function drain(): Promise<void> {
	if (draining) return
	draining = true
	syncing.value = true

	try {
		const queue = await peekAll()
		pendingCount.value = queue.length
		if (queue.length === 0) return

		const itemsStore = useItemsStore()

		// Process FIFO — always re-read queue to get current first item
		while (true) {
			const current = await peekAll()
			if (current.length === 0) break

			const mutation = current[0]

			try {
				const result = await replayMutation(mutation)

				// For creates: replace temp ID with real server ID
				if (mutation.type === 'item.create' && mutation.tempId) {
					const realItem = result.data.ocs.data
					itemsStore.replaceTempId(mutation.listId, Number(mutation.tempId), realItem)
				}

				await removeMutation(mutation.id)
				pendingCount.value = (await peekAll()).length
			} catch (error) {
				if (isNetworkError(error)) {
					// Still offline — stop draining, will retry on next online event
					break
				}

				const status = getHttpStatus(error)

				if (status === 404) {
					// Item was deleted by another user — discard
					await removeMutation(mutation.id)
					pendingCount.value = (await peekAll()).length
					continue
				}

				// Other server errors — retry up to 3 times, then discard
				if (mutation.retries >= 2) {
					console.error('[ShoppingList] Discarding mutation after 3 failures:', mutation, error)
					await removeMutation(mutation.id)
					pendingCount.value = (await peekAll()).length
					continue
				}

				// Move to end of queue with incremented retry count
				await removeMutation(mutation.id)
				await enqueueMutation({
					type: mutation.type,
					listId: mutation.listId,
					itemId: mutation.itemId,
					payload: mutation.payload,
					tempId: mutation.tempId,
				})
				// Patch retry count on the newly enqueued item
				const updated = await peekAll()
				if (updated.length > 0) {
					const last = updated[updated.length - 1]
					// Directly set retries — enqueueMutation sets retries to 0
					last.retries = mutation.retries + 1
				}
				pendingCount.value = updated.length
			}
		}

		// After drain: reconcile with server
		const remaining = await peekAll()
		if (remaining.length === 0) {
			const listsStore = useListsStore()
			await listsStore.fetchAll()
			if (listsStore.currentListId) {
				await itemsStore.fetchByList(listsStore.currentListId)
			}
		}
	} finally {
		draining = false
		syncing.value = false
		pendingCount.value = (await peekAll()).length
	}
}

export function useSyncEngine() {
	const { onOnline } = useNetworkStatus()

	// Drain when we come back online
	onOnline(() => {
		drain()
	})

	return {
		syncing: readonly(syncing),
		pendingCount: readonly(pendingCount),
		drain,
	}
}
