import type { Item } from '../types'

export type Tick = Pick<Item, 'checkedBy' | 'checkedByName' | 'checkedByGuest' | 'checkedVia'>

/**
 * Who ticked an item, as the server says now. All four fields go together,
 * so an app's label from an earlier tick never stays on someone's own re-tick.
 * A server from before labels sends no checkedVia, which means none.
 */
export function tickFrom(saved: Tick): Tick {
	return {
		checkedBy: saved.checkedBy,
		checkedByName: saved.checkedByName,
		checkedByGuest: saved.checkedByGuest,
		checkedVia: saved.checkedVia ?? null,
	}
}

/** An unticked item: nobody ticked it, through nothing. */
export const NO_TICK: Readonly<Tick> = Object.freeze({
	checkedBy: null,
	checkedByName: null,
	checkedByGuest: false,
	checkedVia: null,
})
