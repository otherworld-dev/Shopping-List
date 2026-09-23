import { loadState } from '@nextcloud/initial-state'
import { api } from './useApi'
import { createImagePreference } from '../utils/imagePreference'
import type { ImagePreference, PreferenceAdapter } from '../utils/imagePreference'

// Starts from the initial state PageController puts on the page and is
// saved with PATCH /api/v1/settings, so it follows the user to every browser.
const serverAdapter: PreferenceAdapter = {
	load() {
		const settings = loadState<{ showImages?: boolean }>('shopping_list', 'settings', {})
		return settings.showImages === true
	},
	async save(enabled) {
		await api.settings.update({ showImages: enabled })
	},
}

let instance: ImagePreference | null = null

/**
 * The signed-in user's "Show item images" switch. One instance for the whole
 * app, so the settings screen, the rows and the list view see the same value.
 */
export function useImagePreference(): ImagePreference {
	if (!instance) instance = createImagePreference(serverAdapter)
	return instance
}
