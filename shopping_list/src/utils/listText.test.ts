import { describe, expect, it } from 'vitest'
import { formatListAsText } from './listText'
import type { Item } from '../types'

let nextId = 1
const item = (partial: Partial<Item>): Item => ({
	id: nextId++,
	listId: 1,
	name: 'Item',
	quantity: null,
	unit: null,
	shopAreaId: null,
	checked: false,
	checkedBy: null,
	sortOrder: 0,
	tags: [],
	createdAt: '',
	updatedAt: '',
	...partial,
})

describe('formatListAsText', () => {
	it('writes one item per line', () => {
		const text = formatListAsText([
			item({ name: 'Milk' }),
			item({ name: 'Bananas' }),
		])
		expect(text).toBe('Milk\nBananas')
	})

	it('puts the quantity before the name', () => {
		expect(formatListAsText([item({ name: 'Eggs', quantity: '6' })])).toBe('6 Eggs')
	})

	it('puts the unit between the quantity and the name', () => {
		expect(formatListAsText([item({ name: 'Flour', quantity: '2', unit: 'cups' })])).toBe('2 cups Flour')
	})

	it('omits a quantity of 1, which is the implicit default', () => {
		expect(formatListAsText([item({ name: 'Milk', quantity: '1' })])).toBe('Milk')
	})

	it('keeps a quantity of 1 when it carries a unit', () => {
		expect(formatListAsText([item({ name: 'Milk', quantity: '1', unit: 'l' })])).toBe('1 l Milk')
	})

	it('skips checked items', () => {
		const text = formatListAsText([
			item({ name: 'Milk' }),
			item({ name: 'Bread', checked: true }),
			item({ name: 'Bananas' }),
		])
		expect(text).toBe('Milk\nBananas')
	})

	it('returns an empty string when there is nothing to write', () => {
		expect(formatListAsText([])).toBe('')
		expect(formatListAsText([item({ name: 'Bread', checked: true })])).toBe('')
	})

	it('round trips through the paste parser', async () => {
		const { createIngredientParser } = await import('./parseIngredient')
		const enJson = (await import('../../resources/parsing/en.json')).default
		const { parseIngredient } = createIngredientParser({ ...enJson, unitAliases: {} } as never)

		const items = [
			item({ name: 'Flour', quantity: '2', unit: 'cups' }),
			item({ name: 'Milk' }),
			item({ name: 'Eggs', quantity: '6' }),
		]
		const lines = formatListAsText(items).split('\n')

		expect(lines.map(l => parseIngredient(l))).toEqual([
			{ name: 'Flour', quantity: '2 cups', checked: false },
			{ name: 'Milk', quantity: null, checked: false },
			{ name: 'Eggs', quantity: '6', checked: false },
		])
	})
})
