<template>
	<div class="list-view">
		<div class="list-view__header">
			<h2>{{ listsStore.currentList?.title }}</h2>
			<div class="list-view__actions">
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
				<div v-for="group in areaGroups" :key="group.areaId ?? 'none'" class="list-view__area-group">
					<div v-if="group.areaName"
						class="list-view__area-header"
						:style="group.areaColor ? { borderLeftColor: group.areaColor } : {}">
						<span class="list-view__area-name">{{ group.areaName }}</span>
						<span class="list-view__area-count">{{ group.itemIds.length }}</span>
					</div>
					<div v-else-if="areaGroups.length > 1" class="list-view__area-header">
						<span class="list-view__area-name list-view__area-name--muted">{{ uncategorizedText }}</span>
						<span class="list-view__area-count">{{ group.itemIds.length }}</span>
					</div>

					<div class="list-view__items">
						<ItemRow
							v-for="itemId in group.itemIds"
							:key="itemId"
							:item-id="itemId"
							:list-id="listsStore.currentList!.id"
							:can-edit="canEdit" />
					</div>
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
					:can-edit="canEdit" />
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
import { ref, computed, watch } from 'vue'
import {
	NcEmptyContent,
	NcIconSvgWrapper,
	NcLoadingIcon,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { getCurrentUser } from '@nextcloud/auth'
import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { Permission } from '../types'
import ItemRow from './ItemRow.vue'
import ItemEditor from './ItemEditor.vue'
import ShareDialog from './ShareDialog.vue'

const listsStore = useListsStore()
const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()

const showChecked = ref(true)
const showShareDialog = ref(false)
const currentUserId = getCurrentUser()?.uid ?? ''

// Pre-compute translations once
const shareText = t('shoppinglist', 'Share')
const emptyName = t('shoppinglist', 'No items yet')
const emptyDesc = t('shoppinglist', 'Add your first item above')
const uncategorizedText = t('shoppinglist', 'Uncategorized')
const boughtText = t('shoppinglist', 'Checked off')
const uncheckAllText = t('shoppinglist', 'Restore all')
const clearCheckedText = t('shoppinglist', 'Delete all')

const canEdit = computed(() =>
	listsStore.currentList !== null && listsStore.currentList.permission >= Permission.WRITE,
)

// Primitives-only area groups to avoid passing reactive objects as props
interface AreaGroup {
	areaId: number | null
	areaName: string | null
	areaColor: string | null
	itemIds: number[]
}

const areaGroups = computed((): AreaGroup[] => {
	const unchecked = itemsStore.uncheckedItems
	if (unchecked.length === 0) return []

	const grouped = new Map<number | null, number[]>()

	for (const item of unchecked) {
		const key = item.shopAreaId
		if (!grouped.has(key)) {
			grouped.set(key, [])
		}
		grouped.get(key)!.push(item.id)
	}

	const areas = listsStore.currentListId
		? (shopAreasStore.areasByList[listsStore.currentListId] ?? [])
		: []
	const result: AreaGroup[] = []

	for (const area of areas) {
		const ids = grouped.get(area.id)
		if (ids && ids.length > 0) {
			result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, itemIds: ids })
			grouped.delete(area.id)
		}
	}

	const uncategorizedIds: number[] = []
	for (const [, ids] of grouped) {
		uncategorizedIds.push(...ids)
	}
	if (uncategorizedIds.length > 0) {
		result.push({ areaId: null, areaName: null, areaColor: null, itemIds: uncategorizedIds })
	}

	return result
})

const checkedItemIds = computed(() =>
	itemsStore.checkedItems.map(i => i.id),
)

const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>'

watch(() => listsStore.currentListId, async (newId) => {
	if (newId !== null) {
		await Promise.all([
			itemsStore.fetchByList(newId),
			shopAreasStore.fetchByList(newId),
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
	overflow: hidden;
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
</style>
