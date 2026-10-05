import { loadState } from '@nextcloud/initial-state'
import { ref } from 'vue'
import { api } from './useApi'
import notes from '../whatsNew.json'
import { entriesToShow, latestEntries } from '../utils/whatsNew'
import type { WhatsNewEntry } from '../utils/whatsNew'

const allNotes = notes as WhatsNewEntry[]

// The notes in the What's new window, empty while it is closed.
const shown = ref<WhatsNewEntry[]>([])

function installedVersion(): string {
	return loadState<string>('shopping_list', 'version', '')
}

/**
 * Pop up the release notes this user has not seen yet, once per version.
 * Called once the lists have loaded, as having none is how someone who has
 * just started is told apart.
 */
async function showIfUpdated(isNewUser: boolean): Promise<void> {
	const currentVersion = installedVersion()
	const lastSeen = loadState<{ whatsNewSeen?: string }>('shopping_list', 'settings', {}).whatsNewSeen ?? ''
	if (!currentVersion || lastSeen === currentVersion) return

	const entries = entriesToShow(allNotes, { currentVersion, lastSeen, isNewUser })
	if (entries.length > 0) shown.value = entries

	// Saved even when there was nothing to show, so someone new starts from
	// the version they installed and a release without notes does not bring
	// older ones back later.
	try {
		await api.settings.update({ whatsNewSeen: currentVersion })
	} catch (e) {
		// Not worth a toast: the notes just come back on the next load.
		console.error('Failed to save the seen release notes', e)
	}
}

/** The What's new window, shared by the popup after an update and the button in Settings. */
export function useWhatsNew() {
	return {
		shown,
		hasNotes: latestEntries(allNotes, installedVersion()).length > 0,
		showIfUpdated,
		showLatest() {
			shown.value = latestEntries(allNotes, installedVersion())
		},
		close() {
			shown.value = []
		},
	}
}
