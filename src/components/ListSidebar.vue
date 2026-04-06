<template>
	<div>
		<NcAppNavigationNew
			:text="newListText"
			@click="onNewList" />

		<template v-if="listsStore.ownedLists.length > 0">
			<NcAppNavigationItem
				v-for="list in listsStore.ownedLists"
				:key="list.id"
				:name="list.title"
				:active="list.id === listsStore.currentListId"
				:editable="true"
				:edit-label="renameText"
				@click="listsStore.selectList(list.id)"
				@update:name="(name: string) => onRename(list.id, name)">
				<template #counter>
					<span v-if="getUncheckedCount(list.id) > 0" class="count-bubble">
						{{ getUncheckedCount(list.id) }}
					</span>
				</template>
				<template #actions>
					<NcActionButton @click="onDelete(list.id)">
						{{ deleteText }}
					</NcActionButton>
				</template>
			</NcAppNavigationItem>
		</template>

		<NcAppNavigationCaption
			v-if="listsStore.sharedLists.length > 0"
			:name="sharedText" />

		<NcAppNavigationItem
			v-for="list in listsStore.sharedLists"
			:key="list.id"
			:name="list.title"
			:active="list.id === listsStore.currentListId"
			@click="listsStore.selectList(list.id)">
			<template #counter>
				<span v-if="getUncheckedCount(list.id) > 0" class="count-bubble">
					{{ getUncheckedCount(list.id) }}
				</span>
			</template>
		</NcAppNavigationItem>

		<div class="sidebar-settings">
			<button class="sidebar-settings__btn" @click="$emit('show-settings')">
				⚙ {{ settingsText }}
			</button>
		</div>

		<NcEmptyContent v-if="!listsStore.loading && listsStore.lists.length === 0"
			:name="emptyName"
			:description="emptyDesc">
			<template #icon>
				<NcIconSvgWrapper :svg="listIcon" />
			</template>
		</NcEmptyContent>
	</div>
</template>

<script setup lang="ts">
import {
	NcAppNavigationNew,
	NcAppNavigationItem,
	NcAppNavigationCaption,
	NcActionButton,
	NcEmptyContent,
	NcIconSvgWrapper,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'

defineEmits<{ 'show-settings': [] }>()

const listsStore = useListsStore()
const itemsStore = useItemsStore()

const listIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" fill="currentColor"/></svg>'

// Pre-compute translations so they don't re-run DOMPurify on every render
const newListText = t('shopping_list', 'New list')
const renameText = t('shopping_list', 'Rename list')
const deleteText = t('shopping_list', 'Delete list')
const sharedText = t('shopping_list', 'Shared with me')
const emptyName = t('shopping_list', 'No shopping lists')
const emptyDesc = t('shopping_list', 'Create your first shopping list to get started')
const settingsText = t('shopping_list', 'Area Keywords')

function getUncheckedCount(listId: number): number {
	const items = itemsStore.itemsByList[listId] ?? []
	return items.filter(i => !i.checked).length
}

async function onNewList() {
	await listsStore.create(t('shopping_list', 'New shopping list'))
}

async function onRename(id: number, name: string) {
	if (name.trim()) {
		await listsStore.update(id, name.trim())
	}
}

async function onDelete(id: number) {
	await listsStore.remove(id)
}
</script>

<style scoped>
.sidebar-settings {
	padding: 8px 10px;
	border-top: 1px solid var(--color-border);
	margin-top: auto;
}

.sidebar-settings__btn {
	width: 100%;
	padding: 8px 12px;
	background: none;
	border: none;
	border-radius: var(--border-radius-large);
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	cursor: pointer;
	text-align: left;
}

.sidebar-settings__btn:hover {
	background: var(--color-background-hover);
	color: var(--color-main-text);
}

.count-bubble {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 20px;
	height: 20px;
	padding: 0 6px;
	border-radius: 10px;
	background-color: var(--color-primary-element);
	color: var(--color-primary-element-text);
	font-size: 0.75em;
	font-weight: 700;
	line-height: 1;
}
</style>
