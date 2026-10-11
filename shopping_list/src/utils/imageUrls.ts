import { generateUrl } from '@nextcloud/router'
import { itemImagePath, publicItemImagePath } from './imagePaths'
import type { ImageRef, ImageSize } from './imagePaths'

// Kept apart from imagePaths.ts because @nextcloud/router needs a browser,
// and the path builders are unit tested in node.

/** Absolute URL of an item's photo for a signed-in user, or null without one. */
export function itemImageUrl(item: ImageRef, size: ImageSize): string | null {
	const path = itemImagePath(item, size)
	return path === null ? null : generateUrl(path)
}

/** Absolute URL of an item's photo through a public share link, or null without one. */
export function publicItemImageUrl(token: string, item: ImageRef, size: ImageSize): string | null {
	const path = publicItemImagePath(token, item, size)
	return path === null ? null : generateUrl(path)
}
