export interface Attributed {
	addedBy: string | null
	addedByName: string | null
	addedByGuest: boolean
	checkedBy: string | null
	checkedByName: string | null
	checkedByGuest: boolean
}

/** A name to show beside an item, and whether it's a guest's. */
export interface Byline {
	name: string
	guest: boolean
}

function byline(userId: string | null, name: string | null, guest: boolean, me: string | null, showOwn: boolean): Byline | null {
	if (!name) return null
	if (guest) return { name, guest: true }
	// Public responses carry no user ids, so this only ever matches when signed in
	if (me !== null && userId === me && !showOwn) return null
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
		added: byline(item.addedBy, item.addedByName, item.addedByGuest, me, showOwn),
		checked: byline(item.checkedBy, item.checkedByName, item.checkedByGuest, me, showOwn),
	}
}
