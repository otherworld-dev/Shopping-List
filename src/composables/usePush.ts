import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import { useSharesStore } from '../stores/shares'

let initialized = false
let pollingInterval: ReturnType<typeof setInterval> | null = null

export function usePush() {
	if (initialized) return
	initialized = true

	const listsStore = useListsStore()
	const itemsStore = useItemsStore()
	const sharesStore = useSharesStore()

	// Check if the server actually has notify_push enabled
	// by looking for the capability in OC.config
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
			listsStore.fetchAll()
			if (listsStore.currentListId) {
				itemsStore.fetchByList(listsStore.currentListId)
			}
		}, 10000)
	}
}

export function stopPush() {
	if (pollingInterval) {
		clearInterval(pollingInterval)
		pollingInterval = null
	}
	initialized = false
}
