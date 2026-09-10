import { ref, watch } from 'vue'
import { areaKey, loadCollapsed, saveCollapsed } from '../utils/collapsedAreas'
import type { StorageLike } from '../utils/collapsedAreas'

// Reading window.localStorage can itself throw, for example when the browser
// blocks site data, so it is fetched inside a try.
function browserStorage(): StorageLike | null {
	try {
		return window.localStorage
	} catch {
		return null
	}
}

/**
 * Tracks which shop-area groups are collapsed on the current list, and keeps
 * that in localStorage per list, so a folded area stays folded after a
 * reload and each list remembers its own.
 *
 * `listId` is a getter because the list can change under the view (switching
 * lists in the sidebar), and on a public page it is only known once the
 * items have loaded. While it is null, toggling still works for the page view.
 */
export function useCollapsedAreas(listId: () => number | null, storage: StorageLike | null = browserStorage()) {
	const collapsed = ref(new Set<string>())

	watch(listId, (id) => {
		collapsed.value = id === null ? new Set() : loadCollapsed(storage, id)
	}, { immediate: true })

	function isCollapsed(areaId: number | null): boolean {
		return collapsed.value.has(areaKey(areaId))
	}

	function toggle(areaId: number | null): void {
		const key = areaKey(areaId)
		const next = new Set(collapsed.value)
		if (next.has(key)) {
			next.delete(key)
		} else {
			next.add(key)
		}
		collapsed.value = next

		const id = listId()
		if (id !== null) saveCollapsed(storage, id, next)
	}

	return { isCollapsed, toggle }
}
