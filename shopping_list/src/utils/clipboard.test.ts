import { describe, expect, it, vi } from 'vitest'
import { copyToClipboard } from './clipboard'

function fakeDocument(execResult: boolean | Error) {
	const area = { value: '', style: {}, setAttribute: vi.fn(), select: vi.fn(), remove: vi.fn() }
	const copied: string[] = []
	const doc = {
		createElement: vi.fn(() => area),
		body: { appendChild: vi.fn() },
		execCommand: vi.fn(() => {
			if (execResult instanceof Error) throw execResult
			copied.push(area.value)
			return execResult
		}),
	}
	return { doc: doc as unknown as Document, area, copied }
}

describe('copyToClipboard', () => {
	it('uses the Clipboard API when the browser offers it', async () => {
		const clipboard = { writeText: vi.fn(async () => {}) }
		const { doc } = fakeDocument(true)

		expect(await copyToClipboard('cloud.example.com/K7QM-3XPD', clipboard, doc)).toBe(true)
		expect(clipboard.writeText).toHaveBeenCalledWith('cloud.example.com/K7QM-3XPD')
		expect(doc.execCommand).not.toHaveBeenCalled()
	})

	it('falls back on a plain http page, where there is no Clipboard API', async () => {
		const { doc, area, copied } = fakeDocument(true)

		expect(await copyToClipboard('http://192.168.0.11:8080/K7QM-3XPD', undefined, doc)).toBe(true)
		expect(copied).toEqual(['http://192.168.0.11:8080/K7QM-3XPD'])
		expect(area.select).toHaveBeenCalled()
		expect(area.remove).toHaveBeenCalled()
	})

	it('falls back when the Clipboard API refuses', async () => {
		const clipboard = { writeText: vi.fn(async () => { throw new Error('NotAllowedError') }) }
		const { doc, copied } = fakeDocument(true)

		expect(await copyToClipboard('K7QM-3XPD', clipboard, doc)).toBe(true)
		expect(copied).toEqual(['K7QM-3XPD'])
	})

	it('says so when nothing could copy', async () => {
		const failed = fakeDocument(false)
		expect(await copyToClipboard('K7QM-3XPD', undefined, failed.doc)).toBe(false)

		const threw = fakeDocument(new Error('SecurityError'))
		expect(await copyToClipboard('K7QM-3XPD', undefined, threw.doc)).toBe(false)
		expect(threw.area.remove).toHaveBeenCalled()
	})
})
