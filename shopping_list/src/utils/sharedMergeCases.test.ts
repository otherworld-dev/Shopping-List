import { describe, expect, it, vi } from 'vitest'
import cases from '../../tests/fixtures/merge-cases.json'

// The same cases are run through the PHP port by tests/Unit/ItemMergeTest.php,
// so the two can't drift apart. Plurals are English-only, gated on the language.
vi.mock('@nextcloud/l10n', () => ({ getLanguage: () => 'en' }))

const { mergeQuantities, normalizeName, pluralizeName } = await import('./itemMerge')

describe('shared merge cases', () => {
	for (const [input, expected] of cases.normalize) {
		it(`normalizes ${JSON.stringify(input)}`, () => {
			expect(normalizeName(input)).toBe(expected)
		})
	}

	for (const [input, expected] of cases.pluralize) {
		it(`pluralizes ${JSON.stringify(input)}`, () => {
			expect(pluralizeName(input)).toBe(expected)
		})
	}

	for (const [existing, incoming, expected] of cases.merge as [string | null, string | null, string][]) {
		it(`merges ${JSON.stringify(existing)} and ${JSON.stringify(incoming)}`, () => {
			expect(mergeQuantities(existing, incoming)).toBe(expected)
		})
	}
})
