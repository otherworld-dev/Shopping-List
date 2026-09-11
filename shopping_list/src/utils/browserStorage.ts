/** The part of the Web Storage API the view preferences use, so tests can fake it. */
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

/**
 * The browser's localStorage, or null when there is none. Reading
 * window.localStorage can itself throw, for example when the browser blocks
 * site data, so it is fetched inside a try.
 */
export function browserStorage(): StorageLike | null {
	try {
		return window.localStorage
	} catch {
		return null
	}
}
