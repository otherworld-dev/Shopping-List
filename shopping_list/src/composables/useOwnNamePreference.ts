import { loadState } from '@nextcloud/initial-state'
import { api } from './useApi'
import { createImagePreference } from '../utils/imagePreference'
import type { ImagePreference, PreferenceAdapter } from '../utils/imagePreference'

// Same as the image switch: from the page's initial state, saved with
// PATCH /api/v1/settings so it follows the user to every browser and the app.
const serverAdapter: PreferenceAdapter = {
	load() {
		const settings = loadState<{ showOwnName?: boolean }>('shopping_list', 'settings', {})
		return settings.showOwnName === true
	},
	async save(enabled) {
		await api.settings.update({ showOwnName: enabled })
	},
}

let instance: ImagePreference | null = null

/** The signed-in user's "Show my name on items" switch, one instance for the app. */
export function useOwnNamePreference(): ImagePreference {
	if (!instance) instance = createImagePreference(serverAdapter)
	return instance
}
