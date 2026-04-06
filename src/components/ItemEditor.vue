<template>
	<div class="item-editor">
		<div class="item-editor__main">
			<span class="item-editor__plus">+</span>
			<input
				ref="nameRef"
				v-model="name"
				type="text"
				:placeholder="addItemLabel"
				class="item-editor__input"
				@keydown.enter.prevent="onSubmit"
				@keydown.tab.prevent="focusQty" />
			<input
				ref="qtyRef"
				v-model="quantity"
				type="text"
				:placeholder="qtyLabel"
				class="item-editor__qty"
				@keydown.enter.prevent="onSubmit"
				@keydown.tab.prevent="focusArea" />
			<div class="item-editor__area-wrapper" ref="areaWrapperRef">
				<input
					ref="areaRef"
					v-model="areaSearch"
					type="text"
					:placeholder="selectedAreaName || shopAreaPlaceholder"
					class="item-editor__area-input"
					@focus="onAreaFocus"
					@keydown.enter.prevent="onAreaEnter"
					@keydown.tab.prevent="onAreaTab"
					@keydown.escape="closeDropdown"
					@keydown.down.prevent="moveHighlight(1)"
					@keydown.up.prevent="moveHighlight(-1)" />
				<button
					v-if="selectedAreaId !== null"
					class="item-editor__area-clear"
					tabindex="-1"
					@click="clearArea">
					✕
				</button>
				<div v-if="dropdownOpen" class="item-editor__dropdown">
					<div
						v-for="(area, i) in filteredAreas"
						:key="area.id"
						class="item-editor__dropdown-item"
						:class="{ 'item-editor__dropdown-item--highlighted': i === highlightIndex }"
						@mousedown.prevent="selectArea(area)">
						<span
							v-if="area.color"
							class="item-editor__dropdown-dot"
							:style="{ backgroundColor: area.color }" />
						{{ area.name }}
					</div>
					<div v-if="filteredAreas.length === 0" class="item-editor__dropdown-empty">
						{{ noMatchText }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { useListsStore } from '../stores/lists'

const props = defineProps<{
	listId: number
}>()

const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const listsStore = useListsStore()

const addItemLabel = t('shoppinglist', 'Add an item to list...')
const qtyLabel = t('shoppinglist', 'Qty')
const shopAreaPlaceholder = t('shoppinglist', 'Area')
const noMatchText = t('shoppinglist', 'No match')

const nameRef = ref<HTMLInputElement | null>(null)
const qtyRef = ref<HTMLInputElement | null>(null)
const areaRef = ref<HTMLInputElement | null>(null)
const areaWrapperRef = ref<HTMLElement | null>(null)

const name = ref('')
const quantity = ref('')
const selectedAreaId = ref<number | null>(null)
const areaSearch = ref('')
const dropdownOpen = ref(false)
const highlightIndex = ref(0)

const areaOptions = computed(() => {
	if (!listsStore.currentListId) return []
	const areas = shopAreasStore.areasByList[listsStore.currentListId] ?? []
	return areas.map(a => ({ id: a.id, name: a.name, color: a.color }))
})

const selectedAreaName = computed(() => {
	if (selectedAreaId.value === null) return null
	return areaOptions.value.find(a => a.id === selectedAreaId.value)?.name ?? null
})

const filteredAreas = computed(() => {
	const q = areaSearch.value.toLowerCase().trim()
	if (!q) return areaOptions.value
	return areaOptions.value.filter(a => a.name.toLowerCase().includes(q))
})

function focusQty() {
	qtyRef.value?.focus()
}

function focusArea() {
	areaRef.value?.focus()
}

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
	selectedAreaId.value = area.id
	areaSearch.value = ''
	dropdownOpen.value = false
	nameRef.value?.focus()
}

function clearArea() {
	selectedAreaId.value = null
	areaSearch.value = ''
}

function onAreaEnter() {
	if (dropdownOpen.value && filteredAreas.value.length > 0) {
		selectArea(filteredAreas.value[highlightIndex.value])
	} else {
		onSubmit()
	}
}

function onAreaTab() {
	closeDropdown()
	nameRef.value?.focus()
}

// Close dropdown on outside click
function onClickOutside(e: MouseEvent) {
	if (areaWrapperRef.value && !areaWrapperRef.value.contains(e.target as Node)) {
		closeDropdown()
	}
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

async function onSubmit() {
	const trimmedName = name.value.trim()
	if (!trimmedName) return

	closeDropdown()

	await itemsStore.create(props.listId, {
		name: trimmedName,
		quantity: quantity.value.trim() || null,
		shopAreaId: selectedAreaId.value,
	})

	name.value = ''
	quantity.value = ''
	await nextTick()
	nameRef.value?.focus()
}
</script>

<style scoped>
.item-editor {
	border-bottom: 1px solid var(--color-border);
}

.item-editor__main {
	display: flex !important;
	flex-direction: row !important;
	flex-wrap: nowrap !important;
	align-items: center;
	height: 44px;
	padding: 0 12px;
	gap: 0;
}

.item-editor__plus {
	flex: 0 0 auto;
	font-size: 1.3em;
	color: var(--color-text-maxcontrast);
	padding: 0 10px 0 4px;
	user-select: none;
}

.item-editor__input {
	flex: 1 1 0% !important;
	min-width: 0;
	height: 100%;
	border: none;
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.95em;
	outline: none;
	padding: 0 8px;
}

.item-editor__input::placeholder {
	color: var(--color-text-maxcontrast);
}

.item-editor__qty {
	flex: 0 0 60px !important;
	width: 60px;
	height: 28px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.85em;
	outline: none;
	padding: 0 6px;
	text-align: center;
}

.item-editor__qty:focus {
	border-color: var(--color-primary-element);
}

.item-editor__qty::placeholder {
	color: var(--color-text-maxcontrast);
}

/* Filterable area dropdown */
.item-editor__area-wrapper {
	flex: 0 0 auto !important;
	position: relative;
	margin-left: 6px;
	display: flex;
	align-items: center;
}

.item-editor__area-input {
	width: 110px;
	height: 28px;
	padding: 0 24px 0 8px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.85em;
	outline: none;
	cursor: text;
	box-sizing: border-box;
}

.item-editor__area-input:focus {
	border-color: var(--color-primary-element);
}

.item-editor__area-input::placeholder {
	color: var(--color-text-maxcontrast);
}

.item-editor__area-clear {
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
}

.item-editor__area-clear:hover {
	color: var(--color-error);
}

.item-editor__dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	min-width: 160px;
	max-height: 220px;
	overflow-y: auto;
	background: var(--color-main-background);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 100;
	margin-top: 2px;
}

.item-editor__dropdown-item {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 10px;
	font-size: 0.85em;
	cursor: pointer;
}

.item-editor__dropdown-item:hover,
.item-editor__dropdown-item--highlighted {
	background-color: var(--color-background-hover);
}

.item-editor__dropdown-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	flex-shrink: 0;
}

.item-editor__dropdown-empty {
	padding: 8px 10px;
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	text-align: center;
}
</style>
