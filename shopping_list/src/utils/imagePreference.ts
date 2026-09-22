import { readonly, ref } from 'vue'
import type { Ref } from 'vue'

/** Where the switch is read from and written to. Swapped for a fake in tests. */
export interface PreferenceAdapter {
	load(): boolean
	save(enabled: boolean): Promise<void>
}

export interface ImagePreference {
	/** Whether this user wants item photos shown and the photo actions offered. Off by default. */
	enabled: Readonly<Ref<boolean>>
	/** True while a change is on its way to the server. */
	saving: Readonly<Ref<boolean>>
	/** Flip the switch. The new value shows at once; a failed save puts it back and rethrows. */
	setEnabled(value: boolean): Promise<void>
}

export function createImagePreference(adapter: PreferenceAdapter): ImagePreference {
	const enabled = ref(adapter.load())
	const saving = ref(false)

	async function setEnabled(value: boolean): Promise<void> {
		if (value === enabled.value) return
		const previous = enabled.value
		enabled.value = value
		saving.value = true
		try {
			await adapter.save(value)
		} catch (e) {
			enabled.value = previous
			throw e
		} finally {
			saving.value = false
		}
	}

	return { enabled: readonly(enabled), saving: readonly(saving), setEnabled }
}
