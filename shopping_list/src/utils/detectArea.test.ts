import { describe, expect, it } from 'vitest'
import { areaForNewItem, detectArea } from './detectArea'
import type { ShopArea } from '../types'

function area(id: number, name: string, keywords: string[]): ShopArea {
	return { id, listId: 1, name, sortOrder: id, color: null, keywords, nameKey: null }
}

const meat = area(1, 'Meat', ['ham', 'bacon'])
const dairy = area(2, 'Dairy', ['milk', 'crème fraîche'])
const care = area(3, 'Personal Care', ['shampoo'])
const other = area(4, 'Other', [])
const areas = [meat, dairy, care, other]

describe('detectArea', () => {
	it('finds the area whose keyword the name contains', () => {
		expect(detectArea('Oat milk', areas)).toBe(dairy.id)
	})

	it('has no area for a name no keyword matches', () => {
		expect(detectArea('Batteries', areas)).toBeNull()
	})

	it('prefers the longest keyword, so "ham" does not claim shampoo', () => {
		expect(detectArea('Shampoo', areas)).toBe(care.id)
	})

	it('keeps the earlier area when two keywords are the same length', () => {
		expect(detectArea('Ham and milk', [meat, area(9, 'Deli', ['ham'])])).toBe(meat.id)
	})

	it('ignores case and accents on both sides', () => {
		expect(detectArea('CREME FRAICHE', areas)).toBe(dairy.id)
		expect(detectArea('Müsli', [area(5, 'Cereal', ['musli'])])).toBe(5)
	})

	it('skips empty keywords, which would otherwise match everything', () => {
		expect(detectArea('Batteries', [area(6, 'Odd', [''])])).toBeNull()
	})

	it('has no area in a list with no areas', () => {
		expect(detectArea('Milk', [])).toBeNull()
	})
})

describe('areaForNewItem', () => {
	it('uses the area the user picked over everything else', () => {
		expect(areaForNewItem('Milk', areas, care.id, other.id)).toBe(care.id)
	})

	it('uses a keyword match over the default area', () => {
		expect(areaForNewItem('Milk', areas, null, other.id)).toBe(dairy.id)
	})

	it('falls back to the list\'s default area when no keyword matches', () => {
		expect(areaForNewItem('Batteries', areas, null, other.id)).toBe(other.id)
	})

	it('leaves the item uncategorised when the list has no default', () => {
		expect(areaForNewItem('Batteries', areas, null, null)).toBeNull()
	})

	it('ignores a default that is not one of the list\'s areas', () => {
		// The area was deleted and this copy of the list hasn't caught up yet.
		expect(areaForNewItem('Batteries', areas, null, 99)).toBeNull()
	})
})
