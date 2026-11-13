import { describe, expect, it } from 'vitest'
import { listIdFromSearch, withoutListParam } from './listLink'

describe('listIdFromSearch', () => {
	it('reads the list id', () => {
		expect(listIdFromSearch('?list=12')).toBe(12)
		expect(listIdFromSearch('?foo=1&list=7')).toBe(7)
	})

	it('ignores anything that is not a list id', () => {
		expect(listIdFromSearch('')).toBeNull()
		expect(listIdFromSearch('?list=')).toBeNull()
		expect(listIdFromSearch('?list=0')).toBeNull()
		expect(listIdFromSearch('?list=-3')).toBeNull()
		expect(listIdFromSearch('?list=12abc')).toBeNull()
		expect(listIdFromSearch('?list=1.5')).toBeNull()
	})
})

describe('withoutListParam', () => {
	it('drops only the list parameter', () => {
		expect(withoutListParam('https://cloud.example/apps/shopping_list/?list=12')).toBe('https://cloud.example/apps/shopping_list/')
		expect(withoutListParam('https://cloud.example/index.php/apps/shopping_list/?a=1&list=12#x')).toBe('https://cloud.example/index.php/apps/shopping_list/?a=1#x')
	})
})
