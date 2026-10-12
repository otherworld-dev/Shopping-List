/**
 * Which shop area a new item belongs in, worked out from its name and the
 * list's own areas and keywords.
 */

import { fold } from './fold'
import type { ShopArea } from '../types'

/**
 * The area whose keyword the name contains, or null when none does.
 *
 * The longest (most specific) matching keyword wins across all areas, so a
 * short token in an early area ("ham") can't shadow a specific one in a later
 * area ("shampoo"). The areas come sort-ordered, so a tie keeps the earlier.
 */
export function detectArea(name: string, areas: ShopArea[]): number | null {
	const needle = fold(name)
	let bestArea: number | null = null
	let bestLen = 0

	for (const area of areas) {
		if (!area.keywords) continue
		for (const keyword of area.keywords) {
			if (!keyword) continue
			const k = fold(keyword)
			if (k.length > bestLen && needle.includes(k)) {
				bestLen = k.length
				bestArea = area.id
			}
		}
	}
	return bestArea
}

/**
 * The area a new item is added with: the one the user picked, otherwise a
 * keyword match, otherwise the list's default area. The server applies the
 * same default to an item sent with no area, so this only makes the item
 * show in the right place straight away, and while offline.
 *
 * A default that is no longer one of the list's areas is ignored: the area
 * was deleted and this copy of the list has yet to hear.
 */
export function areaForNewItem(
	name: string,
	areas: ShopArea[],
	pickedAreaId: number | null,
	defaultAreaId: number | null,
): number | null {
	if (pickedAreaId !== null) return pickedAreaId
	const detected = detectArea(name, areas)
	if (detected !== null) return detected
	return defaultAreaId !== null && areas.some(a => a.id === defaultAreaId) ? defaultAreaId : null
}
