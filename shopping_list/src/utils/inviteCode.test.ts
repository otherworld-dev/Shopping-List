import { describe, expect, it } from 'vitest'
import { formatCode, inviteString, serverAddress } from './inviteCode'

describe('formatCode', () => {
	it('splits the code in half for reading out', () => {
		expect(formatCode('K7QM3XPD')).toBe('K7QM-3XPD')
	})
})

describe('serverAddress', () => {
	it('drops https, which the app assumes', () => {
		expect(serverAddress('https://cloud.example.com')).toBe('cloud.example.com')
	})

	it('keeps http so the app does not try https', () => {
		expect(serverAddress('http://192.168.0.11:8080')).toBe('http://192.168.0.11:8080')
	})

	it('keeps a port and a sub-path, without a trailing slash', () => {
		expect(serverAddress('https://example.com:8443/nextcloud/')).toBe('example.com:8443/nextcloud')
	})
})

describe('inviteString', () => {
	it('joins the server and the code with a slash', () => {
		expect(inviteString('https://cloud.example.com', 'K7QM3XPD')).toBe('cloud.example.com/K7QM-3XPD')
		expect(inviteString('http://192.168.0.11:8080', 'K7QM3XPD')).toBe('http://192.168.0.11:8080/K7QM-3XPD')
	})

	it('splits back at the last slash', () => {
		const invite = inviteString('https://example.com:8443/nextcloud', 'K7QM3XPD')
		const cut = invite.lastIndexOf('/')
		expect(invite.slice(0, cut)).toBe('example.com:8443/nextcloud')
		expect(invite.slice(cut + 1)).toBe('K7QM-3XPD')
	})
})
