/**
 * Which shop-area groups a viewer has folded away on a list.
 *
 * This is a view preference, not list data: one person may fold away the
 * areas they have already walked past while someone else on the same shared
 * list keeps them all open. So it lives in the browser's localStorage, one
 * entry per list, and never goes to the server.
 */

/** The part of the Web Storage API these helpers use, so tests can fake it. */
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

/** A stable key for an area group. Items with no area form their own group. */
export function areaKey(areaId: number | null): string {
	return areaId === null ? 'none' : String(areaId)
}

/**
 * The storage key for a list. Every Nextcloud app runs on the same origin
 * and shares one localStorage, so the key starts with the app id.
 */
export function storageKey(listId: number): string {
	return `shopping_list.collapsedAreas.${listId}`
}

/**
 * The areas collapsed on a list. Anything unreadable counts as nothing
 * collapsed: storage can be missing, blocked, or hold a value some other
 * version wrote, and none of that should stop the list from showing.
 */
export function loadCollapsed(storage: StorageLike | null, listId: number): Set<string> {
	if (!storage) return new Set()
	try {
		const raw = storage.getItem(storageKey(listId))
		if (!raw) return new Set()
		const parsed: unknown = JSON.parse(raw)
		if (!Array.isArray(parsed)) return new Set()
		return new Set(parsed.filter((key): key is string => typeof key === 'string'))
	} catch {
		return new Set()
	}
}

/**
 * Save the areas collapsed on a list. An empty set removes the entry, so
 * lists that are fully open leave nothing behind. A refused write (quota,
 * site data blocked) is dropped: the state still holds for this page view.
 */
export function saveCollapsed(storage: StorageLike | null, listId: number, keys: Set<string>): void {
	if (!storage) return
	try {
		if (keys.size === 0) {
			storage.removeItem(storageKey(listId))
		} else {
			storage.setItem(storageKey(listId), JSON.stringify([...keys].sort()))
		}
	} catch {
		// Nothing useful to do. The in-memory state is already updated.
	}
}
