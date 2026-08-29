import type { Item } from '../types'

/**
 * Render a list as plain text, one item per line, in the same shape the add
 * box accepts when you paste into it. So a list copied out of the app pastes
 * back in as the same items, and drops into a chat message unchanged.
 *
 * Checked items are left out: they have been bought, and the point of copying
 * a list is to carry the outstanding part of it somewhere else.
 */
export function formatListAsText(items: Item[]): string {
	return items
		.filter(item => !item.checked)
		.map(item => {
			const parts: string[] = []
			// A bare "1" is the implicit default, so writing it back adds noise.
			// With a unit it is meaningful ("1 l"), so it stays.
			if (item.quantity && (item.quantity !== '1' || item.unit)) {
				parts.push(item.quantity)
			}
			if (item.unit) parts.push(item.unit)
			parts.push(item.name)
			return parts.join(' ')
		})
		.join('\n')
}
