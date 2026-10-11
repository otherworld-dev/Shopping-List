<template>
	<div>
		<NcAppNavigationNewItem ref="newItemRef"
			:name="newListText"
			:edit-placeholder="listNamePlaceholder"
			@new-item="onNewList">
			<template #icon>
				<NcIconSvgWrapper :path="mdiPlus" />
			</template>
		</NcAppNavigationNewItem>

		<template v-for="section in sections" :key="section.key">
			<NcAppNavigationCaption v-if="section.caption"
				:name="section.caption" />
			<!-- Each section is its own drag group, so a list can't be dragged into
			     another section; pinning and unpinning move it between them. -->
			<draggable :model-value="section.lists"
				item-key="id"
				:group="section.key"
				:animation="150"
				:delay="150"
				:delay-on-touch-only="true"
				ghost-class="list-sidebar__ghost"
				@update:model-value="(moved: ShoppingList[]) => listsStore.reorderSection(section.key, moved.map(l => l.id))">
				<template #item="{ element: list }">
					<NcAppNavigationItem :key="list.id"
						:name="list.title"
						:active="list.id === listsStore.currentListId"
						:editable="list.isOwner"
						:edit-label="renameText"
						force-menu
						@click="listsStore.selectList(list.id)"
						@update:name="(name: string) => onRename(list.id, name)">
						<template #counter>
							<span v-if="getUncheckedCount(list.id) > 0" class="count-bubble">
								{{ getUncheckedCount(list.id) }}
							</span>
						</template>
						<template #actions>
							<NcActionButton v-if="list.isOwner"
								close-after-click
								@click="$emit('share', list.id)">
								{{ shareText }}
							</NcActionButton>
							<NcActionButton @click="listsStore.setPinned(list.id, !list.isPinned)">
								{{ list.isPinned ? unpinText : pinText }}
							</NcActionButton>
							<NcActionButton v-if="list.isOwner" @click="onDelete(list.id)">
								{{ deleteText }}
							</NcActionButton>
						</template>
					</NcAppNavigationItem>
				</template>
			</draggable>
		</template>

		<div v-if="listsStore.currentListId !== null" class="sidebar-settings">
			<button class="sidebar-settings__btn" @click="$emit('showSettings')">
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
	NcAppNavigationNewItem,
	NcAppNavigationItem,
	NcAppNavigationCaption,
	NcActionButton,
	NcEmptyContent,
	NcIconSvgWrapper,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import type { ShoppingList } from '../types'
import type { SectionKey } from '../utils/listSort'

defineEmits<{ showSettings: [], share: [listId: number] }>()

const listsStore = useListsStore()
const itemsStore = useItemsStore()

const listIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" fill="currentColor"/></svg>'

// Pre-compute translations so they don't re-run DOMPurify on every render
const newListText = t('shopping_list', 'New list')
const listNamePlaceholder = t('shopping_list', 'List name')
const newListFallback = t('shopping_list', 'New shopping list')
const renameText = t('shopping_list', 'Rename list')
const deleteText = t('shopping_list', 'Delete list')
const shareText = t('shopping_list', 'Share list')
const sharedText = t('shopping_list', 'Shared with me')
const emptyName = t('shopping_list', 'No shopping lists')
const emptyDesc = t('shopping_list', 'Create your first shopping list to get started')
const settingsText = t('shopping_list', 'List settings')
const pinnedText = t('shopping_list', 'Pinned')
const othersText = t('shopping_list', 'Others')
const pinText = t('shopping_list', 'Pin list')
const unpinText = t('shopping_list', 'Unpin list')

// Pinned lists, yours and shared ones, go first. Your other lists follow,
// captioned Others only when there is a Pinned section above them, and
// the unpinned shared lists stay under Shared with me.
const sections = computed(() => {
	const hasPinned = listsStore.pinnedLists.length > 0
	const all: { key: SectionKey, caption: string, lists: ShoppingList[] }[] = [
		{ key: 'pinned', caption: pinnedText, lists: listsStore.pinnedLists },
		{ key: 'owned', caption: hasPinned ? othersText : '', lists: listsStore.unpinnedOwnedLists },
		{ key: 'shared', caption: sharedText, lists: listsStore.unpinnedSharedLists },
	]
	return all.filter(section => section.lists.length > 0)
})

function getUncheckedCount(listId: number): number {
	const items = itemsStore.itemsByList[listId] ?? []
	return items.filter(i => !i.checked).length
}

// NcAppNavigationNewItem (@nextcloud/vue 9.6.0) clears its input when you
// confirm but not when you cancel, so a name you typed and abandoned comes
// back the next time the field opens and the next Enter commits it. Blank it
// on the way in instead. Harmless if a later release fixes this upstream.
const newItemRef = ref<{ newItemValue: string, newItemActive: boolean } | null>(null)

watch(() => newItemRef.value?.newItemActive, (active, wasActive) => {
	if (active && !wasActive && newItemRef.value) {
		newItemRef.value.newItemValue = ''
	}
})

// An empty name falls back to the old default, so confirming a blank field
// behaves exactly like the previous one-click button did.
async function onNewList(name: string) {
	await listsStore.create(name.trim() || newListFallback)
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
	text-align: start;
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

.list-sidebar__ghost {
	opacity: 0.5;
}
</style>
