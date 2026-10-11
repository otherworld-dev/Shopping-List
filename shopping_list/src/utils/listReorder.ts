/**
 * What saving a new list order involves. Switching to Custom must keep what
 * the user sees, so a section not yet given an order of its own has its
 * current order saved as positions before the setting changes; otherwise
 * lists never placed would jump. A section that already has a saved order
 * keeps it - Choosing Custom again in Settings must not overwrite it with
 * whatever the previous sort happened to be showing.
 */

import type { ListSections, ListSort, SectionKey } from './listSort'

const KEYS: readonly SectionKey[] = ['pinned', 'owned', 'shared']

/** Each non-empty, not-yet-placed section's ids, frozen in the order it shows now. */
export function freezeUnplaced(sections: ListSections): number[][] {
	return KEYS
		.map(key => sections[key])
		.filter(lists => lists.length > 0 && lists.every(l => l.position == null))
		.map(lists => lists.map(l => l.id))
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
