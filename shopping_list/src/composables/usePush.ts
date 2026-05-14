import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import { useSharesStore } from '../stores/shares'
import { useNetworkStatus } from '../offline/networkStatus'
import { drain, useSyncEngine } from '../offline/syncEngine'

let initialized = false
let pollingInterval: ReturnType<typeof setInterval> | null = null

export function usePush() {
	if (initialized) return
	initialized = true

	const listsStore = useListsStore()
	const itemsStore = useItemsStore()
	const sharesStore = useSharesStore()
	const { isOnline } = useNetworkStatus()
	const { syncing } = useSyncEngine()

	// Check if the server actually has notify_push enabled
	const hasPushServer = !!(window as any).OC?.config?.notify_push

	if (hasPushServer) {
		try {
			import('@nextcloud/notify_push').then(({ listen }) => {
				listen('shopping_list_item_update', () => {
					if (listsStore.currentListId) {
						itemsStore.fetchByList(listsStore.currentListId)
					}
				})

				listen('shopping_list_list_update', () => {
					listsStore.fetchAll()
				})

				listen('shopping_list_share_update', (_type: string, body: { listId?: number }) => {
					listsStore.fetchAll()
					if (body.listId) {
						sharesStore.fetchByList(body.listId)
					}
				})

				console.log('[ShoppingList] notify_push connected')
			}).catch(() => {
				startPolling()
			})
		} catch {
			startPolling()
		}
	} else {
		startPolling()
	}

	function startPolling() {
		console.log('[ShoppingList] Polling every 10s')
		pollingInterval = setInterval(() => {
			// Skip polling while offline or syncing
			if (!isOnline.value || syncing.value) return

			listsStore.fetchAll()
			if (listsStore.currentListId) {
				itemsStore.fetchByList(listsStore.currentListId)
			}
		}, 10000)
	}

	// Drain any pending mutations on startup
	drain()
}

export function stopPush() {
	if (pollingInterval) {
		clearInterval(pollingInterval)
		pollingInterval = null
	}
	initialized = false
}
