import { describe, expect, it } from 'vitest'
import { readListSort, sortLists } from './listSort'
import type { ListSections } from './listSort'
import type { ShoppingList } from '../types'

function list(id: number, title: string, updatedAt: string, extra: Partial<ShoppingList> = {}): ShoppingList {
	return {
		id,
		userId: 'alice',
		title,
		permission: 1,
		isOwner: true,
		isPinned: null,
		position: null,
		createdAt: '2026-09-01T00:00:00Z',
		updatedAt,
		...extra,
	}
}

const ids = (sections: ListSections) => [sections.pinned, sections.owned, sections.shared].map(s => s.map(l => l.id))

describe('sortLists', () => {
	it('splits pinned, owned and shared whatever the sort', () => {
		const lists = [
			list(1, 'Shared', '2026-09-26T12:00:00Z', { isOwner: false }),
			list(2, 'Owned', '2026-09-20T12:00:00Z'),
			list(3, 'Pinned', '2026-09-01T12:00:00Z', { isPinned: true }),
		]
		for (const sort of ['updated', 'alpha', 'custom'] as const) {
			expect(ids(sortLists(lists, sort, 'en'))).toEqual([[3], [2], [1]])
		}
	})

	it('puts the most recently updated first', () => {
		const lists = [list(1, 'Old', '2026-09-01T12:00:00Z'), list(2, 'New', '2026-09-26T12:00:00Z')]
		expect(ids(sortLists(lists, 'updated', 'en'))[1]).toEqual([2, 1])
	})

	it('sorts A to Z in the language, ignoring case and reading numbers by value', () => {
		const lists = [list(1, 'weekend 10', '2026-09-26T12:00:00Z'), list(2, 'Weekend 9', '2026-09-01T12:00:00Z'), list(3, 'apples', '2026-09-10T12:00:00Z')]
		expect(ids(sortLists(lists, 'alpha', 'en'))[1]).toEqual([3, 2, 1])
	})

	it('puts unplaced lists first, newest first, then the rest by position', () => {
		const lists = [
			list(1, 'Second', '2026-09-01T12:00:00Z', { position: 1 }),
			list(2, 'First', '2026-09-02T12:00:00Z', { position: 0 }),
			list(3, 'New', '2026-09-26T12:00:00Z'),
			list(4, 'Older new', '2026-09-20T12:00:00Z'),
		]
		expect(ids(sortLists(lists, 'custom', 'en'))[1]).toEqual([3, 4, 2, 1])
	})

	it('breaks ties by id, and an unreadable time sorts last', () => {
		const lists = [list(5, 'Same', 'not a date'), list(4, 'Same', 'not a date'), list(6, 'Dated', '2026-09-01T12:00:00Z')]
		expect(ids(sortLists(lists, 'updated', 'en'))[1]).toEqual([6, 4, 5])
	})
})

describe('readListSort', () => {
	it('reads the three sorts and anything else as recently updated', () => {
		expect(readListSort('custom')).toBe('custom')
		expect(readListSort('alpha')).toBe('alpha')
		expect(readListSort('price')).toBe('updated')
		expect(readListSort(undefined)).toBe('updated')
	})
})
