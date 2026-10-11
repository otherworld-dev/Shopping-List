import { describe, expect, it } from 'vitest'
import { clearImageKeys, spreadImageKey } from './imageSpread'

const rows = () => [
	{ id: 1, name: 'Cheese', imageKey: null as string | null },
	{ id: 2, name: '  CHEESE ', imageKey: 'aaaaaaaaaaaaaaaa' as string | null },
	{ id: 3, name: 'Milk', imageKey: 'aaaaaaaaaaaaaaaa' as string | null },
	{ id: 4, name: 'Cheddar cheese', imageKey: null as string | null },
]

describe('spreadImageKey', () => {
	it('gives the key to every item with the same name, ignoring case and spaces', () => {
		const items = rows()
		spreadImageKey(items, 'cheese', 'bbbbbbbbbbbbbbbb')
		expect(items.map(i => i.imageKey)).toEqual([
			'bbbbbbbbbbbbbbbb', 'bbbbbbbbbbbbbbbb', 'aaaaaaaaaaaaaaaa', null,
		])
	})

	it('does nothing for a blank name', () => {
		const items = [{ id: 1, name: ' ', imageKey: null as string | null }]
		spreadImageKey(items, '  ', 'bbbbbbbbbbbbbbbb')
		expect(items[0].imageKey).toBeNull()
	})
})

describe('clearImageKeys', () => {
	it('takes the photo off every item showing that key', () => {
		const items = rows()
		clearImageKeys(items, 'aaaaaaaaaaaaaaaa', 'Cheese')
		expect(items.map(i => i.imageKey)).toEqual([null, null, null, null])
	})

	it('also clears same-named items that show another photo', () => {
		const items = [
			{ id: 1, name: 'Cheese', imageKey: 'aaaaaaaaaaaaaaaa' as string | null },
			{ id: 2, name: 'cheese', imageKey: 'cccccccccccccccc' as string | null },
			{ id: 3, name: 'Milk', imageKey: 'cccccccccccccccc' as string | null },
		]
		clearImageKeys(items, 'aaaaaaaaaaaaaaaa', 'Cheese')
		expect(items.map(i => i.imageKey)).toEqual([null, null, 'cccccccccccccccc'])
	})
})
