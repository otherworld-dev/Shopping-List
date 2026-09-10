import { describe, expect, it } from 'vitest'
import { areaKey, loadCollapsed, saveCollapsed, storageKey } from './collapsedAreas'
import type { StorageLike } from './collapsedAreas'

// An in-memory stand-in for localStorage. Only the three methods the helpers
// use are needed.
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

describe('areaKey', () => {
	it('uses the area id for a real area', () => {
		expect(areaKey(7)).toBe('7')
	})

	it('uses a fixed key for the uncategorized group', () => {
		expect(areaKey(null)).toBe('none')
	})
})

describe('loadCollapsed', () => {
	it('is empty when nothing was saved for the list', () => {
		expect(loadCollapsed(memoryStorage(), 1).size).toBe(0)
	})

	it('reads back what was saved for the same list', () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 1, new Set(['3', 'none']))
		expect([...loadCollapsed(storage, 1)].sort()).toEqual(['3', 'none'])
	})

	it('keeps each list separate', () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 1, new Set(['3']))
		expect(loadCollapsed(storage, 2).size).toBe(0)
	})

	it('ignores a value that is not valid JSON', () => {
		const storage = memoryStorage({ [storageKey(1)]: '{not json' })
		expect(loadCollapsed(storage, 1).size).toBe(0)
	})

	it('ignores a value that is not a list', () => {
		const storage = memoryStorage({ [storageKey(1)]: '{"3":true}' })
		expect(loadCollapsed(storage, 1).size).toBe(0)
	})

	it('drops entries that are not strings', () => {
		const storage = memoryStorage({ [storageKey(1)]: '["3", 4, null, "none"]' })
		expect([...loadCollapsed(storage, 1)].sort()).toEqual(['3', 'none'])
	})

	it('is empty when there is no storage at all', () => {
		expect(loadCollapsed(null, 1).size).toBe(0)
	})

	it('is empty when the storage throws', () => {
		expect(loadCollapsed(blockedStorage, 1).size).toBe(0)
	})
})

describe('saveCollapsed', () => {
	it('removes the entry once nothing is collapsed, so storage does not fill with empty lists', () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 1, new Set(['3']))
		saveCollapsed(storage, 1, new Set())
		expect(storage.data).toEqual({})
	})

	it('namespaces the key under the app id, since every Nextcloud app shares the origin', () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 5, new Set(['3']))
		expect(Object.keys(storage.data)).toEqual(['shopping_list.collapsedAreas.5'])
	})

	it('does nothing when there is no storage', () => {
		expect(() => saveCollapsed(null, 1, new Set(['3']))).not.toThrow()
	})

	it('does not throw when the storage refuses the write', () => {
		expect(() => saveCollapsed(blockedStorage, 1, new Set(['3']))).not.toThrow()
	})
})
