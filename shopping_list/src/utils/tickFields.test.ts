import { describe, expect, it } from 'vitest'
import { NO_TICK, tickFrom } from './tickFields'

const tickedByHomeAssistant = { checkedBy: 'adam', checkedByName: 'Adam', checkedByGuest: false, checkedVia: 'Home Assistant' }

describe('tickFrom', () => {
	it('replaces an app label from an earlier tick with the new tick', () => {
		const item = { ...tickedByHomeAssistant }
		Object.assign(item, tickFrom({ checkedBy: 'adam', checkedByName: 'Adam', checkedByGuest: false, checkedVia: null }))
		expect(item.checkedVia).toBeNull()
	})

	it('keeps a guest tick a guest tick', () => {
		expect(tickFrom({ checkedBy: null, checkedByName: 'Anna', checkedByGuest: true, checkedVia: null }))
			.toEqual({ checkedBy: null, checkedByName: 'Anna', checkedByGuest: true, checkedVia: null })
	})

	it('reads a server from before labels as no label', () => {
		const saved = { checkedBy: 'adam', checkedByName: 'Adam', checkedByGuest: false } as Parameters<typeof tickFrom>[0]
		expect(tickFrom(saved).checkedVia).toBeNull()
	})
})

describe('NO_TICK', () => {
	it('clears who ticked it and through what', () => {
		const item = { ...tickedByHomeAssistant }
		Object.assign(item, NO_TICK)
		expect(item).toEqual({ checkedBy: null, checkedByName: null, checkedByGuest: false, checkedVia: null })
	})
})
