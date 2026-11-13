import { loadState } from '@nextcloud/initial-state'
import { api } from './useApi'
import { createImagePreference } from '../utils/imagePreference'
import type { ImagePreference, PreferenceAdapter } from '../utils/imagePreference'

// Read by the server when someone adds to a shared list, so it is saved with
// PATCH /api/v1/settings like the other switches. On unless turned off.
const serverAdapter: PreferenceAdapter = {
	load() {
		const settings = loadState<{ notifyAdds?: boolean }>('shopping_list', 'settings', {})
		return settings.notifyAdds !== false
	},
	async save(enabled) {
		await api.settings.update({ notifyAdds: enabled })
	},
}

let instance: ImagePreference | null = null

/** The signed-in user's "Notify me when someone else adds items" switch, one instance for the app. */
export function useNotifyAddsPreference(): ImagePreference {
	if (!instance) instance = createImagePreference(serverAdapter)
	return instance
}
