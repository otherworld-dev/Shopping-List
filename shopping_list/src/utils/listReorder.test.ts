import { describe, expect, it } from 'vitest'
import { freezeUnplaced, planListReorder } from './listReorder'
import type { ListSections } from './listSort'
import type { ShoppingList } from '../types'

const l = (id: number, position: number | null = null) => ({ id, position } as ShoppingList)
const sections: ListSections = { pinned: [l(1)], owned: [l(2), l(3)], shared: [] }

describe('planListReorder', () => {
	it('saves only the dropped section when already on Custom', () => {
		expect(planListReorder(sections, 'owned', [3, 2], 'custom')).toEqual({ saves: [[3, 2]], switchToCustom: false })
	})

	it('keeps every other section as it shows when a drop switches to Custom', () => {
		expect(planListReorder(sections, 'owned', [3, 2], 'updated')).toEqual({ saves: [[1], [3, 2]], switchToCustom: true })
	})
})

// Replaces the old freezeOrder, which froze every section regardless of
// whether it already had a saved order - that let choosing Custom in
// Settings overwrite a saved custom order with whatever sort was on screen.
describe('freezeUnplaced', () => {
	it('saves a section with no positions yet in the order it shows', () => {
		expect(freezeUnplaced(sections)).toEqual([[1], [2, 3]])
	})

	it('leaves out a section where a list already has a position', () => {
		const withPositions: ListSections = { pinned: [l(1)], owned: [l(2, 0), l(3, null)], shared: [] }
		expect(freezeUnplaced(withPositions)).toEqual([[1]])
	})

	it('leaves out empty sections', () => {
		expect(freezeUnplaced({ pinned: [], owned: [l(2)], shared: [] })).toEqual([[2]])
	})
})
