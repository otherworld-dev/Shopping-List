import type { PiniaPlugin } from 'pinia'
import { loadStoreState, saveStoreState, loadValue, saveValue } from './db'

const PERSISTED_STORES = new Set(['items', 'lists', 'shopAreas', 'tags'])

// Track which stores have been fetched from the server
const serverFetched = new Set<string>()

export function markServerFetched(storeId: string) {
	serverFetched.add(storeId)
}

// Per-user settings that live on the server (e.g. lists.listSort) must always
// reflect the page's initial state or a later setListSort call, never a
// snapshot from an earlier visit's offline cache — so they never round-trip
// through IndexedDB at all, in either direction.
const UNCACHED_KEYS: Partial<Record<string, readonly string[]>> = {
	lists: ['listSort'],
}

/**
 * `state` with this store's uncached keys removed. Used for both the save and the
 * hydrate path, so a cached value can never come back and an in-memory value is
 * never written to the cache to begin with.
 */
export function withoutUncachedKeys(storeId: string, state: Record<string, unknown>): Record<string, unknown> {
	const keys = UNCACHED_KEYS[storeId]
	if (!keys || keys.length === 0) return state
	const copy = { ...state }
	for (const key of keys) delete copy[key]
	return copy
}

export const offlinePersistPlugin: PiniaPlugin = ({ store }) => {
	if (!PERSISTED_STORES.has(store.$id)) return

	// Hydrate from cache on store init
	loadStoreState(store.$id).then((cached) => {
		// Skip hydration if server data has already arrived
		if (serverFetched.has(store.$id)) return
		if (cached) {
			store.$patch(withoutUncachedKeys(store.$id, cached as Record<string, unknown>))
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
		saveStoreState(store.$id, withoutUncachedKeys(store.$id, JSON.parse(JSON.stringify(state))))

		// Persist currentListId separately for lists store
		if (store.$id === 'lists' && state.currentListId != null) {
			saveValue('currentListId', state.currentListId)
		}
	})
}
