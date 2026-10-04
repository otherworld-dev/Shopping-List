import { describe, expect, it } from 'vitest'
import { attribution } from './attribution'

const guest = (name: string) => `${name} (guest)`
const base = { addedBy: null, addedByName: null, checkedBy: null, checkedByName: null }

describe('attribution', () => {
	it('names an account user plainly and marks a guest', () => {
		expect(attribution({ ...base, addedBy: 'ben', addedByName: 'Ben' }, 'adam', false, guest).added).toBe('Ben')
		expect(attribution({ ...base, addedByName: 'Anna' }, 'adam', false, guest).added).toBe('Anna (guest)')
	})

	it('shows nothing for an item from before names were kept', () => {
		expect(attribution(base, 'adam', false, guest)).toEqual({ added: null, checked: null })
	})

	it('hides only your own name unless you want it', () => {
		const item = { addedBy: 'adam', addedByName: 'Adam', checkedBy: null, checkedByName: 'Anna' }
		expect(attribution(item, 'adam', false, guest)).toEqual({ added: null, checked: 'Anna (guest)' })
		expect(attribution(item, 'adam', true, guest)).toEqual({ added: 'Adam', checked: 'Anna (guest)' })
	})

	it('shows every known name on the public page, where nobody is signed in', () => {
		const item = { addedBy: 'adam', addedByName: 'Adam', checkedBy: 'ben', checkedByName: 'Ben' }
		expect(attribution(item, null, false, guest)).toEqual({ added: 'Adam', checked: 'Ben' })
	})

	it('treats a guest who happens to share your name as a guest', () => {
		expect(attribution({ ...base, addedByName: 'Adam' }, 'adam', false, guest).added).toBe('Adam (guest)')
	})
})
