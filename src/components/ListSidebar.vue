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
		</NcAppNavigationItem>

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

const listsStore = useListsStore()

const listIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" fill="currentColor"/></svg>'

// Pre-compute translations so they don't re-run DOMPurify on every render
const newListText = t('shoppinglist', 'New list')
const renameText = t('shoppinglist', 'Rename list')
const deleteText = t('shoppinglist', 'Delete list')
const sharedText = t('shoppinglist', 'Shared with me')
const emptyName = t('shoppinglist', 'No shopping lists')
const emptyDesc = t('shoppinglist', 'Create your first shopping list to get started')

async function onNewList() {
	await listsStore.create(t('shoppinglist', 'New shopping list'))
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
