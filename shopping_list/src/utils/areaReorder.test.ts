import { describe, expect, it } from 'vitest'
import { planAreaMove } from './areaReorder'

const a = (id: number, sortOrder: number) => ({ id, sortOrder })

describe('planAreaMove', () => {
	it('swaps two neighbours when the order is already clean', () => {
		const areas = [a(1, 0), a(2, 1), a(3, 2)]
		expect(planAreaMove(areas, 1, 1)).toEqual([
			{ id: 3, sortOrder: 1 },
			{ id: 2, sortOrder: 2 },
		])
	})

	it('renumbers every area when new areas all share 0', () => {
		// Produce 0, three areas added before the fix (all 0), then the defaults
		// left after two were deleted. Moving the last new area down one.
		const areas = [a(1, 0), a(13, 0), a(14, 0), a(15, 0), a(4, 3), a(5, 4)]
		// New order 1, 13, 14, 4, 15, 5. Areas 1 and 4 already hold 0 and 3.
		expect(planAreaMove(areas, 3, 1)).toEqual([
			{ id: 13, sortOrder: 1 },
			{ id: 14, sortOrder: 2 },
			{ id: 15, sortOrder: 4 },
			{ id: 5, sortOrder: 5 },
		])
	})

	it('closes gaps left by deleted areas', () => {
		const areas = [a(1, 0), a(4, 3), a(12, 11)]
		expect(planAreaMove(areas, 0, 1)).toEqual([
			{ id: 4, sortOrder: 0 },
			{ id: 1, sortOrder: 1 },
			{ id: 12, sortOrder: 2 },
		])
	})

	it('does nothing past either end', () => {
		const areas = [a(1, 0), a(2, 1)]
		expect(planAreaMove(areas, 0, -1)).toEqual([])
		expect(planAreaMove(areas, 1, 1)).toEqual([])
	})
})
