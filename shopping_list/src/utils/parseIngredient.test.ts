import { describe, expect, it } from 'vitest'
import enJson from '../../resources/parsing/en.json'
import deJson from '../../resources/parsing/de.json'
import { createIngredientParser } from './parseIngredient'
import type { ParsingPack } from './localePacks'

// unitAliases is only consulted when merging duplicate items, never when
// parsing, so an empty map is faithful here.
const pack = (raw: object): ParsingPack => ({ ...raw, unitAliases: {} } as ParsingPack)
const en = createIngredientParser(pack(enJson))
const de = createIngredientParser(pack(deJson))

describe('stripListMarkup', () => {
	it('rewrites a bracketed quantity so the quantity parser can read it', () => {
		expect(en.stripListMarkup('[ 10 ] Aepfel')).toBe('10 Aepfel')
	})

	it('removes an empty checkbox', () => {
		expect(en.stripListMarkup('[ ] Milk')).toBe('Milk')
	})

	it('removes a ticked checkbox, discarding the checked state', () => {
		expect(en.stripListMarkup('[x] 10, Aepfel')).toBe('10, Aepfel')
		expect(en.stripListMarkup('[X] Bread')).toBe('Bread')
	})

	it('removes bullet markers', () => {
		expect(en.stripListMarkup('- Bananas')).toBe('Bananas')
		expect(en.stripListMarkup('* Bananas')).toBe('Bananas')
		expect(en.stripListMarkup('• Bananas')).toBe('Bananas')
	})

	it('removes an ordered-list index without reading it as a quantity', () => {
		expect(en.stripListMarkup('1. Milk')).toBe('Milk')
		expect(en.stripListMarkup('2) Bread')).toBe('Bread')
	})

	it('leaves an unmarked line alone', () => {
		expect(en.stripListMarkup('Plain item')).toBe('Plain item')
		expect(en.stripListMarkup('2 cups flour')).toBe('2 cups flour')
	})

	it('does not mistake a decimal for an ordered-list index', () => {
		expect(en.stripListMarkup('1.5 kg potatoes')).toBe('1.5 kg potatoes')
	})
})

describe('parseIngredient with list markup', () => {
	it('reads a bracketed quantity', () => {
		expect(en.parseIngredient('[ 1 ] Knusperstangen')).toEqual({ name: 'Knusperstangen', quantity: '1' })
		expect(en.parseIngredient('[ 10 ] Aepfel')).toEqual({ name: 'Aepfel', quantity: '10' })
	})

	it('reads a checkbox line with a quantity', () => {
		expect(en.parseIngredient('[x] 10, Aepfel')).toEqual({ name: 'Aepfel', quantity: '10' })
	})

	it('reads a bulleted line', () => {
		expect(en.parseIngredient('- Bananas')).toEqual({ name: 'Bananas', quantity: null })
	})
})

describe('parseIngredient capitalisation', () => {
	it('leaves an intercapped product name alone', () => {
		expect(en.parseIngredient('iPhone charger').name).toBe('iPhone charger')
		expect(en.parseIngredient('eBay voucher').name).toBe('eBay voucher')
	})

	it('still capitalises an ordinary lowercase name', () => {
		expect(en.parseIngredient('flour').name).toBe('Flour')
		expect(en.parseIngredient('apple').name).toBe('Apple')
	})

	it('leaves an already-capitalised name alone', () => {
		expect(en.parseIngredient('Flour').name).toBe('Flour')
	})
})

describe('parseIngredient quantity and unit, English', () => {
	it('splits a quantity, a unit and a name', () => {
		expect(en.parseIngredient('2 cups flour')).toEqual({ name: 'Flour', quantity: '2 cups' })
	})

	it('reads a fraction', () => {
		expect(en.parseIngredient('1/2 lemon')).toEqual({ name: 'Lemon', quantity: '1/2' })
	})

	it('reads a range', () => {
		expect(en.parseIngredient('2-3 eggs')).toEqual({ name: 'Eggs', quantity: '2-3' })
	})

	it('reads a leading unit with no number', () => {
		expect(en.parseIngredient('Pinch of salt')).toEqual({ name: 'Salt', quantity: '1 pinch' })
	})

	it('returns no quantity when there is none', () => {
		expect(en.parseIngredient('Bananas')).toEqual({ name: 'Bananas', quantity: null })
	})

	it('ignores an empty line', () => {
		expect(en.parseIngredient('   ')).toEqual({ name: '', quantity: null })
	})
})

describe('parseIngredient quantity and unit, German', () => {
	it('reads a decimal comma and a unit', () => {
		expect(de.parseIngredient('0,5 l Milch')).toEqual({ name: 'Milch', quantity: '0.5 l' })
		expect(de.parseIngredient('1,5 kg Kartoffeln')).toEqual({ name: 'Kartoffeln', quantity: '1.5 kg' })
	})

	it('reads a leading unit with no number', () => {
		expect(de.parseIngredient('Prise Salz')).toEqual({ name: 'Salz', quantity: '1 prise' })
	})

	it('keeps a bare number as the quantity of a capitalised noun', () => {
		// German capitalises every noun, which is why the leading-digit fix
		// described in issue #35 was deferred: any rule that rescues "7 Up"
		// breaks this case.
		expect(de.parseIngredient('2 Eier')).toEqual({ name: 'Eier', quantity: '2' })
	})
})

describe('parseIngredient known limitation, deferred', () => {
	it('still swallows a leading digit that belongs to the name', () => {
		// Documents current behaviour, not desired behaviour. See the German
		// case above for why this is not safely fixable with a heuristic.
		expect(en.parseIngredient('7 Up')).toEqual({ name: 'Up', quantity: '7' })
	})
})
