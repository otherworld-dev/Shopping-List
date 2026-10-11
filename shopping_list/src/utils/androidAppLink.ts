/**
 * The "Get the Android app" row in the navigation footer.
 *
 * Whether it shows is a view preference: someone without an Android phone,
 * or who has the app already, hides it once and it stays hidden in that
 * browser. It never goes to the server.
 */

import type { StorageLike } from './browserStorage'

/** The companion app's Play listing. Notifier::ANDROID_APP_URL holds the same link. */
export const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=dev.otherworld.shoppinglist'

/** Every Nextcloud app shares one localStorage, so the key starts with the app id. */
export const HIDDEN_KEY = 'shopping_list.androidAppLink.hidden'

/** Whether the row was hidden. Missing or blocked storage counts as not hidden. */
export function loadHidden(storage: StorageLike | null): boolean {
	if (!storage) return false
	try {
		return storage.getItem(HIDDEN_KEY) === '1'
	} catch {
		return false
	}
}

/** Remember that the row was hidden. A refused write still hides it for this page view. */
export function saveHidden(storage: StorageLike | null): void {
	if (!storage) return
	try {
		storage.setItem(HIDDEN_KEY, '1')
	} catch {
		// Nothing useful to do. The row is already gone from the page.
	}
}
