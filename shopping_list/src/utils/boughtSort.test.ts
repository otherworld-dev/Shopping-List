import { describe, expect, it } from 'vitest'
import { loadBoughtSort, saveBoughtSort, sortBought, STORAGE_KEY } from './boughtSort'
import type { StorageLike } from './browserStorage'
import type { Item } from '../types'

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

let nextId = 1

function item(name: string, updatedAt = '2026-09-01T10:00:00Z'): Item {
	return {
		id: nextId++,
		listId: 1,
		name,
		quantity: null,
		unit: null,
		shopAreaId: null,
		checked: true,
		checkedBy: null,
		sortOrder: 0,
		tags: [],
		createdAt: '2026-09-01T09:00:00Z',
		updatedAt,
	}
}

const names = (items: Item[]) => items.map(i => i.name)

describe('sortBought', () => {
	describe('list order', () => {
		it('keeps the order the items came in', () => {
			const items = [item('milk'), item('apples'), item('bread')]
			expect(names(sortBought(items, 'list', 'en'))).toEqual(['milk', 'apples', 'bread'])
		})

		it('returns a new array', () => {
			const items = [item('milk'), item('apples')]
			expect(sortBought(items, 'list', 'en')).not.toBe(items)
		})
	})

	describe('alphabetical', () => {
		it('sorts by name, ignoring case', () => {
			const items = [item('cherries'), item('Bananas'), item('apples')]
			expect(names(sortBought(items, 'alpha', 'en'))).toEqual(['apples', 'Bananas', 'cherries'])
		})

		it('sorts an accented letter with its base letter', () => {
			const items = [item('fish'), item('éclairs'), item('dates')]
			expect(names(sortBought(items, 'alpha', 'en'))).toEqual(['dates', 'éclairs', 'fish'])
		})

		it('follows the language, so Swedish puts ä after z', () => {
			const items = [item('ägg'), item('zucchini'), item('bröd')]
			expect(names(sortBought(items, 'alpha', 'sv'))).toEqual(['bröd', 'zucchini', 'ägg'])
			expect(names(sortBought(items, 'alpha', 'en'))).toEqual(['ägg', 'bröd', 'zucchini'])
		})

		it('sorts numbers in names by value', () => {
			const items = [item('AA batteries 10'), item('AA batteries 9')]
			expect(names(sortBought(items, 'alpha', 'en'))).toEqual(['AA batteries 9', 'AA batteries 10'])
		})

		it('keeps list order between items with the same name', () => {
			const first = item('milk')
			const second = item('Milk')
			expect(sortBought([first, second], 'alpha', 'en')).toEqual([first, second])
			expect(sortBought([second, first], 'alpha', 'en')).toEqual([second, first])
		})

		it('does not change the array it was given', () => {
			const items = [item('milk'), item('apples')]
			sortBought(items, 'alpha', 'en')
			expect(names(items)).toEqual(['milk', 'apples'])
		})
	})

	describe('recently bought', () => {
		it('puts the item ticked last at the top', () => {
			const items = [
				item('milk', '2026-09-01T10:00:00Z'),
				item('apples', '2026-09-01T12:00:00Z'),
				item('bread', '2026-09-01T11:00:00Z'),
			]
			expect(names(sortBought(items, 'recent', 'en'))).toEqual(['apples', 'bread', 'milk'])
		})

		it('compares times, not the text of the timestamps', () => {
			const items = [
				item('milk', '2026-09-01T10:00:00+00:00'),
				item('apples', '2026-09-01T11:30:00+02:00'),
			]
			// 11:30 at +02:00 is 09:30 UTC, so it is older than milk.
			expect(names(sortBought(items, 'recent', 'en'))).toEqual(['milk', 'apples'])
		})

		it('puts items with an unreadable time last', () => {
			const items = [item('milk', 'not a date'), item('apples', '2026-09-01T10:00:00Z')]
			expect(names(sortBought(items, 'recent', 'en'))).toEqual(['apples', 'milk'])
		})

		it('keeps list order between items ticked at the same time', () => {
			const items = [item('milk'), item('apples')]
			expect(names(sortBought(items, 'recent', 'en'))).toEqual(['milk', 'apples'])
		})
	})
})

describe('loadBoughtSort', () => {
	it('is list order when nothing was saved', () => {
		expect(loadBoughtSort(memoryStorage())).toBe('list')
	})

	it('reads back a saved choice', () => {
		const storage = memoryStorage()
		saveBoughtSort(storage, 'alpha')
		expect(loadBoughtSort(storage)).toBe('alpha')
		saveBoughtSort(storage, 'recent')
		expect(loadBoughtSort(storage)).toBe('recent')
	})

	it('ignores a value it does not know', () => {
		expect(loadBoughtSort(memoryStorage({ [STORAGE_KEY]: 'price' }))).toBe('list')
	})

	it('is list order without storage or with storage blocked', () => {
		expect(loadBoughtSort(null)).toBe('list')
		expect(loadBoughtSort(blockedStorage)).toBe('list')
	})
})

describe('saveBoughtSort', () => {
	it('uses a key that starts with the app id', () => {
		expect(STORAGE_KEY.startsWith('shopping_list.')).toBe(true)
	})

	it('removes the entry when going back to list order', () => {
		const storage = memoryStorage()
		saveBoughtSort(storage, 'alpha')
		saveBoughtSort(storage, 'list')
		expect(storage.data).toEqual({})
	})

	it('does nothing without storage and does not throw when blocked', () => {
		expect(() => saveBoughtSort(null, 'alpha')).not.toThrow()
		expect(() => saveBoughtSort(blockedStorage, 'alpha')).not.toThrow()
	})
})
