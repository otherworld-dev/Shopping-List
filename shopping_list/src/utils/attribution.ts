export interface Attributed {
	addedBy: string | null
	addedByName: string | null
	addedByGuest: boolean
	addedVia: string | null
	checkedBy: string | null
	checkedByName: string | null
	checkedByGuest: boolean
	checkedVia: string | null
}

/**
 * A name to show beside an item. A guest's name and an app's label each get
 * their own mark; for an app, `account` is the person behind it, for the tooltip.
 */
export interface Byline {
	name: string
	guest: boolean
	app: boolean
	account: string | null
}

function byline(userId: string | null, name: string | null, guest: boolean, via: string | null, me: string | null, showOwn: boolean): Byline | null {
	// An app's label shows even on your own items: seeing that it came through
	// Home Assistant is the point, and the label is never a person's name.
	if (via) return { name: via, guest: false, app: true, account: name }
	if (!name) return null
	if (guest) return { name, guest: true, app: false, account: null }
	// Public responses carry no user ids, so this only ever matches when signed in
	if (me !== null && userId === me && !showOwn) return null
	return { name, guest: false, app: false, account: null }
}

/**
 * Who to name beside an item: account users plainly, guests and apps flagged
 * (each shown as a separate mark that a long name can't push out of view, so
 * neither can pass as a member), and yourself only if you asked to. `me` is
 * null on the public page.
 */
export function attribution(item: Attributed, me: string | null, showOwn: boolean): { added: Byline | null, checked: Byline | null } {
	return {
		added: byline(item.addedBy, item.addedByName, item.addedByGuest, item.addedVia, me, showOwn),
		checked: byline(item.checkedBy, item.checkedByName, item.checkedByGuest, item.checkedVia, me, showOwn),
	}
}
