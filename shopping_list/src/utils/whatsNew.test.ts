import { describe, expect, it } from 'vitest'
import { compareVersions, entriesToShow, latestEntries, MAX_ENTRIES, safeLink } from './whatsNew'
import type { WhatsNewEntry } from './whatsNew'
import notes from '../whatsNew.json'

function entry(version: string): WhatsNewEntry {
	return { version, title: `Notes for ${version}`, items: ['Something changed'] }
}

const versions = (list: WhatsNewEntry[]) => list.map((e) => e.version)

describe('compareVersions', () => {
	it('compares each part as a number', () => {
		expect(compareVersions('1.10.0', '1.9.0')).toBeGreaterThan(0)
		expect(compareVersions('1.9.0', '1.10.0')).toBeLessThan(0)
		expect(compareVersions('2.0.0', '1.99.99')).toBeGreaterThan(0)
	})

	it('counts a missing part as zero', () => {
		expect(compareVersions('1.10', '1.10.0')).toBe(0)
		expect(compareVersions('1.7.1.1', '1.7.1')).toBeGreaterThan(0)
	})
})

describe('entriesToShow', () => {
	const all = [entry('1.9.0'), entry('1.11.0'), entry('1.10.0'), entry('1.12.0')]

	it('shows nothing to someone who has just started', () => {
		expect(entriesToShow(all, { currentVersion: '1.11.0', lastSeen: '', isNewUser: true })).toEqual([])
	})

	it('shows the latest notes to someone who used the app before the notes existed', () => {
		expect(versions(entriesToShow(all, { currentVersion: '1.10.0', lastSeen: '', isNewUser: false })))
			.toEqual(['1.10.0', '1.9.0'])
	})

	it('shows every release since the one last seen, newest first', () => {
		expect(versions(entriesToShow(all, { currentVersion: '1.12.0', lastSeen: '1.9.0', isNewUser: false })))
			.toEqual(['1.12.0', '1.11.0', '1.10.0'])
	})

	it('never shows notes for a version newer than the one installed', () => {
		expect(versions(entriesToShow(all, { currentVersion: '1.10.0', lastSeen: '1.9.0', isNewUser: false })))
			.toEqual(['1.10.0'])
	})

	it('shows nothing once the installed version has been seen', () => {
		expect(entriesToShow(all, { currentVersion: '1.11.0', lastSeen: '1.11.0', isNewUser: false })).toEqual([])
	})

	it('shows nothing for a release without notes', () => {
		expect(entriesToShow(all, { currentVersion: '1.10.1', lastSeen: '1.10.0', isNewUser: false })).toEqual([])
	})

	it('caps a long gap at the newest few', () => {
		const shown = entriesToShow(all, { currentVersion: '1.12.0', lastSeen: '1.0.0', isNewUser: false })
		expect(shown).toHaveLength(MAX_ENTRIES)
		expect(shown[0].version).toBe('1.12.0')
	})

	it('shows nothing without an installed version', () => {
		expect(entriesToShow(all, { currentVersion: '', lastSeen: '', isNewUser: false })).toEqual([])
	})
})

describe('latestEntries', () => {
	it('gives the newest notes up to the installed version', () => {
		const all = [entry('1.9.0'), entry('1.10.0'), entry('1.11.0')]
		expect(versions(latestEntries(all, '1.10.0'))).toEqual(['1.10.0', '1.9.0'])
		expect(latestEntries(all, '1.8.0')).toEqual([])
	})
})

describe('safeLink', () => {
	it('keeps only https links', () => {
		expect(safeLink('https://github.com/otherworld-dev/Shopping-List')).toBe('https://github.com/otherworld-dev/Shopping-List')
		expect(safeLink('http://example.com')).toBeNull()
		expect(safeLink('javascript:alert(1)')).toBeNull()
		expect(safeLink(undefined)).toBeNull()
	})
})

describe('whatsNew.json', () => {
	it('has one well-formed entry per version', () => {
		const list = notes as WhatsNewEntry[]
		expect(list.length).toBeGreaterThan(0)
		expect(new Set(versions(list)).size).toBe(list.length)
		for (const e of list) {
			expect(e.version).toMatch(/^\d+(\.\d+){1,3}$/)
			expect(e.title.trim()).not.toBe('')
			expect(e.items.length).toBeGreaterThan(0)
			for (const item of e.items) {
				expect(item.trim()).not.toBe('')
			}
			if (e.link !== undefined) {
				expect(safeLink(e.link)).toBe(e.link)
			}
		}
	})
})
