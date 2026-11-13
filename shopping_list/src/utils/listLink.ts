/**
 * Opening a list from a link, as a notification about items added to a
 * shared list does with "?list=12".
 */

/** The list the address asks for, or null. Only a positive whole number counts. */
export function listIdFromSearch(search: string): number | null {
	const raw = new URLSearchParams(search).get('list')
	if (raw === null || !/^\d+$/.test(raw)) return null
	const id = Number(raw)
	return id > 0 ? id : null
}

/** The address without the list parameter, so a reload doesn't jump back to that list. */
export function withoutListParam(href: string): string {
	const url = new URL(href)
	url.searchParams.delete('list')
	return url.toString()
}
