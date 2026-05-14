import { ref, readonly } from 'vue'
import { api } from '../composables/useApi'

const isOnline = ref(navigator.onLine)

let initialized = false
const onOnlineCallbacks = new Set<() => void>()

function init() {
	if (initialized) return
	initialized = true

	window.addEventListener('online', async () => {
		// Verify actual server reachability, not just network interface
		try {
			await api.lists.getAll()
			isOnline.value = true
			onOnlineCallbacks.forEach(cb => cb())
		} catch {
			// Network interface is up but server unreachable
			isOnline.value = false
		}
	})

	window.addEventListener('offline', () => {
		isOnline.value = false
	})
}

export function useNetworkStatus() {
	init()

	return {
		isOnline: readonly(isOnline),
		onOnline(callback: () => void) {
			onOnlineCallbacks.add(callback)
		},
	}
}

export function isNetworkError(error: unknown): boolean {
	if (!error || typeof error !== 'object') return false
	const err = error as Record<string, unknown>
	if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') return true
	// Only treat missing response as network error if it's an Axios error
	if (err.isAxiosError && !err.response) return true
	return false
}
