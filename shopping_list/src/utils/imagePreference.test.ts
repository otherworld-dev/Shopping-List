import { describe, expect, it, vi } from 'vitest'
import { createImagePreference } from './imagePreference'
import type { PreferenceAdapter } from './imagePreference'

function adapter(initial: boolean, save: PreferenceAdapter['save'] = async () => {}): PreferenceAdapter {
	return { load: () => initial, save }
}

describe('createImagePreference', () => {
	it('starts from what the adapter loads', () => {
		expect(createImagePreference(adapter(false)).enabled.value).toBe(false)
		expect(createImagePreference(adapter(true)).enabled.value).toBe(true)
	})

	it('flips at once and saves the new value', async () => {
		const save = vi.fn(async () => {})
		const pref = createImagePreference(adapter(false, save))
		const pending = pref.setEnabled(true)
		expect(pref.enabled.value).toBe(true)
		expect(pref.saving.value).toBe(true)
		await pending
		expect(save).toHaveBeenCalledWith(true)
		expect(pref.saving.value).toBe(false)
	})

	it('reverts and rethrows when the save fails', async () => {
		const pref = createImagePreference(adapter(false, async () => { throw new Error('offline') }))
		await expect(pref.setEnabled(true)).rejects.toThrow('offline')
		expect(pref.enabled.value).toBe(false)
		expect(pref.saving.value).toBe(false)
	})

	it('does nothing when set to the value it already has', async () => {
		const save = vi.fn(async () => {})
		const pref = createImagePreference(adapter(true, save))
		await pref.setEnabled(true)
		expect(save).not.toHaveBeenCalled()
	})
})
