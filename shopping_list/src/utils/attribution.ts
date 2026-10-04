export interface Attributed {
	addedBy: string | null
	addedByName: string | null
	checkedBy: string | null
	checkedByName: string | null
}

function label(userId: string | null, name: string | null, me: string | null, showOwn: boolean, guestLabel: (name: string) => string): string | null {
	if (!name) return null
	if (userId === null) return guestLabel(name)
	if (userId === me && !showOwn) return null
	return name
}

/**
 * Who to name beside an item: account users plainly, guests marked as such
 * (so a guest can't pass as a member), and yourself only if you asked to.
 * `me` is null on the public page.
 */
export function attribution(item: Attributed, me: string | null, showOwn: boolean, guestLabel: (name: string) => string): { added: string | null, checked: string | null } {
	return {
		added: label(item.addedBy, item.addedByName, me, showOwn, guestLabel),
		checked: label(item.checkedBy, item.checkedByName, me, showOwn, guestLabel),
	}
}
