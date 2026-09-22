/**
 * Best-effort shrink of a photo before upload, so a 12 megapixel phone
 * picture does not go over mobile data at full size. The server applies the
 * same bounds again and never trusts this to have run, so any failure here
 * just hands the original file back. Browser only: not unit tested.
 */

export const MAX_EDGE = 1280
export const JPEG_QUALITY = 0.85

type Decoded = { source: ImageBitmap | HTMLImageElement, cleanup: () => void }

async function decode(file: File): Promise<Decoded> {
	if (typeof createImageBitmap === 'function') {
		try {
			// from-image applies the EXIF orientation, so a portrait phone photo
			// comes out upright instead of on its side.
			const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
			return { source: bitmap, cleanup: () => bitmap.close() }
		} catch {
			// Some browsers cannot decode this format that way; try an <img>.
		}
	}
	const url = URL.createObjectURL(file)
	const img = new Image()
	img.src = url
	try {
		await img.decode()
	} catch (e) {
		URL.revokeObjectURL(url)
		throw e
	}
	return { source: img, cleanup: () => URL.revokeObjectURL(url) }
}

export async function shrinkImage(file: File, maxEdge = MAX_EDGE, quality = JPEG_QUALITY): Promise<Blob> {
	let decoded: Decoded | null = null
	try {
		decoded = await decode(file)
		const { width, height } = decoded.source
		const scale = Math.min(1, maxEdge / Math.max(width, height))
		const canvas = document.createElement('canvas')
		canvas.width = Math.max(1, Math.round(width * scale))
		canvas.height = Math.max(1, Math.round(height * scale))
		const ctx = canvas.getContext('2d')
		if (!ctx) return file
		ctx.drawImage(decoded.source, 0, 0, canvas.width, canvas.height)
		const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality))
		if (!blob) return file
		// A small PNG can come out bigger as a JPEG; keep the original then.
		return scale < 1 || blob.size < file.size ? blob : file
	} catch {
		return file
	} finally {
		decoded?.cleanup()
	}
}
