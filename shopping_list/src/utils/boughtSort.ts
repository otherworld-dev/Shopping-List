/**
 * How the bought (checked-off) items are ordered.
 *
 * - `list`: the order they had on the list, which is how they always showed
 * - `alpha`: by name, following the viewer's language
 * - `recent`: the item ticked last at the top
 *
 * Like collapsed areas this is a view preference, not list data, so it lives
 * in localStorage and never goes to the server. It is one choice for all
 * lists: someone who wants A to Z wants it everywhere.
 */

import type { StorageLike } from './browserStorage'
import type { Item } from '../types'

export type BoughtSort = 'list' | 'alpha' | 'recent'

const SORTS: readonly BoughtSort[] = ['list', 'alpha', 'recent']

/** Every Nextcloud app shares one localStorage, so the key starts with the app id. */
export const STORAGE_KEY = 'shopping_list.boughtSort'

function time(item: Item): number {
	const ms = Date.parse(item.updatedAt)
	return Number.isNaN(ms) ? -Infinity : ms
}

/**
 * The bought items in the chosen order, as a new array. Items that compare
 * equal keep their list order, since Array.prototype.sort is stable.
 *
 * "Recently bought" uses updatedAt: the server stamps it when an item is
 * ticked, and a ticked item cannot be edited, so for bought items it is the
 * time they were ticked.
 */
export function sortBought(items: Item[], sort: BoughtSort, language: string): Item[] {
	const sorted = [...items]
	if (sort === 'alpha') {
		const collator = new Intl.Collator(language, { sensitivity: 'base', numeric: true })
		sorted.sort((a, b) => collator.compare(a.name, b.name))
	} else if (sort === 'recent') {
		sorted.sort((a, b) => time(b) - time(a))
	}
	return sorted
}

/**
 * The saved choice. Anything unreadable counts as list order: storage can be
 * missing, blocked, or hold a value some other version wrote.
 */
export function loadBoughtSort(storage: StorageLike | null): BoughtSort {
	if (!storage) return 'list'
	try {
		const raw = storage.getItem(STORAGE_KEY)
		return SORTS.find(sort => sort === raw) ?? 'list'
	} catch {
		return 'list'
	}
}

/**
 * Save the choice. List order is the default, so choosing it removes the
 * entry. A refused write is dropped: the choice still holds for this page view.
 */
export function saveBoughtSort(storage: StorageLike | null, sort: BoughtSort): void {
	if (!storage) return
	try {
		if (sort === 'list') {
			storage.removeItem(STORAGE_KEY)
		} else {
			storage.setItem(STORAGE_KEY, sort)
		}
	} catch {
		// Nothing useful to do. The in-memory choice is already updated.
	}
}
