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
		createLink: (listId: number, permission: number, password?: string, expiresAt?: string) =>
			axios.post(url(`lists/${listId}/shares/link`), { permission, password, expiresAt }),
		updateLink: (id: number, data: Record<string, unknown>) =>
			axios.put(url(`shares/${id}/link`), data),
		deleteLink: (id: number) => axios.delete(url(`shares/${id}/link`)),
	},
	areas: {
		getForList: (listId: number) => axios.get(url(`lists/${listId}/areas`)),
		create: (listId: number, name: string, color?: string, keywords?: string[]) =>
			axios.post(url(`lists/${listId}/areas`), { name, color, keywords }),
		update: (listId: number, id: number, data: Record<string, unknown>) =>
			axios.put(url(`lists/${listId}/areas/${id}`), data),
		delete: (listId: number, id: number) => axios.delete(url(`lists/${listId}/areas/${id}`)),
	},
	tags: {
		getAll: () => axios.get(url('tags')),
		create: (name: string) => axios.post(url('tags'), { name }),
		delete: (id: number) => axios.delete(url(`tags/${id}`)),
	},
}

export const publicApi = {
	getList: (token: string) => axios.get(url(`public/${token}`)),
	auth: (token: string, password: string) =>
		axios.post(url(`public/${token}/auth`), { password }),
	getItems: (token: string) => axios.get(url(`public/${token}/items`)),
	createItem: (token: string, data: Record<string, unknown>) =>
		axios.post(url(`public/${token}/items`), data),
	updateItem: (token: string, id: number, data: Record<string, unknown>) =>
		axios.put(url(`public/${token}/items/${id}`), data),
	checkItem: (token: string, id: number, checked: boolean) =>
		axios.put(url(`public/${token}/items/${id}/check`), { checked }),
	deleteItem: (token: string, id: number) =>
		axios.delete(url(`public/${token}/items/${id}`)),
	reorder: (token: string, sortedIds: number[]) =>
		axios.post(url(`public/${token}/items/reorder`), { sortedIds }),
	getAreas: (token: string) => axios.get(url(`public/${token}/areas`)),
}
