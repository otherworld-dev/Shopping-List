import { describe, expect, it } from 'vitest'
import { attribution } from './attribution'

const base = { addedBy: null, addedByName: null, addedByGuest: false, addedVia: null, checkedBy: null, checkedByName: null, checkedByGuest: false, checkedVia: null }

// A byline for a person: a member, or a guest when flagged
const person = (name: string, guest = false) => ({ name, guest, app: false, account: null })

describe('attribution', () => {
	it('names an account user plainly and marks a guest separately', () => {
		expect(attribution({ ...base, addedBy: 'ben', addedByName: 'Ben' }, 'adam', false).added).toEqual(person('Ben'))
		expect(attribution({ ...base, addedByName: 'Anna', addedByGuest: true }, 'adam', false).added).toEqual(person('Anna', true))
	})

	it('keeps the guest mark apart from the name, so cutting a long name never hides it', () => {
		const long = 'Adam Morgan, owner of this list'
		const by = attribution({ ...base, addedByName: long, addedByGuest: true }, 'adam', false).added
		expect(by).toEqual(person(long, true))
	})

	it('shows nothing for an item from before names were kept', () => {
		expect(attribution(base, 'adam', false)).toEqual({ added: null, checked: null })
	})

	it('hides only your own name unless you want it', () => {
		const item = { ...base, addedBy: 'adam', addedByName: 'Adam', checkedByName: 'Anna', checkedByGuest: true }
		expect(attribution(item, 'adam', false)).toEqual({ added: null, checked: person('Anna', true) })
		expect(attribution(item, 'adam', true)).toEqual({ added: person('Adam'), checked: person('Anna', true) })
	})

	it('shows members as members on the public page, where the server leaves out user ids', () => {
		const item = { ...base, addedByName: 'Adam', checkedByName: 'Ben' }
		expect(attribution(item, null, false)).toEqual({ added: person('Adam'), checked: person('Ben') })
	})

	it('treats a guest who happens to share your name as a guest', () => {
		expect(attribution({ ...base, addedByName: 'Adam', addedByGuest: true }, 'adam', false).added).toEqual(person('Adam', true))
	})

	it('shows the app label in place of the name', () => {
		const item = { ...base, addedBy: 'ben', addedByName: 'Ben', addedVia: 'Home Assistant' }
		expect(attribution(item, 'adam', false).added).toEqual({ name: 'Home Assistant', guest: false, app: true, account: 'Ben' })
	})

	it('shows the app label on my own item even when my name is hidden', () => {
		const item = { ...base, addedBy: 'adam', addedByName: 'Adam', addedVia: 'Home Assistant' }
		expect(attribution(item, 'adam', false).added).toEqual({ name: 'Home Assistant', guest: false, app: true, account: 'Adam' })
	})

	it('carries the account for the tooltip, or none when the page has no name for it', () => {
		const item = { ...base, addedVia: 'Kitchen' }
		expect(attribution(item, null, true).added).toEqual({ name: 'Kitchen', guest: false, app: true, account: null })
	})

	it('a ticked item uses checkedVia', () => {
		const item = { ...base, addedBy: 'ben', addedByName: 'Ben', checkedBy: 'adam', checkedByName: 'Adam', checkedVia: 'Home Assistant' }
		const names = attribution(item, 'adam', false)
		expect(names.added).toEqual(person('Ben'))
		expect(names.checked).toEqual({ name: 'Home Assistant', guest: false, app: true, account: 'Adam' })
	})
})
