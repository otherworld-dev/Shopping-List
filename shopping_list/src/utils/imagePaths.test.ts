import { describe, expect, it } from 'vitest'
import { itemImagePath, publicItemImagePath } from './imagePaths'

const item = { id: 42, listId: 5, imageKey: 'abcdefabcdefabcd' }

describe('itemImagePath', () => {
	it('is null for an item without a photo', () => {
		expect(itemImagePath({ ...item, imageKey: null }, 'thumbnail')).toBeNull()
		expect(itemImagePath({ ...item, imageKey: '' }, 'full')).toBeNull()
	})

	it('points at the thumbnail or the full photo under the list and item', () => {
		expect(itemImagePath(item, 'thumbnail')).toBe('/apps/shopping_list/lists/5/items/42/thumbnail/abcdefabcdefabcd')
		expect(itemImagePath(item, 'full')).toBe('/apps/shopping_list/lists/5/items/42/image/abcdefabcdefabcd')
	})

	it('encodes the key', () => {
		expect(itemImagePath({ ...item, imageKey: 'a b' }, 'full')).toBe('/apps/shopping_list/lists/5/items/42/image/a%20b')
	})
})

describe('publicItemImagePath', () => {
	it('is null for an item without a photo', () => {
		expect(publicItemImagePath('tok', { ...item, imageKey: null }, 'thumbnail')).toBeNull()
	})

	it('goes through the share token', () => {
		expect(publicItemImagePath('tok', item, 'thumbnail')).toBe('/apps/shopping_list/s/tok/items/42/thumbnail/abcdefabcdefabcd')
		expect(publicItemImagePath('tok', item, 'full')).toBe('/apps/shopping_list/s/tok/items/42/image/abcdefabcdefabcd')
	})

	it('encodes the token', () => {
		expect(publicItemImagePath('a/b', item, 'full')).toBe('/apps/shopping_list/s/a%2Fb/items/42/image/abcdefabcdefabcd')
	})
})
