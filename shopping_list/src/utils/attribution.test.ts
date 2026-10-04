import { describe, expect, it } from 'vitest'
import { attribution } from './attribution'

const base = { addedBy: null, addedByName: null, checkedBy: null, checkedByName: null }

describe('attribution', () => {
	it('names an account user plainly and marks a guest separately', () => {
		expect(attribution({ ...base, addedBy: 'ben', addedByName: 'Ben' }, 'adam', false).added).toEqual({ name: 'Ben', guest: false })
		expect(attribution({ ...base, addedByName: 'Anna' }, 'adam', false).added).toEqual({ name: 'Anna', guest: true })
	})

	it('keeps the guest mark apart from the name, so cutting a long name never hides it', () => {
		const long = 'Adam Morgan, owner of this list'
		const by = attribution({ ...base, addedByName: long }, 'adam', false).added
		expect(by).toEqual({ name: long, guest: true })
	})

	it('shows nothing for an item from before names were kept', () => {
		expect(attribution(base, 'adam', false)).toEqual({ added: null, checked: null })
	})

	it('hides only your own name unless you want it', () => {
		const item = { addedBy: 'adam', addedByName: 'Adam', checkedBy: null, checkedByName: 'Anna' }
		expect(attribution(item, 'adam', false)).toEqual({ added: null, checked: { name: 'Anna', guest: true } })
		expect(attribution(item, 'adam', true)).toEqual({ added: { name: 'Adam', guest: false }, checked: { name: 'Anna', guest: true } })
	})

	it('shows every known name on the public page, where nobody is signed in', () => {
		const item = { addedBy: 'adam', addedByName: 'Adam', checkedBy: 'ben', checkedByName: 'Ben' }
		expect(attribution(item, null, false)).toEqual({ added: { name: 'Adam', guest: false }, checked: { name: 'Ben', guest: false } })
	})

	it('treats a guest who happens to share your name as a guest', () => {
		expect(attribution({ ...base, addedByName: 'Adam' }, 'adam', false).added).toEqual({ name: 'Adam', guest: true })
	})
})
