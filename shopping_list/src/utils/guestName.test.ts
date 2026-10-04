import { describe, expect, it } from 'vitest'
import { readGuestName, writeGuestName } from './guestName'
import type { StorageLike } from './browserStorage'

function memory(): StorageLike & { data: Record<string, string> } {
	const data: Record<string, string> = {}
	return {
		data,
		getItem: (k) => data[k] ?? null,
		setItem: (k, v) => { data[k] = v },
		removeItem: (k) => { delete data[k] },
	}
}

const broken: StorageLike = {
	getItem: () => { throw new Error('SecurityError') },
	setItem: () => { throw new Error('QuotaExceededError') },
	removeItem: () => { throw new Error('SecurityError') },
}

describe('guest name', () => {
	it('is remembered in this browser', () => {
		const storage = memory()
		writeGuestName('Anna', storage)
		expect(readGuestName(storage)).toBe('Anna')
	})

	it('is forgotten when cleared', () => {
		const storage = memory()
		writeGuestName('Anna', storage)
		writeGuestName('  ', storage)
		expect(readGuestName(storage)).toBe('')
		expect(storage.data).toEqual({})
	})

	it('is simply empty without storage', () => {
		expect(readGuestName(null)).toBe('')
		expect(readGuestName(broken)).toBe('')
		expect(() => writeGuestName('Anna', broken)).not.toThrow()
		expect(() => writeGuestName('Anna', null)).not.toThrow()
	})
})
