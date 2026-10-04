export interface Attributed {
	addedBy: string | null
	addedByName: string | null
	checkedBy: string | null
	checkedByName: string | null
}

/** A name to show beside an item, and whether it's a guest's. */
export interface Byline {
	name: string
	guest: boolean
}

function byline(userId: string | null, name: string | null, me: string | null, showOwn: boolean): Byline | null {
	if (!name) return null
	if (userId === null) return { name, guest: true }
	if (userId === me && !showOwn) return null
	return { name, guest: false }
}

/**
 * Who to name beside an item: account users plainly, guests flagged (shown
 * as a separate mark that a long name can't push out of view, so a guest
 * can't pass as a member), and yourself only if you asked to. `me` is null
 * on the public page.
 */
export function attribution(item: Attributed, me: string | null, showOwn: boolean): { added: Byline | null, checked: Byline | null } {
	return {
		added: byline(item.addedBy, item.addedByName, me, showOwn),
		checked: byline(item.checkedBy, item.checkedByName, me, showOwn),
	}
}
