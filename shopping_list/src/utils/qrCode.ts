import { renderSVG } from 'uqr'

/**
 * A QR code of `text` as an image URL for an <img>. Medium error correction
 * so a smudged or glaring screen still scans, and the four-module quiet zone
 * the spec asks for, which phone cameras need to find the code.
 */
export function qrCodeImageUrl(text: string): string {
	const svg = renderSVG(text, { ecc: 'M', border: 4, pixelSize: 1 })
	return 'data:image/svg+xml,' + encodeURIComponent(svg)
}
