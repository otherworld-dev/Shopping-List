import { browserStorage } from './browserStorage'
import type { StorageLike } from './browserStorage'

const KEY = 'shopping_list_guest_name'

/** The name a guest gave on a public link, remembered in this browser only. */
export function readGuestName(storage: StorageLike | null = browserStorage()): string {
	try {
		return storage?.getItem(KEY) ?? ''
	} catch {
		return ''
	}
}

/** Remember the name, or forget it when it's blank. Never throws. */
export function writeGuestName(name: string, storage: StorageLike | null = browserStorage()): void {
	try {
		if (name.trim()) {
			storage?.setItem(KEY, name.trim())
		} else {
			storage?.removeItem(KEY)
		}
	} catch {
		// Blocked or full storage: the name just isn't remembered
	}
}
