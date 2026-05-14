import { createStore, get, set, del, clear } from 'idb-keyval'

const store = createStore('shopping-list-offline', 'cache')

const pendingWrites = new Map<string, ReturnType<typeof setTimeout>>()

export async function loadStoreState<T>(storeName: string): Promise<T | undefined> {
	try {
		return await get<T>(storeName, store)
	} catch {
		return undefined
	}
}

export async function saveStoreState(storeName: string, data: unknown): Promise<void> {
	// Debounce writes per store (100ms)
	const existing = pendingWrites.get(storeName)
	if (existing) clearTimeout(existing)

	pendingWrites.set(storeName, setTimeout(async () => {
		pendingWrites.delete(storeName)
		try {
			await set(storeName, data, store)
		} catch {
			// IndexedDB unavailable — degrade silently
		}
	}, 100))
}

export async function loadValue<T>(key: string): Promise<T | undefined> {
	try {
		return await get<T>(key, store)
	} catch {
		return undefined
	}
}

export async function saveValue(key: string, data: unknown): Promise<void> {
	try {
		await set(key, data, store)
	} catch {
		// IndexedDB unavailable
	}
}

export async function removeValue(key: string): Promise<void> {
	try {
		await del(key, store)
	} catch {
		// IndexedDB unavailable
	}
}

export async function clearAllCaches(): Promise<void> {
	try {
		await clear(store)
	} catch {
		// IndexedDB unavailable
	}
}
