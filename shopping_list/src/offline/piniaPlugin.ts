import type { PiniaPlugin } from 'pinia'
import { loadStoreState, saveStoreState, loadValue, saveValue } from './db'

const PERSISTED_STORES = new Set(['items', 'lists', 'shopAreas', 'tags'])

// Track which stores have been fetched from the server
const serverFetched = new Set<string>()

export function markServerFetched(storeId: string) {
	serverFetched.add(storeId)
}

export const offlinePersistPlugin: PiniaPlugin = ({ store }) => {
	if (!PERSISTED_STORES.has(store.$id)) return

	// Hydrate from cache on store init
	loadStoreState(store.$id).then((cached) => {
		// Skip hydration if server data has already arrived
		if (serverFetched.has(store.$id)) return
		if (cached) {
			store.$patch(cached as Record<string, unknown>)
		}

		// For lists store: also restore currentListId
		if (store.$id === 'lists') {
			loadValue<number>('currentListId').then((id) => {
				if (id != null && store.currentListId == null) {
					store.selectList(id)
				}
			})
		}
	})

	// Write-behind on every state change
	store.$subscribe((_mutation, state) => {
		saveStoreState(store.$id, JSON.parse(JSON.stringify(state)))

		// Persist currentListId separately for lists store
		if (store.$id === 'lists' && state.currentListId != null) {
			saveValue('currentListId', state.currentListId)
		}
	})
}
