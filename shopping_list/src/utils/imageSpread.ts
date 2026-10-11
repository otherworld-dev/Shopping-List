/**
 * A photo belongs to an item name, so the server puts one upload on every
 * item with that name and one removal takes it off them all. These mirror
 * that on the items already loaded, so the open list updates at once instead
 * of on the next poll or push.
 */

interface ImageRow {
	name: string
	imageKey: string | null
}

/** How the server compares item names: trimmed and case-insensitive. */
export function imageNameKey(name: string): string {
	return name.trim().toLowerCase()
}

/** Give `imageKey` to every item called `name`. */
export function spreadImageKey(items: ImageRow[], name: string, imageKey: string): void {
	const key = imageNameKey(name)
	if (key === '') {
		return
	}
	for (const item of items) {
		if (imageNameKey(item.name) === key) {
			item.imageKey = imageKey
		}
	}
}

/** Take the photo off every item showing `imageKey` and every item called `name`. */
export function clearImageKeys(items: ImageRow[], imageKey: string, name: string): void {
	const key = imageNameKey(name)
	for (const item of items) {
		if (item.imageKey === imageKey || (key !== '' && imageNameKey(item.name) === key)) {
			item.imageKey = null
		}
	}
}
