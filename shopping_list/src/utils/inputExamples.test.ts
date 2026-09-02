import { describe, expect, it } from 'vitest'
import enJson from '../../resources/parsing/en.json'
import { createIngredientParser } from './parseIngredient'
import { INPUT_EXAMPLES } from './inputExamples'
import type { ParsingPack } from './localePacks'

const en = createIngredientParser({ ...enJson, unitAliases: {} } as ParsingPack)

// The input help shows each example next to what the parser makes of it, so
// these pin down that the examples really demonstrate what they are there to
// demonstrate: a bullet, a checkbox with a count, a ticked checkbox, a unit,
// a numbered line.
describe('input help examples', () => {
	it('parse to the results the help is meant to show', () => {
		expect(INPUT_EXAMPLES.map(line => en.parseIngredient(line))).toEqual([
			{ name: 'Apples', quantity: null, checked: false },
			{ name: 'Bananas', quantity: '3', checked: false },
			{ name: 'Eggs', quantity: null, checked: true },
			{ name: 'Flour', quantity: '2 cups', checked: false },
			{ name: 'Milk', quantity: null, checked: false },
		])
	})

	it('all strip their list markup, so no example shows a marker in the name', () => {
		for (const line of INPUT_EXAMPLES) {
			const { name } = en.parseIngredient(line)
			expect(name).not.toBe('')
			expect(name).not.toMatch(/^[-*[\d]/)
		}
	})
})
