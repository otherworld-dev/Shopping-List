import { describe, expect, it, vi } from 'vitest'
import type { Item } from '../types'

// Plurals are English-only, gated on the viewer's language.
vi.mock('@nextcloud/l10n', () => ({ getLanguage: () => 'en' }))

const { findCheckedMatch, mergeQuantities, normalizeName, pluralizeName } = await import('./itemMerge')

describe('pluralizeName', () => {
	it('pluralizes countable items', () => {
		expect(pluralizeName('Apple')).toBe('Apples')
		expect(pluralizeName('Berry')).toBe('Berries')
		expect(pluralizeName('Tomato')).toBe('Tomatoes')
		expect(pluralizeName('Red apple')).toBe('Red apples')
	})

	it('leaves a name that is already plural alone', () => {
		expect(pluralizeName('Eggs')).toBe('Eggs')
	})

	it('leaves uncountable groceries alone', () => {
		for (const name of ['Milk', 'Bread', 'Butter', 'Flour', 'Sugar', 'Coffee', 'Fish', 'Pasta', 'Cheese']) {
			expect(pluralizeName(name)).toBe(name)
		}
	})

	it('reads the last word, so a qualified mass noun stays singular', () => {
		expect(pluralizeName('Oat milk')).toBe('Oat milk')
		expect(pluralizeName('Olive oil')).toBe('Olive oil')
		expect(pluralizeName('Ice cream')).toBe('Ice cream')
	})
})

describe('normalizeName', () => {
	it('still matches a typed plural of an uncountable noun', () => {
		expect(normalizeName('Milks')).toBe(normalizeName('Milk'))
	})
})

describe('mergeQuantities', () => {
	it('adds up the short forms of a unit with the long ones', () => {
		expect(mergeQuantities('3 pcs', '2 pieces')).toBe('5 pcs')
		expect(mergeQuantities('25 dag', '10 dkg')).toBe('35 dag')
		expect(mergeQuantities('2 pkg', '1 pack')).toBe('3 pkg')
	})

	it('treats a bare name as one more, as before', () => {
		expect(mergeQuantities('500 g', '1')).toBe('500 g + 1')
	})
})

describe('findCheckedMatch', () => {
	const item = (id: number, name: string, checked: boolean) => ({ id, name, checked }) as Item

	it('finds a ticked item of the same name', () => {
		const items = [item(1, 'Bread', false), item(2, 'Milk', true)]
		expect(findCheckedMatch(items, 'milk')?.id).toBe(2)
	})

	it('matches a plural to its singular', () => {
		expect(findCheckedMatch([item(1, 'Apple', true)], 'Apples')?.id).toBe(1)
	})

	it('leaves unticked items alone', () => {
		expect(findCheckedMatch([item(1, 'Milk', false)], 'Milk')).toBeUndefined()
	})

	it('takes the first of several ticked copies', () => {
		const items = [item(1, 'Milk', true), item(2, 'Milk', true)]
		expect(findCheckedMatch(items, 'Milk')?.id).toBe(1)
	})
})
