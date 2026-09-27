import { describe, expect, it } from 'vitest'
import { withoutUncachedKeys } from './piniaPlugin'

describe('withoutUncachedKeys', () => {
	it('drops listSort from the lists store state, so a cached snapshot can never restore it', () => {
		const cached = { lists: [], currentListId: 5, listSort: 'alpha' }
		const hydrated = withoutUncachedKeys('lists', cached)
		expect(hydrated).not.toHaveProperty('listSort')
		expect(hydrated.currentListId).toBe(5)
	})

	it('strips listSort before a save too, so it never reaches the cache to begin with', () => {
		const toSave = { lists: [{ id: 1 }], listSort: 'custom' }
		expect(withoutUncachedKeys('lists', toSave)).toEqual({ lists: [{ id: 1 }] })
	})

	it('leaves other stores state untouched', () => {
		const state = { items: [{ id: 1 }] }
		expect(withoutUncachedKeys('items', state)).toEqual(state)
	})

	it('does not mutate the object passed in', () => {
		const state = { listSort: 'custom' }
		withoutUncachedKeys('lists', state)
		expect(state).toHaveProperty('listSort')
	})
})
