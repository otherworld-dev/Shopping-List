import { describe, expect, it } from 'vitest'
import { freezeOrder, planListReorder } from './listReorder'
import type { ListSections } from './listSort'
import type { ShoppingList } from '../types'

const l = (id: number) => ({ id } as ShoppingList)
const sections: ListSections = { pinned: [l(1)], owned: [l(2), l(3)], shared: [] }

describe('planListReorder', () => {
	it('saves only the dropped section when already on Custom', () => {
		expect(planListReorder(sections, 'owned', [3, 2], 'custom')).toEqual({ saves: [[3, 2]], switchToCustom: false })
	})

	it('keeps every other section as it shows when a drop switches to Custom', () => {
		expect(planListReorder(sections, 'owned', [3, 2], 'updated')).toEqual({ saves: [[1], [3, 2]], switchToCustom: true })
	})
})

describe('freezeOrder', () => {
	it('saves each non-empty section as it shows', () => {
		expect(freezeOrder(sections)).toEqual([[1], [2, 3]])
	})
})
