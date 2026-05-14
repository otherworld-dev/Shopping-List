import { ref, readonly } from 'vue'
import { loadValue, saveValue } from './db'

const QUEUE_KEY = 'mutation-queue'

export interface QueuedMutation {
	id: string
	timestamp: number
	type: 'item.check' | 'item.create' | 'item.update' | 'item.delete'
		| 'item.reorder' | 'item.clearChecked' | 'item.uncheckAll'
	listId: number
	itemId?: number
	payload: Record<string, unknown>
	tempId?: string
	retries: number
}

const queue = ref<QueuedMutation[]>([])
let loaded = false

async function load(): Promise<void> {
	if (loaded) return
	const saved = await loadValue<QueuedMutation[]>(QUEUE_KEY)
	if (saved) queue.value = saved
	loaded = true
}

async function persist(): Promise<void> {
	await saveValue(QUEUE_KEY, JSON.parse(JSON.stringify(queue.value)))
}

export async function enqueue(
	mutation: Omit<QueuedMutation, 'id' | 'timestamp' | 'retries'>,
): Promise<void> {
	await load()
	queue.value.push({
		...mutation,
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		retries: 0,
	})
	await persist()
}

export async function dequeue(): Promise<QueuedMutation | undefined> {
	await load()
	const item = queue.value.shift()
	await persist()
	return item
}

export async function peekAll(): Promise<QueuedMutation[]> {
	await load()
	return queue.value
}

export async function clear(): Promise<void> {
	queue.value = []
	await persist()
}

export async function removeMutation(id: string): Promise<void> {
	await load()
	queue.value = queue.value.filter(m => m.id !== id)
	await persist()
}

export async function updateMutation(id: string, updates: Partial<QueuedMutation>): Promise<void> {
	await load()
	const idx = queue.value.findIndex(m => m.id === id)
	if (idx !== -1) {
		queue.value[idx] = { ...queue.value[idx], ...updates }
	}
	await persist()
}

export function useMutationQueue() {
	load()
	return {
		queue: readonly(queue),
		enqueue,
		dequeue,
		peekAll,
		clear,
		removeMutation,
		updateMutation,
	}
}
