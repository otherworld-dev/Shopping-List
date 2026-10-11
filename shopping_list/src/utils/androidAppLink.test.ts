import { describe, expect, it } from 'vitest'
import { HIDDEN_KEY, loadHidden, saveHidden } from './androidAppLink'
import type { StorageLike } from './browserStorage'

// An in-memory stand-in for localStorage.
function memoryStorage(initial: Record<string, string> = {}): StorageLike & { data: Record<string, string> } {
	const data = { ...initial }
	return {
		data,
		getItem: (key: string) => (key in data ? data[key] : null),
		setItem: (key: string, value: string) => { data[key] = value },
		removeItem: (key: string) => { delete data[key] },
	}
}

// A storage that refuses every call, like a browser with site data blocked.
const blockedStorage: StorageLike = {
	getItem: () => { throw new Error('blocked') },
	setItem: () => { throw new Error('blocked') },
	removeItem: () => { throw new Error('blocked') },
}

describe('loadHidden', () => {
	it('shows the row when nothing was saved', () => {
		expect(loadHidden(memoryStorage())).toBe(false)
	})

	it('reads back a hide', () => {
		const storage = memoryStorage()
		saveHidden(storage)
		expect(storage.data[HIDDEN_KEY]).toBe('1')
		expect(loadHidden(storage)).toBe(true)
	})

	it('ignores a value it did not write', () => {
		expect(loadHidden(memoryStorage({ [HIDDEN_KEY]: 'yes' }))).toBe(false)
	})

	it('shows the row when there is no storage or it is blocked', () => {
		expect(loadHidden(null)).toBe(false)
		expect(loadHidden(blockedStorage)).toBe(false)
	})
})

describe('saveHidden', () => {
	it('does not throw when there is no storage or it is blocked', () => {
		expect(() => saveHidden(null)).not.toThrow()
		expect(() => saveHidden(blockedStorage)).not.toThrow()
	})
})
