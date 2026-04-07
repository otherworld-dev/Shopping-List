import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'

function url(path: string): string {
	return generateOcsUrl('apps/shopping_list/api/v1/' + path)
}

export const api = {
	lists: {
		getAll: () => axios.get(url('lists')),
		get: (id: number) => axios.get(url(`lists/${id}`)),
		create: (title: string) => axios.post(url('lists'), { title }),
		update: (id: number, title: string) => axios.put(url(`lists/${id}`), { title }),
		delete: (id: number) => axios.delete(url(`lists/${id}`)),
	},
	items: {
		getAll: (listId: number) => axios.get(url(`lists/${listId}/items`)),
		create: (listId: number, data: Record<string, unknown>) =>
			axios.post(url(`lists/${listId}/items`), data),
		update: (listId: number, id: number, data: Record<string, unknown>) =>
			axios.put(url(`lists/${listId}/items/${id}`), data),
		check: (listId: number, id: number, checked: boolean) =>
			axios.put(url(`lists/${listId}/items/${id}/check`), { checked }),
		delete: (listId: number, id: number) =>
			axios.delete(url(`lists/${listId}/items/${id}`)),
		reorder: (listId: number, sortedIds: number[]) =>
			axios.post(url(`lists/${listId}/items/reorder`), { sortedIds }),
		clearChecked: (listId: number) =>
			axios.delete(url(`lists/${listId}/items/checked`)),
		uncheckAll: (listId: number) =>
			axios.post(url(`lists/${listId}/items/uncheck-all`)),
	},
	shares: {
		getAll: (listId: number) => axios.get(url(`lists/${listId}/shares`)),
		create: (listId: number, sharedWith: string, shareType: number, permission: number) =>
			axios.post(url(`lists/${listId}/shares`), { sharedWith, shareType, permission }),
		update: (id: number, permission: number) =>
			axios.put(url(`shares/${id}`), { permission }),
		delete: (id: number) => axios.delete(url(`shares/${id}`)),
	},
	areas: {
		getForList: (listId: number) => axios.get(url(`lists/${listId}/areas`)),
		getMine: () => axios.get(url('areas')),
		create: (name: string, color?: string, keywords?: string[]) =>
			axios.post(url('areas'), { name, color, keywords }),
		update: (id: number, data: Record<string, unknown>) =>
			axios.put(url(`areas/${id}`), data),
		delete: (id: number) => axios.delete(url(`areas/${id}`)),
	},
	tags: {
		getAll: () => axios.get(url('tags')),
		create: (name: string) => axios.post(url('tags'), { name }),
		delete: (id: number) => axios.delete(url(`tags/${id}`)),
	},
}
