<template>
	<div class="list-view">
		<div class="list-view__header">
			<h2>{{ listsStore.currentList?.title }}</h2>
			<div class="list-view__actions">
				<div v-if="currentShares.length > 0"
					class="list-view__avatars"
					@click="showShareDialog = true">
					<NcAvatar
						v-for="share in visibleShares"
						:key="share.id"
						:user="share.sharedWithType === ShareType.USER ? share.sharedWith : undefined"
						:display-name="share.sharedWithDisplayName || share.sharedWith"
						:is-no-user="share.sharedWithType === ShareType.GROUP"
						:size="28"
						:show-user-status="false"
						class="list-view__avatar" />
					<span v-if="overflowCount > 0" class="list-view__avatar-overflow">
						+{{ overflowCount }}
					</span>
				</div>
				<button v-if="listsStore.currentList?.isOwner"
					class="list-view__share-btn"
					@click="showShareDialog = true">
					{{ shareText }}
				</button>
			</div>
		</div>

		<div class="list-view__card">
			<ItemEditor
				v-if="canEdit"
				:list-id="listsStore.currentList!.id" />

			<div v-if="itemsStore.loading" class="list-view__loading">
				<NcLoadingIcon />
			</div>

			<template v-else>
				<div v-if="itemsStore.uncheckedItems.length === 0 && itemsStore.checkedItems.length === 0"
					class="list-view__empty">
					<NcEmptyContent
						:name="emptyName"
						:description="emptyDesc">
						<template #icon>
							<NcIconSvgWrapper :svg="cartIcon" />
						</template>
					</NcEmptyContent>
				</div>

				<!-- Items grouped by shop area -->
				<div v-for="(group, groupIndex) in localGroups" :key="group.areaId ?? 'none'" class="list-view__area-group">
					<div v-if="group.areaName"
						class="list-view__area-header"
						:style="group.areaColor ? { borderLeftColor: group.areaColor } : {}">
						<span class="list-view__area-name">{{ group.areaName }}</span>
						<span class="list-view__area-count">{{ group.items.length }}</span>
					</div>
					<div v-else-if="localGroups.length > 1" class="list-view__area-header">
						<span class="list-view__area-name list-view__area-name--muted">{{ uncategorizedText }}</span>
						<span class="list-view__area-count">{{ group.items.length }}</span>
					</div>

					<draggable
						v-model="localGroups[groupIndex].items"
						item-key="id"
						:group="{ name: 'items' }"
						:disabled="!canEdit"
						:animation="150"
						:delay="150"
						:delay-on-touch-only="true"
						class="list-view__items"
						ghost-class="list-view__item--ghost"
						@start="isDragging = true"
						@end="onDragEnd">
						<template #item="{ element }">
							<ItemRow
								:item-id="element.id"
								:list-id="listsStore.currentList!.id"
								:can-edit="canEdit"
								:editing="editingItemId === element.id"
								@close-edit="editingItemId = null" />
						</template>
					</draggable>
				</div>
			</template>
		</div>

		<div v-if="!itemsStore.loading && itemsStore.checkedItems.length > 0" class="list-view__bought">
			<div class="list-view__bought-header">
				<h3 @click="showChecked = !showChecked">
					{{ boughtText }} ({{ itemsStore.checkedItems.length }})
					<span class="list-view__toggle">{{ showChecked ? '▾' : '▸' }}</span>
				</h3>
				<div v-if="canEdit" class="list-view__bought-actions">
					<button class="list-view__action-btn" @click="onUncheckAll">
						{{ uncheckAllText }}
					</button>
					<button class="list-view__action-btn list-view__action-btn--danger" @click="onClearChecked">
						{{ clearCheckedText }}
					</button>
				</div>
			</div>
			<div v-if="showChecked" class="list-view__bought-card">
				<ItemRow
					v-for="itemId in checkedItemIds"
					:key="itemId"
					:item-id="itemId"
					:list-id="listsStore.currentList!.id"
					:can-edit="canEdit"
					:editing="false" />
			</div>
		</div>

		<ShareDialog
			v-if="showShareDialog && listsStore.currentList"
			:list-id="listsStore.currentList.id"
			:is-owner="listsStore.currentList.isOwner"
			:current-user-id="currentUserId"
			@close="showShareDialog = false" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
	NcAvatar,
	NcEmptyContent,
	NcIconSvgWrapper,
	NcLoadingIcon,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { getCurrentUser } from '@nextcloud/auth'
import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import type { Item } from '../types'
import { Permission, ShareType } from '../types'
import { useSharesStore } from '../stores/shares'
import draggable from 'vuedraggable'
import ItemRow from './ItemRow.vue'
import ItemEditor from './ItemEditor.vue'
import ShareDialog from './ShareDialog.vue'

const listsStore = useListsStore()
const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const sharesStore = useSharesStore()

const MAX_VISIBLE_AVATARS = 3

const currentShares = computed(() => {
	const listId = listsStore.currentListId
	return listId !== null ? (sharesStore.sharesByList[listId] ?? []) : []
})

const visibleShares = computed(() => currentShares.value.slice(0, MAX_VISIBLE_AVATARS))
const overflowCount = computed(() => Math.max(0, currentShares.value.length - MAX_VISIBLE_AVATARS))

const showChecked = ref(true)
const showShareDialog = ref(false)
const currentUserId = getCurrentUser()?.uid ?? ''
const editingItemId = ref<number | null>(null)

// Capture-phase click listener to bypass Nextcloud's click interception
// on non-interactive elements. Editable rows use a ::after overlay that
// makes them clickable; we detect which row was hit via data-item-id.
function onCaptureClick(e: MouseEvent) {
	const target = e.target as HTMLElement

	if (target.closest('.item-row__check') || target.closest('.item-row__delete')) return
	if ((target as HTMLInputElement).type === 'checkbox') return

	if (isDragging.value) return

	const row = target.closest('.item-row:not(.item-row--checked)') as HTMLElement | null
	if (row) {
		const idStr = row.getAttribute('data-item-id')
		if (idStr) {
			editingItemId.value = parseInt(idStr, 10)
			return
		}
	}

	if (editingItemId.value !== null && !target.closest('.item-row--editing')) {
		editingItemId.value = null
	}
}

onMounted(() => document.addEventListener('click', onCaptureClick, true))
onUnmounted(() => document.removeEventListener('click', onCaptureClick, true))

// Pre-compute translations once
const shareText = t('shopping_list', 'Share')
const emptyName = t('shopping_list', 'No items yet')
const emptyDesc = t('shopping_list', 'Add your first item above')
const uncategorizedText = t('shopping_list', 'Uncategorized')
const boughtText = t('shopping_list', 'Checked off')
const uncheckAllText = t('shopping_list', 'Restore all')
const clearCheckedText = t('shopping_list', 'Delete all')

const canEdit = computed(() =>
	listsStore.currentList !== null && listsStore.currentList.permission >= Permission.WRITE,
)

interface AreaGroup {
	areaId: number | null
	areaName: string | null
	areaColor: string | null
	items: Item[]
}

const isDragging = ref(false)

const areaGroups = computed((): AreaGroup[] => {
	const unchecked = itemsStore.uncheckedItems
	if (unchecked.length === 0) return []

	const grouped = new Map<number | null, Item[]>()

	for (const item of unchecked) {
		const key = item.shopAreaId
		if (!grouped.has(key)) {
			grouped.set(key, [])
		}
		grouped.get(key)!.push(item)
	}

	const areas = listsStore.currentListId
		? (shopAreasStore.areasByList[listsStore.currentListId] ?? [])
		: []
	const result: AreaGroup[] = []

	for (const area of areas) {
		const items = grouped.get(area.id)
		if (items && items.length > 0) {
			result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, items })
			grouped.delete(area.id)
		}
	}

	const uncategorizedItems: Item[] = []
	for (const [, items] of grouped) {
		uncategorizedItems.push(...items)
	}
	if (uncategorizedItems.length > 0) {
		result.push({ areaId: null, areaName: null, areaColor: null, items: uncategorizedItems })
	}

	return result
})

// Local mutable copy of groups for vuedraggable to manipulate
const localGroups = ref<AreaGroup[]>([])

watch(areaGroups, (groups) => {
	// Only sync from store when not mid-drag to avoid fighting vuedraggable
	if (!isDragging.value) {
		localGroups.value = groups.map(g => ({ ...g, items: [...g.items] }))
	}
}, { immediate: true })

async function onDragEnd() {
	isDragging.value = false
	const listId = listsStore.currentList?.id
	if (!listId) return

	// Collect all sorted IDs and detect area changes
	const allSortedIds: number[] = []
	const areaUpdates: Promise<unknown>[] = []

	for (const group of localGroups.value) {
		for (const item of group.items) {
			allSortedIds.push(item.id)
			if (item.shopAreaId !== group.areaId) {
				areaUpdates.push(itemsStore.update(listId, item.id, { shopAreaId: group.areaId, areaExplicit: true }))
			}
		}
	}

	await Promise.all([
		...areaUpdates,
		itemsStore.reorder(listId, allSortedIds),
	])
}

const checkedItemIds = computed(() =>
	itemsStore.checkedItems.map(i => i.id),
)

const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>'

watch(() => listsStore.currentListId, async (newId) => {
	if (newId !== null) {
		await Promise.all([
			itemsStore.fetchByList(newId),
			shopAreasStore.fetchByList(newId),
			sharesStore.fetchByList(newId),
		])
	}
}, { immediate: true })

async function onClearChecked() {
	if (listsStore.currentListId) {
		await itemsStore.clearChecked(listsStore.currentListId)
	}
}

async function onUncheckAll() {
	if (listsStore.currentListId) {
		await itemsStore.uncheckAll(listsStore.currentListId)
	}
}
</script>

<style scoped>
.list-view {
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
}

.list-view__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
}

.list-view__header h2 {
	margin: 0;
	font-size: 1.5em;
	font-weight: 700;
}

.list-view__actions {
	display: flex;
	gap: 4px;
}

.list-view__card {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
}

.list-view__loading {
	display: flex;
	justify-content: center;
	padding: 40px;
}

.list-view__empty {
	padding: 24px 12px;
}

.list-view__area-group {
	border-top: 1px solid var(--color-border);
}

.list-view__area-header {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 16px;
	border-left: 3px solid var(--color-border-dark);
	background-color: var(--color-background-dark);
}

.list-view__area-name {
	font-size: 0.8em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--color-text-maxcontrast);
}

.list-view__area-name--muted {
	font-weight: 500;
}

.list-view__area-count {
	color: var(--color-text-maxcontrast);
	font-size: 0.75em;
	opacity: 0.7;
}

.list-view__items {
	display: flex;
	flex-direction: column;
	min-height: 8px;
}

.list-view__item--ghost {
	opacity: 0.4;
	background-color: var(--color-primary-element-light);
	border-radius: var(--border-radius);
}

.list-view__avatars {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.list-view__avatar {
	margin-left: -6px;
	border: 2px solid var(--color-main-background);
	border-radius: 50%;
}

.list-view__avatar:first-child {
	margin-left: 0;
}

.list-view__avatar-overflow {
	margin-left: 4px;
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	font-weight: 500;
}

.list-view__share-btn {
	background: none;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius-large);
	color: var(--color-main-text);
	padding: 6px 14px;
	font-size: 0.9em;
	cursor: pointer;
}

.list-view__share-btn:hover {
	background-color: var(--color-background-hover);
}

/* Bought section */
.list-view__bought {
	margin-top: 20px;
}

.list-view__bought-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 0 8px;
}

.list-view__bought-header h3 {
	margin: 0;
	font-size: 0.9em;
	color: var(--color-text-maxcontrast);
	font-weight: 500;
	cursor: pointer;
	user-select: none;
}

.list-view__bought-actions {
	display: flex;
	gap: 6px;
}

.list-view__action-btn {
	background: none;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	color: var(--color-text-maxcontrast);
	padding: 4px 10px;
	font-size: 0.8em;
	cursor: pointer;
}

.list-view__action-btn:hover {
	background-color: var(--color-background-hover);
	color: var(--color-main-text);
}

.list-view__action-btn--danger:hover {
	background-color: var(--color-error);
	color: #fff;
	border-color: var(--color-error);
}

.list-view__bought-card {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
	overflow: hidden;
	opacity: 0.65;
}

.list-view__toggle {
	margin-left: 4px;
}

@media (max-width: 1024px) {
	.list-view__header {
		padding-left: 44px;
	}
}
</style>
