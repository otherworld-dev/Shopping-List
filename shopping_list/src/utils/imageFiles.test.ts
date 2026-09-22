import { describe, expect, it } from 'vitest'
import { isFileDrag, isImageFile, pickImageFile } from './imageFiles'

const jpeg = new File(['x'], 'photo.jpg', { type: 'image/jpeg' })
const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' })
const heic = new File(['x'], 'IMG_0001.HEIC', { type: '' })

describe('isFileDrag', () => {
	it('is true when the drag carries files', () => {
		expect(isFileDrag({ types: ['Files'] })).toBe(true)
	})

	it('is false for a text drag, such as a row being reordered', () => {
		expect(isFileDrag({ types: ['text/plain'] })).toBe(false)
	})

	it('copes with a DOMStringList-like object and with no transfer at all', () => {
		expect(isFileDrag({ types: { length: 1, 0: 'Files' } })).toBe(true)
		expect(isFileDrag(null)).toBe(false)
		expect(isFileDrag({ types: null })).toBe(false)
	})
})

describe('isImageFile', () => {
	it('goes by the MIME type first', () => {
		expect(isImageFile(jpeg)).toBe(true)
		expect(isImageFile(pdf)).toBe(false)
	})

	it('falls back to the extension when the browser reports no type', () => {
		expect(isImageFile(heic)).toBe(true)
		expect(isImageFile({ name: 'notes.txt', type: '' })).toBe(false)
	})
})

describe('pickImageFile', () => {
	it('returns the first image among the files', () => {
		expect(pickImageFile({ files: [pdf, jpeg] })).toBe(jpeg)
	})

	it('falls back to the items list when files is empty', () => {
		const items = [{ kind: 'string', getAsFile: () => null }, { kind: 'file', getAsFile: () => jpeg }]
		expect(pickImageFile({ files: [], items })).toBe(jpeg)
	})

	it('is null when nothing is an image', () => {
		expect(pickImageFile({ files: [pdf] })).toBeNull()
		expect(pickImageFile(null)).toBeNull()
	})
})
