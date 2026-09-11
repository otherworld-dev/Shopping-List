import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useCollapsedAreas } from './useCollapsedAreas'
import { saveCollapsed } from '../utils/collapsedAreas'
import type { StorageLike } from '../utils/browserStorage'

function memoryStorage(): StorageLike {
	const data: Record<string, string> = {}
	return {
		getItem: (key: string) => (key in data ? data[key] : null),
		setItem: (key: string, value: string) => { data[key] = value },
		removeItem: (key: string) => { delete data[key] },
	}
}

describe('useCollapsedAreas', () => {
	it('starts with every area expanded', () => {
		const { isCollapsed } = useCollapsedAreas(() => 1, memoryStorage())
		expect(isCollapsed(3)).toBe(false)
		expect(isCollapsed(null)).toBe(false)
	})

	it('collapses and expands an area on toggle', () => {
		const { isCollapsed, toggle } = useCollapsedAreas(() => 1, memoryStorage())
		toggle(3)
		expect(isCollapsed(3)).toBe(true)
		expect(isCollapsed(4)).toBe(false)
		toggle(3)
		expect(isCollapsed(3)).toBe(false)
	})

	it('treats the uncategorized group as its own area', () => {
		const { isCollapsed, toggle } = useCollapsedAreas(() => 1, memoryStorage())
		toggle(null)
		expect(isCollapsed(null)).toBe(true)
		expect(isCollapsed(3)).toBe(false)
	})

	it('restores what was collapsed earlier on the same list', () => {
		const storage = memoryStorage()
		useCollapsedAreas(() => 1, storage).toggle(3)
		const { isCollapsed } = useCollapsedAreas(() => 1, storage)
		expect(isCollapsed(3)).toBe(true)
	})

	it('switches to the saved state of the other list when the list changes', async () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 2, new Set(['8']))
		const listId = ref(1)
		const { isCollapsed, toggle } = useCollapsedAreas(() => listId.value, storage)
		toggle(3)

		listId.value = 2
		await nextTick()
		expect(isCollapsed(3)).toBe(false)
		expect(isCollapsed(8)).toBe(true)

		listId.value = 1
		await nextTick()
		expect(isCollapsed(3)).toBe(true)
	})

	it('picks up the saved state once the list id becomes known', async () => {
		const storage = memoryStorage()
		saveCollapsed(storage, 4, new Set(['3']))
		const listId = ref<number | null>(null)
		const { isCollapsed } = useCollapsedAreas(() => listId.value, storage)
		expect(isCollapsed(3)).toBe(false)

		listId.value = 4
		await nextTick()
		expect(isCollapsed(3)).toBe(true)
	})

	it('still toggles for the session when there is no storage', () => {
		const { isCollapsed, toggle } = useCollapsedAreas(() => 1, null)
		toggle(3)
		expect(isCollapsed(3)).toBe(true)
	})
})
