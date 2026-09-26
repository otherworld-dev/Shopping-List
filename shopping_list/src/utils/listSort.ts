/**
 * How a user's lists are ordered, chosen under Settings. Pinned lists come
 * first, then their own, then those shared with them; each section is sorted
 * by the chosen mode. Mirrors lib/Service/ListOrder.php, so a change shows at
 * once without waiting for the server.
 */

import type { ShoppingList } from '../types'

export type ListSort = 'updated' | 'alpha' | 'custom'
export const LIST_SORTS: readonly ListSort[] = ['updated', 'alpha', 'custom']

export type SectionKey = 'pinned' | 'owned' | 'shared'

export interface ListSections {
	pinned: ShoppingList[]
	owned: ShoppingList[]
	shared: ShoppingList[]
}

/** A stored value; anything unknown counts as recently updated. */
export function readListSort(raw: unknown): ListSort {
	return LIST_SORTS.find(sort => sort === raw) ?? 'updated'
}

function time(list: ShoppingList): number {
	const ms = Date.parse(list.updatedAt)
	return Number.isNaN(ms) ? -Infinity : ms
}

function newestFirst(a: ShoppingList, b: ShoppingList): number {
	const ta = time(a)
	const tb = time(b)
	if (ta === tb) return 0
	return tb > ta ? 1 : -1
}

function byPosition(a: ShoppingList, b: ShoppingList): number {
	const pa = a.position ?? null
	const pb = b.position ?? null
	if (pa === null && pb === null) return newestFirst(a, b)
	if (pa === null) return -1
	if (pb === null) return 1
	return pa - pb
}

export function sortLists(lists: ShoppingList[], sort: ListSort, language: string): ListSections {
	const collator = new Intl.Collator(language, { sensitivity: 'base', numeric: true })
	const compare = (a: ShoppingList, b: ShoppingList): number => {
		const byMode = sort === 'alpha'
			? collator.compare(a.title, b.title)
			: sort === 'custom' ? byPosition(a, b) : newestFirst(a, b)
		return byMode !== 0 ? byMode : a.id - b.id
	}
	return {
		pinned: lists.filter(l => l.isPinned === true).sort(compare),
		owned: lists.filter(l => l.isPinned !== true && l.isOwner).sort(compare),
		shared: lists.filter(l => l.isPinned !== true && !l.isOwner).sort(compare),
	}
}
