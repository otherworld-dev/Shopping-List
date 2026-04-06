<template>
	<div v-if="item" class="item-row" :class="{ 'item-row--checked': item.checked }">
		<label class="item-row__check">
			<input
				type="checkbox"
				:checked="item.checked"
				:disabled="!canEdit"
				@change="onToggleCheck" />
		</label>

		<span class="item-row__name" :class="{ 'item-row__name--checked': item.checked }">
			{{ item.name }}
		</span>

		<span v-if="item.quantity" class="item-row__quantity">
			{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
		</span>

		<span v-if="areaName" class="item-row__area" :style="areaColor ? { color: areaColor } : {}">
			{{ areaName }}
		</span>

		<button
			v-if="canEdit"
			class="item-row__delete"
			:title="deleteTitle"
			@click="onDelete">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { computed } from 'vue'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { useListsStore } from '../stores/lists'

const props = defineProps<{
	itemId: number
	listId: number
	canEdit: boolean
}>()

const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const listsStore = useListsStore()
const deleteTitle = t('shoppinglist', 'Delete')

const item = computed(() => {
	const items = itemsStore.itemsByList[props.listId] ?? []
	return items.find(i => i.id === props.itemId) ?? null
})

const areaName = computed(() => {
	if (!item.value?.shopAreaId || !listsStore.currentListId) return null
	const areas = shopAreasStore.areasByList[listsStore.currentListId] ?? []
	const area = areas.find(a => a.id === item.value!.shopAreaId)
	return area?.name ?? null
})

const areaColor = computed(() => {
	if (!item.value?.shopAreaId || !listsStore.currentListId) return null
	const areas = shopAreasStore.areasByList[listsStore.currentListId] ?? []
	const area = areas.find(a => a.id === item.value!.shopAreaId)
	return area?.color ?? null
})

async function onToggleCheck() {
	await itemsStore.toggleCheck(props.listId, props.itemId)
}

async function onDelete() {
	await itemsStore.remove(props.listId, props.itemId)
}
</script>

<style scoped>
.item-row {
	display: flex !important;
	flex-direction: row !important;
	flex-wrap: nowrap !important;
	align-items: center;
	height: 44px;
	padding: 0 12px;
	border-bottom: 1px solid var(--color-border);
	transition: background-color 0.1s ease;
	gap: 0;
}

.item-row:last-child {
	border-bottom: none;
}

.item-row:hover {
	background-color: var(--color-background-hover);
}

.item-row__check {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 0 10px 0 4px;
	cursor: pointer;
}

.item-row__check input[type="checkbox"] {
	width: 18px;
	height: 18px;
	cursor: pointer;
	accent-color: var(--color-primary-element);
	margin: 0;
}

.item-row__name {
	flex: 1 1 0%;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 0.95em;
	padding-right: 8px;
}

.item-row__name--checked {
	text-decoration: line-through;
	color: var(--color-text-maxcontrast);
}

.item-row__quantity {
	flex: 0 0 auto;
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	white-space: nowrap;
	padding: 0 8px;
}

.item-row__area {
	flex: 0 0 auto;
	font-size: 0.8em;
	white-space: nowrap;
	padding: 0 8px;
	opacity: 0.8;
}

.item-row__delete {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	padding: 6px;
	border-radius: var(--border-radius);
	opacity: 0;
	transition: opacity 0.15s ease, color 0.15s ease;
}

.item-row:hover .item-row__delete {
	opacity: 1;
}

.item-row__delete:hover {
	color: var(--color-error);
}
</style>
