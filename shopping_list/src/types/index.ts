export interface ShoppingList {
	id: number
	userId: string
	title: string
	permission: Permission
	isOwner: boolean
	createdAt: string
	updatedAt: string
}

export interface Item {
	id: number
	listId: number
	name: string
	quantity: string | null
	unit: string | null
	shopAreaId: number | null
	checked: boolean
	checkedBy: string | null
	sortOrder: number
	tags: Tag[]
	createdAt: string
	updatedAt: string
}

export interface ListShare {
	id: number
	listId: number
	sharedWith: string
	sharedWithType: ShareType
	sharedWithDisplayName?: string
	permission: Permission
	sharedBy: string
}

export interface ShopArea {
	id: number
	userId: string
	name: string
	sortOrder: number
	color: string | null
	keywords: string[]
}

export interface Tag {
	id: number
	name: string
}

export enum Permission {
	READ = 0,
	WRITE = 1,
}

export enum ShareType {
	USER = 0,
	GROUP = 1,
}
