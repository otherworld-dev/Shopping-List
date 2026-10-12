import { describe, expect, it } from 'vitest'
import { badRequestMessage } from './serverMessage'

function failure(status: number, message?: unknown) {
	return { response: { status, data: { ocs: { data: message === undefined ? {} : { message } } } } }
}

describe('badRequestMessage', () => {
	it('gives the message a refused request carries', () => {
		expect(badRequestMessage(failure(400, 'Password needs to be at least 10 characters long.')))
			.toBe('Password needs to be at least 10 characters long.')
	})

	it('gives nothing for any other failure', () => {
		expect(badRequestMessage(failure(403, 'Only the list owner can do this'))).toBeNull()
		expect(badRequestMessage(failure(500, 'Internal error'))).toBeNull()
		expect(badRequestMessage(new Error('Network Error'))).toBeNull()
		expect(badRequestMessage(undefined)).toBeNull()
	})

	it('gives nothing when the message is missing or not text', () => {
		expect(badRequestMessage(failure(400))).toBeNull()
		expect(badRequestMessage(failure(400, ''))).toBeNull()
		expect(badRequestMessage(failure(400, { hint: 'x' }))).toBeNull()
	})
})
