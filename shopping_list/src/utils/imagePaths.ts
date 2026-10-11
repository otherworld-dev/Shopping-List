/**
 * Where an item's photo is served from. Pure string building, so it can be
 * tested; imageUrls.ts turns these into full URLs with @nextcloud/router.
 */

import type { Item } from '../types'

export type ImageSize = 'thumbnail' | 'full'

/** The bits of an item the path needs, so tests can pass a plain object. */
export type ImageRef = Pick<Item, 'id' | 'listId' | 'imageKey'>

function segment(size: ImageSize): string {
	return size === 'full' ? 'image' : 'thumbnail'
}

/**
 * Path below the Nextcloud root for a signed-in user, or null when the item
 * has no photo. The key is part of the path: it changes whenever the photo
 * is replaced, so the browser may cache the URL for good.
 */
export function itemImagePath(item: ImageRef, size: ImageSize): string | null {
	if (!item.imageKey) return null
	return `/apps/shopping_list/lists/${item.listId}/items/${item.id}/${segment(size)}/${encodeURIComponent(item.imageKey)}`
}

/** The same photo reached through a public share link's token. */
export function publicItemImagePath(token: string, item: ImageRef, size: ImageSize): string | null {
	if (!item.imageKey) return null
	return `/apps/shopping_list/s/${encodeURIComponent(token)}/items/${item.id}/${segment(size)}/${encodeURIComponent(item.imageKey)}`
}
