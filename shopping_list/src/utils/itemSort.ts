/**
 * How the items on a list are ordered, chosen in the list's menu.
 *
 * Open items (OpenSort):
 * - `area`: grouped by shop area, in the order you dragged them
 * - `areaAlpha`: grouped by shop area, A to Z inside each area
 * - `alpha`: one list A to Z, no area groups
 *
 * Checked-off items (BoughtSort):
 * - `area`: in shop area order
 * - `alpha`: A to Z
 * - `recent`: the item ticked last at the top
 *
 * Like collapsed areas these are view preferences, not list data, so they
 * live in localStorage and never go to the server, and they never touch the
 * drag order everyone on a shared list sees. Each is one choice for all
 * lists: someone who wants A to Z wants it everywhere.
 */

import type { StorageLike } from './browserStorage'
import type { Item, ShopArea } from '../types'

export type OpenSort = 'area' | 'areaAlpha' | 'alpha'
export type BoughtSort = 'area' | 'alpha' | 'recent'

// The first entry is the default.
const OPEN_SORTS: readonly OpenSort[] = ['area', 'areaAlpha', 'alpha']
const BOUGHT_SORTS: readonly BoughtSort[] = ['area', 'alpha', 'recent']

/** Every Nextcloud app shares one localStorage, so the keys start with the app id. */
export const OPEN_SORT_KEY = 'shopping_list.openSort'
export const BOUGHT_SORT_KEY = 'shopping_list.boughtSort'

export interface AreaGroup {
	areaId: number | null
	areaName: string | null
	areaColor: string | null
	items: Item[]
}

function byName(language: string): (a: Item, b: Item) => number {
	const collator = new Intl.Collator(language, { sensitivity: 'base', numeric: true })
	return (a, b) => collator.compare(a.name, b.name)
}

function time(item: Item): number {
	const ms = Date.parse(item.updatedAt)
	return Number.isNaN(ms) ? -Infinity : ms
}

/**
 * The open items as the list shows them. Grouped by area, the groups follow
 * the list's area order, and items with no area, or an area the list no
 * longer has, come last in a group of their own. A to Z is a single group
 * with no area, so the view shows it without a header.
 *
 * Sorting is stable, so items that compare equal keep their list order.
 */
export function groupOpenItems(items: Item[], areas: ShopArea[], sort: OpenSort, language: string): AreaGroup[] {
	if (items.length === 0) return []

	if (sort === 'alpha') {
		return [{ areaId: null, areaName: null, areaColor: null, items: [...items].sort(byName(language)) }]
	}

	const grouped = new Map<number | null, Item[]>()
	for (const item of items) {
		const list = grouped.get(item.shopAreaId)
		if (list) {
			list.push(item)
		} else {
			grouped.set(item.shopAreaId, [item])
		}
	}

	const result: AreaGroup[] = []
	for (const area of areas) {
		const areaItems = grouped.get(area.id)
		if (areaItems) {
			result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, items: areaItems })
			grouped.delete(area.id)
		}
	}

	const uncategorized = [...grouped.values()].flat()
	if (uncategorized.length > 0) {
		result.push({ areaId: null, areaName: null, areaColor: null, items: uncategorized })
	}

	if (sort === 'areaAlpha') {
		const compare = byName(language)
		for (const group of result) group.items.sort(compare)
	}
	return result
}

/**
 * The checked-off items in the chosen order, as a new array. Sorting is
 * stable, so items that compare equal keep their list order.
 *
 * "Most recent first" uses updatedAt: the server stamps it when an item is
 * ticked, and a ticked item cannot be edited, so for these items it is the
 * time they were ticked.
 */
export function sortBought(items: Item[], sort: BoughtSort, areas: ShopArea[], language: string): Item[] {
	const sorted = [...items]
	if (sort === 'area') {
		const position = new Map(areas.map((area, index) => [area.id, index]))
		const rank = (item: Item) => (item.shopAreaId === null ? undefined : position.get(item.shopAreaId)) ?? areas.length
		sorted.sort((a, b) => rank(a) - rank(b))
	} else if (sort === 'alpha') {
		sorted.sort(byName(language))
	} else {
		sorted.sort((a, b) => time(b) - time(a))
	}
	return sorted
}

/**
 * A saved choice. Anything unreadable counts as the default: storage can be
 * missing, blocked, or hold a value some other version wrote.
 */
function loadChoice<T extends string>(storage: StorageLike | null, key: string, choices: readonly T[]): T {
	if (!storage) return choices[0]
	try {
		const raw = storage.getItem(key)
		return choices.find(choice => choice === raw) ?? choices[0]
	} catch {
		return choices[0]
	}
}

/**
 * Save a choice. Choosing the default removes the entry. A refused write is
 * dropped: the choice still holds for this page view.
 */
function saveChoice<T extends string>(storage: StorageLike | null, key: string, choices: readonly T[], value: T): void {
	if (!storage) return
	try {
		if (value === choices[0]) {
			storage.removeItem(key)
		} else {
			storage.setItem(key, value)
		}
	} catch {
		// Nothing useful to do. The in-memory choice is already updated.
	}
}

export function loadOpenSort(storage: StorageLike | null): OpenSort {
	return loadChoice(storage, OPEN_SORT_KEY, OPEN_SORTS)
}

export function saveOpenSort(storage: StorageLike | null, sort: OpenSort): void {
	saveChoice(storage, OPEN_SORT_KEY, OPEN_SORTS, sort)
}

export function loadBoughtSort(storage: StorageLike | null): BoughtSort {
	return loadChoice(storage, BOUGHT_SORT_KEY, BOUGHT_SORTS)
}

export function saveBoughtSort(storage: StorageLike | null, sort: BoughtSort): void {
	saveChoice(storage, BOUGHT_SORT_KEY, BOUGHT_SORTS, sort)
}
