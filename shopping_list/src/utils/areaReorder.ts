/**
 * The saves a one-step move of a shop area needs. Swapping the two
 * neighbours' numbers only works when every number is different, and older
 * lists have several areas on 0 (a new area used to get 0), so the whole
 * list is renumbered 0..n-1 in the order shown, as the Android app does.
 * Only the areas whose number changes are returned.
 */

interface OrderedArea {
	id: number
	sortOrder: number
}

export function planAreaMove(areas: readonly OrderedArea[], index: number, direction: number): OrderedArea[] {
	const target = index + direction
	if (index < 0 || index >= areas.length || target < 0 || target >= areas.length) {
		return []
	}
	const order = [...areas]
	order[index] = areas[target]
	order[target] = areas[index]
	return order.flatMap((area, position) => (area.sortOrder === position ? [] : [{ id: area.id, sortOrder: position }]))
}
