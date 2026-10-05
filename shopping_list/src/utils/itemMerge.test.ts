import { describe, expect, it, vi } from 'vitest'

// Plurals are English-only, gated on the viewer's language.
vi.mock('@nextcloud/l10n', () => ({ getLanguage: () => 'en' }))

const { normalizeName, pluralizeName } = await import('./itemMerge')

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
