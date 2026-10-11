/**
 * Picking an image out of a paste or a drop. Pure functions over a
 * DataTransfer-shaped object, so they can be tested without a browser.
 */

export interface FileLike {
	name: string
	type: string
}

export interface DataTransferLike {
	types?: ArrayLike<string> | null
	files?: ArrayLike<File> | null
	items?: ArrayLike<{ kind: string, getAsFile(): File | null }> | null
}

// Windows reports an empty MIME type for HEIC, so the extension is the fallback.
const IMAGE_EXTENSION = /\.(jpe?g|png|gif|webp|avif|heic|heif|bmp)$/i

/** True when an OS file is being dragged. Sortable's own row drags carry only text. */
export function isFileDrag(dt: DataTransferLike | null | undefined): boolean {
	if (!dt?.types) return false
	return Array.from(dt.types).includes('Files')
}

export function isImageFile(file: FileLike): boolean {
	if (file.type.startsWith('image/')) return true
	return file.type === '' && IMAGE_EXTENSION.test(file.name)
}

/** The first image among the files of a drop or paste, or null. */
export function pickImageFile(dt: DataTransferLike | null | undefined): File | null {
	if (!dt) return null
	const files = dt.files ? Array.from(dt.files) : []
	if (files.length === 0 && dt.items) {
		for (const entry of Array.from(dt.items)) {
			if (entry.kind !== 'file') continue
			const file = entry.getAsFile()
			if (file) files.push(file)
		}
	}
	return files.find(isImageFile) ?? null
}
