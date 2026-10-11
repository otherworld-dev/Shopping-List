/**
 * Which release notes a user is shown after an update.
 *
 * The notes are written by hand per release in src/whatsNew.json, in English.
 * A release with no entry shows nothing. The version a user last saw is the
 * whatsNewSeen setting, so each release's notes appear once, the first time
 * the app loads on that version.
 */

export interface WhatsNewEntry {
	version: string
	title: string
	items: string[]
	link?: string
}

/** Most releases shown at once, however long the user went without updating. */
export const MAX_ENTRIES = 3

/**
 * Compare two dotted versions part by part. A missing part counts as zero,
 * so '1.10' equals '1.10.0'.
 *
 * @return negative if a < b, positive if a > b, 0 if equal
 */
export function compareVersions(a: string, b: string): number {
	const pa = a.split('.').map((n) => parseInt(n, 10) || 0)
	const pb = b.split('.').map((n) => parseInt(n, 10) || 0)
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
		const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
		if (diff !== 0) return diff
	}
	return 0
}

/** Entries released up to and including `version`, newest first. */
function upTo(entries: WhatsNewEntry[], version: string): WhatsNewEntry[] {
	return entries
		.filter((e) => compareVersions(e.version, version) <= 0)
		.sort((a, b) => compareVersions(b.version, a.version))
}

/**
 * The notes to pop up on this load.
 *
 * - Someone who has just started (nothing seen and no lists) gets nothing:
 *   release notes mean nothing on day one.
 * - Someone who used the app before the notes existed gets the latest ones.
 * - Otherwise every release newer than the one last seen, up to the installed
 *   version, newest first and capped at MAX_ENTRIES.
 */
export function entriesToShow(
	entries: WhatsNewEntry[],
	{ currentVersion, lastSeen, isNewUser }: { currentVersion: string, lastSeen: string, isNewUser: boolean },
): WhatsNewEntry[] {
	if (!currentVersion) return []
	if (!lastSeen && isNewUser) return []

	return upTo(entries, currentVersion)
		.filter((e) => !lastSeen || compareVersions(e.version, lastSeen) > 0)
		.slice(0, MAX_ENTRIES)
}

/** The newest notes up to the installed version, for the What's new button. */
export function latestEntries(entries: WhatsNewEntry[], currentVersion: string): WhatsNewEntry[] {
	return upTo(entries, currentVersion).slice(0, MAX_ENTRIES)
}

/** An entry's Read more link, or null unless it is https. */
export function safeLink(link: string | undefined): string | null {
	return typeof link === 'string' && link.startsWith('https://') ? link : null
}
