<template>
	<div
		v-if="item"
		class="item-row"
		:class="{
			'item-row--checked': item.checked,
			'item-row--editing': editing,
		}"
		:data-item-id="canEdit && !item.checked ? itemId : undefined">
		<label class="item-row__check">
			<input
				type="checkbox"
				:checked="item.checked"
				:disabled="!canEdit"
				@change="onToggleCheck" />
		</label>

		<template v-if="editing">
			<input
				ref="nameInputRef"
				v-model="editName"
				type="text"
				class="item-row__edit-input item-row__edit-name"
				@keydown.enter.prevent="saveEdit"
				@keydown.escape.prevent="cancelEdit"
				@keydown.tab.prevent="focusQtyInput"
				@blur="onNameBlur" />
			<input
				ref="qtyInputRef"
				v-model="editQty"
				type="text"
				:placeholder="qtyLabel"
				class="item-row__edit-input item-row__edit-qty"
				@keydown.enter.prevent="saveEdit"
				@keydown.escape.prevent="cancelEdit"
				@keydown.tab.prevent="focusNameInput"
				@blur="onQtyBlur" />
		</template>

		<template v-else>
			<span class="item-row__name" :class="{ 'item-row__name--checked': item.checked }">
				{{ item.name }}
			</span>
			<span v-if="item.quantity" class="item-row__quantity">
				{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
			</span>
		</template>

		<span v-if="areaName && !editing" class="item-row__area">
			<span v-if="areaColor" class="item-row__area-dot" :style="{ backgroundColor: areaColor }" />
			{{ areaName }}
		</span>

		<button
			v-if="canEdit && !editing"
			class="item-row__delete"
			:title="deleteTitle"
			@click="onDelete">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, computed, watch, nextTick } from 'vue'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { useListsStore } from '../stores/lists'

const props = defineProps<{
	itemId: number
	listId: number
	canEdit: boolean
	editing: boolean
}>()

const emit = defineEmits<{
	closeEdit: []
}>()

const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const listsStore = useListsStore()
const deleteTitle = t('shopping_list', 'Delete')
const qtyLabel = t('shopping_list', 'Qty')

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

const editName = ref('')
const editQty = ref('')
const nameInputRef = ref<HTMLInputElement | null>(null)
const qtyInputRef = ref<HTMLInputElement | null>(null)
let saving = false

watch(() => props.editing, async (isEditing) => {
	if (isEditing && item.value) {
		editName.value = item.value.name
		editQty.value = item.value.quantity ?? ''
		await nextTick()
		nameInputRef.value?.focus()
		nameInputRef.value?.select()
	}
})

function focusQtyInput() {
	qtyInputRef.value?.focus()
	qtyInputRef.value?.select()
}

function focusNameInput() {
	nameInputRef.value?.focus()
	nameInputRef.value?.select()
}

async function saveEdit() {
	if (saving || !item.value) return
	const trimmedName = editName.value.trim()
	if (!trimmedName) {
		cancelEdit()
		return
	}

	const trimmedQty = editQty.value.trim() || null
	const nameChanged = trimmedName !== item.value.name
	const qtyChanged = trimmedQty !== (item.value.quantity ?? null)

	emit('closeEdit')

	if (nameChanged || qtyChanged) {
		saving = true
		await itemsStore.update(props.listId, props.itemId, {
			name: trimmedName,
			quantity: trimmedQty,
		})
		saving = false
	}
}

function cancelEdit() {
	emit('closeEdit')
}

function onNameBlur(e: FocusEvent) {
	const related = e.relatedTarget as HTMLElement | null
	if (related === qtyInputRef.value) return
	setTimeout(() => {
		if (props.editing) saveEdit()
	}, 100)
}

function onQtyBlur(e: FocusEvent) {
	const related = e.relatedTarget as HTMLElement | null
	if (related === nameInputRef.value) return
	setTimeout(() => {
		if (props.editing) saveEdit()
	}, 100)
}

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
	position: relative;
}

.item-row:last-child {
	border-bottom: none;
}

.item-row:hover {
	background-color: var(--color-background-hover);
}

/* Invisible overlay to capture clicks — bypasses Nextcloud's click
   interception on non-interactive elements. The document-level capture
   listener in ListView detects which row was clicked. */
.item-row[data-item-id]::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
}

.item-row--editing::after {
	display: none;
}

.item-row__check {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 0 10px 0 4px;
	cursor: pointer;
	position: relative;
	z-index: 1;
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
	display: inline-flex;
	align-items: center;
	gap: 5px;
	flex: 0 0 auto;
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	white-space: nowrap;
	padding: 0 8px;
	position: relative;
	z-index: 1;
	pointer-events: none;
}

.item-row__area-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	flex-shrink: 0;
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
	position: relative;
	z-index: 1;
}

.item-row:hover .item-row__delete {
	opacity: 1;
}

.item-row__delete:hover {
	color: var(--color-error);
}

/* Inline editing */
.item-row__edit-input {
	height: 30px;
	border: 1px solid var(--color-primary-element);
	border-radius: var(--border-radius);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 0.95em;
	outline: none;
	padding: 0 8px;
	position: relative;
	z-index: 1;
}

.item-row__edit-name {
	flex: 1 1 0%;
	min-width: 0;
}

.item-row__edit-qty {
	flex: 0 0 70px;
	width: 70px;
	font-size: 0.85em;
	text-align: center;
}

.item-row__edit-qty::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}
</style>
