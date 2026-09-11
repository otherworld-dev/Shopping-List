import { describe, expect, it } from 'vitest'
import {
	BOUGHT_SORT_KEY,
	groupOpenItems,
	loadBoughtSort,
	loadOpenSort,
	OPEN_SORT_KEY,
	saveBoughtSort,
	saveOpenSort,
	sortBought,
} from './itemSort'
import type { AreaGroup } from './itemSort'
import type { StorageLike } from './browserStorage'
import type { Item, ShopArea } from '../types'

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

function item(name: string, shopAreaId: number | null = null, updatedAt = '2026-09-01T10:00:00Z'): Item {
	return {
		id: nextId++,
		listId: 1,
		name,
		quantity: null,
		unit: null,
		shopAreaId,
		checked: false,
		checkedBy: null,
		sortOrder: 0,
		tags: [],
		createdAt: '2026-09-01T09:00:00Z',
		updatedAt,
	}
}

function area(id: number, name: string): ShopArea {
	return { id, listId: 1, name, sortOrder: id, color: null, keywords: [], nameKey: null }
}

// Areas in the order the list shows them, which is not id order.
const DAIRY = 2
const PRODUCE = 1
const areas = [area(DAIRY, 'Dairy'), area(PRODUCE, 'Produce')]

const names = (items: Item[]) => items.map(i => i.name)
const groups = (result: AreaGroup[]) => result.map(g => [g.areaName, names(g.items)])

describe('groupOpenItems', () => {
	const items = () => [
		item('milk', DAIRY),
		item('pears', PRODUCE),
		item('tape'),
		item('apples', PRODUCE),
		item('Cheese', DAIRY),
		item('batteries'),
	]

	describe('by area', () => {
		it('groups by area in area order and keeps the drag order inside', () => {
			expect(groups(groupOpenItems(items(), areas, 'area', 'en'))).toEqual([
				['Dairy', ['milk', 'Cheese']],
				['Produce', ['pears', 'apples']],
				[null, ['tape', 'batteries']],
			])
		})

		it('puts items of an area the list no longer has with the uncategorized ones', () => {
			const result = groupOpenItems([item('soap', 99), item('tape')], areas, 'area', 'en')
			expect(groups(result)).toEqual([[null, ['soap', 'tape']]])
		})

		it('leaves out areas with no items', () => {
			expect(groups(groupOpenItems([item('milk', DAIRY)], areas, 'area', 'en'))).toEqual([
				['Dairy', ['milk']],
			])
		})

		it('carries the area id and colour on each group', () => {
			const coloured = [{ ...area(DAIRY, 'Dairy'), color: '#fff' }]
			const [group] = groupOpenItems([item('milk', DAIRY)], coloured, 'area', 'en')
			expect(group).toMatchObject({ areaId: DAIRY, areaColor: '#fff' })
		})
	})

	describe('by area, A to Z', () => {
		it('groups by area in area order and sorts by name inside', () => {
			expect(groups(groupOpenItems(items(), areas, 'areaAlpha', 'en'))).toEqual([
				['Dairy', ['Cheese', 'milk']],
				['Produce', ['apples', 'pears']],
				[null, ['batteries', 'tape']],
			])
		})
	})

	describe('A to Z', () => {
		it('is one group with no area, sorted by name', () => {
			const result = groupOpenItems(items(), areas, 'alpha', 'en')
			expect(result).toHaveLength(1)
			expect(result[0]).toMatchObject({ areaId: null, areaName: null, areaColor: null })
			expect(names(result[0].items)).toEqual(['apples', 'batteries', 'Cheese', 'milk', 'pears', 'tape'])
		})
	})

	it('has no groups when there are no items, whatever the sort', () => {
		expect(groupOpenItems([], areas, 'area', 'en')).toEqual([])
		expect(groupOpenItems([], areas, 'areaAlpha', 'en')).toEqual([])
		expect(groupOpenItems([], areas, 'alpha', 'en')).toEqual([])
	})

	it('does not change the array it was given', () => {
		const given = items()
		groupOpenItems(given, areas, 'alpha', 'en')
		expect(names(given)).toEqual(['milk', 'pears', 'tape', 'apples', 'Cheese', 'batteries'])
	})
})

describe('A to Z order', () => {
	const alpha = (list: Item[], language = 'en') => names(groupOpenItems(list, [], 'alpha', language)[0].items)

	it('ignores case', () => {
		expect(alpha([item('cherries'), item('Bananas'), item('apples')])).toEqual(['apples', 'Bananas', 'cherries'])
	})

	it('sorts an accented letter with its base letter', () => {
		expect(alpha([item('fish'), item('éclairs'), item('dates')])).toEqual(['dates', 'éclairs', 'fish'])
	})

	it('follows the language, so Swedish puts ä after z', () => {
		const list = [item('ägg'), item('zucchini'), item('bröd')]
		expect(alpha(list, 'sv')).toEqual(['bröd', 'zucchini', 'ägg'])
		expect(alpha(list, 'en')).toEqual(['ägg', 'bröd', 'zucchini'])
	})

	it('sorts numbers in names by value', () => {
		expect(alpha([item('AA batteries 10'), item('AA batteries 9')])).toEqual(['AA batteries 9', 'AA batteries 10'])
	})

	it('keeps list order between items with the same name', () => {
		const first = item('milk')
		const second = item('Milk')
		expect(groupOpenItems([first, second], [], 'alpha', 'en')[0].items).toEqual([first, second])
		expect(groupOpenItems([second, first], [], 'alpha', 'en')[0].items).toEqual([second, first])
	})
})

describe('sortBought', () => {
	describe('by area', () => {
		it('follows the area order, with items without an area last', () => {
			const list = [item('tape'), item('pears', PRODUCE), item('milk', DAIRY), item('apples', PRODUCE)]
			expect(names(sortBought(list, 'area', areas, 'en'))).toEqual(['milk', 'pears', 'apples', 'tape'])
		})

		it('treats an area the list no longer has like no area', () => {
			const list = [item('soap', 99), item('milk', DAIRY), item('tape')]
			expect(names(sortBought(list, 'area', areas, 'en'))).toEqual(['milk', 'soap', 'tape'])
		})
	})

	describe('A to Z', () => {
		it('sorts by name and ignores the area', () => {
			const list = [item('pears', PRODUCE), item('Cheese', DAIRY), item('apples')]
			expect(names(sortBought(list, 'alpha', areas, 'en'))).toEqual(['apples', 'Cheese', 'pears'])
		})
	})

	describe('most recent first', () => {
		it('puts the item ticked last at the top', () => {
			const list = [
				item('milk', null, '2026-09-01T10:00:00Z'),
				item('apples', null, '2026-09-01T12:00:00Z'),
				item('bread', null, '2026-09-01T11:00:00Z'),
			]
			expect(names(sortBought(list, 'recent', areas, 'en'))).toEqual(['apples', 'bread', 'milk'])
		})

		it('compares times, not the text of the timestamps', () => {
			const list = [
				item('milk', null, '2026-09-01T10:00:00+00:00'),
				item('apples', null, '2026-09-01T11:30:00+02:00'),
			]
			// 11:30 at +02:00 is 09:30 UTC, so it is older than milk.
			expect(names(sortBought(list, 'recent', areas, 'en'))).toEqual(['milk', 'apples'])
		})

		it('puts items with an unreadable time last', () => {
			const list = [item('milk', null, 'not a date'), item('apples')]
			expect(names(sortBought(list, 'recent', areas, 'en'))).toEqual(['apples', 'milk'])
		})

		it('keeps list order between items ticked at the same time', () => {
			expect(names(sortBought([item('milk'), item('apples')], 'recent', areas, 'en'))).toEqual(['milk', 'apples'])
		})
	})

	it('returns a new array and leaves the given one alone', () => {
		const list = [item('milk'), item('apples')]
		const sorted = sortBought(list, 'alpha', areas, 'en')
		expect(sorted).not.toBe(list)
		expect(names(list)).toEqual(['milk', 'apples'])
	})
})

describe('saved choices', () => {
	it('use keys that start with the app id and differ', () => {
		expect(OPEN_SORT_KEY.startsWith('shopping_list.')).toBe(true)
		expect(BOUGHT_SORT_KEY.startsWith('shopping_list.')).toBe(true)
		expect(OPEN_SORT_KEY).not.toBe(BOUGHT_SORT_KEY)
	})

	it('are by area when nothing was saved', () => {
		expect(loadOpenSort(memoryStorage())).toBe('area')
		expect(loadBoughtSort(memoryStorage())).toBe('area')
	})

	it('read back what was saved, each on its own', () => {
		const storage = memoryStorage()
		saveOpenSort(storage, 'areaAlpha')
		saveBoughtSort(storage, 'recent')
		expect(loadOpenSort(storage)).toBe('areaAlpha')
		expect(loadBoughtSort(storage)).toBe('recent')
		saveOpenSort(storage, 'alpha')
		expect(loadOpenSort(storage)).toBe('alpha')
		expect(loadBoughtSort(storage)).toBe('recent')
	})

	it('ignore a value they do not know', () => {
		const storage = memoryStorage({ [OPEN_SORT_KEY]: 'recent', [BOUGHT_SORT_KEY]: 'price' })
		expect(loadOpenSort(storage)).toBe('area')
		expect(loadBoughtSort(storage)).toBe('area')
	})

	it('remove the entry when going back to by area', () => {
		const storage = memoryStorage()
		saveOpenSort(storage, 'alpha')
		saveBoughtSort(storage, 'alpha')
		saveOpenSort(storage, 'area')
		saveBoughtSort(storage, 'area')
		expect(storage.data).toEqual({})
	})

	it('are by area without storage or with storage blocked, and saving never throws', () => {
		expect(loadOpenSort(null)).toBe('area')
		expect(loadBoughtSort(blockedStorage)).toBe('area')
		expect(() => saveOpenSort(null, 'alpha')).not.toThrow()
		expect(() => saveBoughtSort(blockedStorage, 'alpha')).not.toThrow()
	})
})
