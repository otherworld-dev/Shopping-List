import { describe, expect, it } from 'vitest'
import { encode } from 'uqr'
import { qrCodeImageUrl } from './qrCode'

const link = 'https://cloud.example.com/apps/shopping_list/s/3f9a0c'

function svgOf(url: string): string {
	const prefix = 'data:image/svg+xml,'
	expect(url.startsWith(prefix)).toBe(true)
	return decodeURIComponent(url.slice(prefix.length))
}

describe('qrCodeImageUrl', () => {
	it('gives an SVG image an <img> can show', () => {
		const svg = svgOf(qrCodeImageUrl(link))
		expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true)
		expect(svg).toContain('fill="black"')
		expect(svg).toContain('fill="white"')
	})

	it('keeps a four-module quiet zone round the code', () => {
		const size = encode(link, { ecc: 'M', border: 4 }).size
		expect(svgOf(qrCodeImageUrl(link))).toContain(`viewBox="0 0 ${size} ${size}"`)
		expect(size).toBe(encode(link, { ecc: 'M', border: 0 }).size + 8)
	})

	it('draws a different code for a different link', () => {
		expect(qrCodeImageUrl(link)).not.toBe(qrCodeImageUrl(link + 'd'))
	})
})
