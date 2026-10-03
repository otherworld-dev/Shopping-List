/** An invite code as people read it out: K7QM3XPD becomes K7QM-3XPD. */
export function formatCode(code: string): string {
	return code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code
}

/**
 * The server half of an invite: the Nextcloud base URL without https://,
 * which the Android app assumes, but keeping http:// so the app doesn't try
 * https against a server on the local network.
 */
export function serverAddress(baseUrl: string): string {
	return baseUrl.replace(/\/+$/, '').replace(/^https:\/\//i, '')
}

/** One string a guest can paste into the app, which splits it at the last "/". */
export function inviteString(baseUrl: string, code: string): string {
	return `${serverAddress(baseUrl)}/${formatCode(code)}`
}
