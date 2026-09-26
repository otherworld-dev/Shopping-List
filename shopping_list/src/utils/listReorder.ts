/**
 * What saving a new list order involves. Switching to Custom must keep what
 * the user sees, so every section's current order is saved as positions
 * before the setting changes; otherwise lists never placed would jump.
 */

import type { ListSections, ListSort, SectionKey } from './listSort'

const KEYS: readonly SectionKey[] = ['pinned', 'owned', 'shared']

/** Each non-empty section's ids in the order it shows now. */
export function freezeOrder(sections: ListSections): number[][] {
	return KEYS.map(key => sections[key].map(l => l.id)).filter(ids => ids.length > 0)
}

/** The saves a drop in one section needs, in order, and whether it switches the sort to Custom. */
export function planListReorder(sections: ListSections, key: SectionKey, order: number[], current: ListSort): { saves: number[][], switchToCustom: boolean } {
	if (current === 'custom') {
		return { saves: [order], switchToCustom: false }
	}
	const saves = KEYS
		.map(k => (k === key ? order : sections[k].map(l => l.id)))
		.filter(ids => ids.length > 0)
	return { saves, switchToCustom: true }
}
