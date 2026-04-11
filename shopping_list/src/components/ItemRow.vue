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
				ref="qtyInputRef"
				v-model="editQty"
				type="text"
				:placeholder="qtyLabel"
				class="item-row__edit-input item-row__edit-qty"
				@keydown.enter.prevent="saveEdit"
				@keydown.escape.prevent="cancelEdit"
				@keydown.tab.prevent="focusNameInput"
				@blur="onFieldBlur" />
			<input
				ref="nameInputRef"
				v-model="editName"
				type="text"
				class="item-row__edit-input item-row__edit-name"
				@keydown.enter.prevent="saveEdit"
				@keydown.escape.prevent="cancelEdit"
				@keydown.tab.prevent="focusAreaInput"
				@blur="onFieldBlur" />
			<div ref="areaWrapperRef" class="item-row__area-wrapper">
				<input
					ref="areaInputRef"
					v-model="areaSearch"
					type="text"
					:placeholder="editAreaName || areaPlaceholder"
					class="item-row__edit-input item-row__edit-area"
					@focus="onAreaFocus"
					@keydown.enter.prevent="onAreaEnter"
					@keydown.escape="closeDropdown"
					@keydown.tab.prevent="onAreaTab"
					@keydown.down.prevent="moveHighlight(1)"
					@keydown.up.prevent="moveHighlight(-1)"
					@blur="onFieldBlur" />
				<button
					v-if="editAreaId !== null"
					class="item-row__area-clear"
					tabindex="-1"
					@mousedown.prevent="clearArea">
					✕
				</button>
				<Teleport to="body">
					<div v-if="dropdownOpen" ref="dropdownRef" class="item-row__dropdown" :style="dropdownStyle">
						<div
							v-for="(area, i) in filteredAreas"
							:key="area.id"
							class="item-row__dropdown-item"
							:class="{ 'item-row__dropdown-item--highlighted': i === highlightIndex }"
							@mousedown.prevent="selectArea(area)">
							<span
								v-if="area.color"
								class="item-row__dropdown-dot"
								:style="{ backgroundColor: area.color }" />
							{{ area.name }}
						</div>
						<div v-if="filteredAreas.length === 0" class="item-row__dropdown-empty">
							{{ noMatchText }}
						</div>
					</div>
				</Teleport>
			</div>
		</template>

		<template v-else>
			<span v-if="item.quantity" class="item-row__quantity">
				{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
			</span>
			<span class="item-row__name" :class="{ 'item-row__name--checked': item.checked }">
				{{ item.name }}
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
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
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
const areaPlaceholder = t('shopping_list', 'Area')
const noMatchText = t('shopping_list', 'No match')

const item = computed(() => {
	const items = itemsStore.itemsByList[props.listId] ?? []
	return items.find(i => i.id === props.itemId) ?? null
})

const areaOptions = computed(() => {
	const areas = shopAreasStore.areasByList[props.listId] ?? []
	return areas.map(a => ({ id: a.id, name: a.name, color: a.color }))
})

const areaName = computed(() => {
	if (!item.value?.shopAreaId) return null
	return areaOptions.value.find(a => a.id === item.value!.shopAreaId)?.name ?? null
})

const areaColor = computed(() => {
	if (!item.value?.shopAreaId) return null
	return areaOptions.value.find(a => a.id === item.value!.shopAreaId)?.color ?? null
})

const editName = ref('')
const editQty = ref('')
const editAreaId = ref<number | null>(null)
const areaSearch = ref('')
const dropdownOpen = ref(false)
const highlightIndex = ref(0)

const nameInputRef = ref<HTMLInputElement | null>(null)
const qtyInputRef = ref<HTMLInputElement | null>(null)
const areaInputRef = ref<HTMLInputElement | null>(null)
const areaWrapperRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
let saving = false

const editAreaName = computed(() => {
	if (editAreaId.value === null) return null
	return areaOptions.value.find(a => a.id === editAreaId.value)?.name ?? null
})

const filteredAreas = computed(() => {
	const q = areaSearch.value.toLowerCase().trim()
	if (!q) return areaOptions.value
	return areaOptions.value.filter(a => a.name.toLowerCase().includes(q))
})

watch(() => props.editing, async (isEditing) => {
	if (isEditing && item.value) {
		editName.value = item.value.name
		editQty.value = item.value.quantity ?? ''
		editAreaId.value = item.value.shopAreaId
		areaSearch.value = ''
		dropdownOpen.value = false
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

function focusAreaInput() {
	areaInputRef.value?.focus()
}

// --- Area dropdown ---

const dropdownStyle = computed(() => {
	if (!areaWrapperRef.value) return {}
	const rect = areaWrapperRef.value.getBoundingClientRect()
	return {
		position: 'fixed' as const,
		top: `${rect.bottom + 2}px`,
		left: `${rect.left}px`,
		minWidth: `${Math.max(rect.width, 160)}px`,
	}
})

function onAreaFocus() {
	dropdownOpen.value = true
	highlightIndex.value = 0
	areaSearch.value = ''
}

function closeDropdown() {
	dropdownOpen.value = false
	areaSearch.value = ''
}

function moveHighlight(delta: number) {
	const len = filteredAreas.value.length
	if (len === 0) return
	highlightIndex.value = (highlightIndex.value + delta + len) % len
}

function selectArea(area: { id: number; name: string }) {
	editAreaId.value = area.id
	areaSearch.value = ''
	dropdownOpen.value = false
	nameInputRef.value?.focus()
}

function clearArea() {
	editAreaId.value = null
	areaSearch.value = ''
	areaInputRef.value?.focus()
}

function onAreaEnter() {
	if (dropdownOpen.value && filteredAreas.value.length > 0) {
		selectArea(filteredAreas.value[highlightIndex.value])
	} else {
		saveEdit()
	}
}

function onAreaTab() {
	closeDropdown()
	focusQtyInput()
}

function onClickOutside(e: MouseEvent) {
	const target = e.target as Node
	if (areaWrapperRef.value?.contains(target)) return
	if (dropdownRef.value?.contains(target)) return
	closeDropdown()
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

// --- Save / Cancel ---

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
	const areaChanged = editAreaId.value !== item.value.shopAreaId

	closeDropdown()
	emit('closeEdit')

	if (nameChanged || qtyChanged || areaChanged) {
		saving = true
		await itemsStore.update(props.listId, props.itemId, {
			name: trimmedName,
			quantity: trimmedQty,
			shopAreaId: editAreaId.value,
		})
		saving = false
	}
}

function cancelEdit() {
	closeDropdown()
	emit('closeEdit')
}

function onFieldBlur(e: FocusEvent) {
	const related = e.relatedTarget as HTMLElement | null
	// Don't save if focus is moving to another field within this row
	if (related === nameInputRef.value
		|| related === qtyInputRef.value
		|| related === areaInputRef.value) return
	// Don't save if clicking inside the area dropdown wrapper
	if (related && areaWrapperRef.value?.contains(related)) return

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

.item-row__quantity {
	flex: 0 0 auto;
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	white-space: nowrap;
	padding-right: 8px;
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

/* Area picker in edit mode */
.item-row__area-wrapper {
	flex: 0 0 auto;
	position: relative;
	display: flex;
	align-items: center;
	z-index: 10;
}

.item-row__edit-area {
	width: 90px;
	font-size: 0.85em;
	padding-right: 20px !important;
}

.item-row__edit-area::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

.item-row__area-clear {
	position: absolute;
	right: 4px;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	font-size: 0.75em;
	padding: 2px 4px;
	line-height: 1;
	z-index: 2;
}

.item-row__area-clear:hover {
	color: var(--color-error);
}

</style>

<!-- Unscoped styles for teleported dropdown -->
<style>
.item-row__dropdown {
	max-height: 220px;
	overflow-y: auto;
	background: var(--color-main-background);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 10000;
}

.item-row__dropdown-item {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 10px;
	font-size: 0.85em;
	cursor: pointer;
}

.item-row__dropdown-item:hover,
.item-row__dropdown-item--highlighted {
	background-color: var(--color-background-hover);
}

.item-row__dropdown-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	flex-shrink: 0;
}

.item-row__dropdown-empty {
	padding: 8px 10px;
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	text-align: center;
}
</style>
