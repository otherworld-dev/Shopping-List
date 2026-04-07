<template>
	<div class="area-settings">
		<div class="area-settings__header">
			<button class="area-settings__back" @click="$emit('back')">
				← {{ backText }}
			</button>
			<h2>{{ title }}</h2>
			<p class="area-settings__desc">{{ description }}</p>
		</div>

		<!-- Add new area -->
		<div class="area-settings__create">
			<input
				v-model="newAreaName"
				type="text"
				:placeholder="newAreaPlaceholder"
				class="area-settings__create-input"
				@keydown.enter.prevent="onCreateArea" />
			<input
				v-model="newAreaColor"
				type="color"
				class="area-settings__create-color"
				:title="colorTitle" />
			<button
				class="area-settings__create-btn"
				:disabled="!newAreaName.trim()"
				@click="onCreateArea">
				{{ addAreaText }}
			</button>
		</div>

		<div class="area-settings__search">
			<input
				v-model="search"
				type="text"
				:placeholder="searchPlaceholder"
				class="area-settings__search-input" />
		</div>

		<div v-for="(area, index) in areas" :key="area.id" class="area-settings__section">
			<div class="area-settings__section-header" @click="toggleSection(area.id)">
				<span class="area-settings__section-toggle">{{ openSections[area.id] ? '▾' : '▸' }}</span>

				<!-- Color swatch -->
				<input
					type="color"
					:value="area.color || '#9E9E9E'"
					class="area-settings__color-input"
					:title="colorTitle"
					@click.stop
					@input="onColorChange(area.id, ($event.target as HTMLInputElement).value)" />

				<!-- Name: inline rename or display -->
				<template v-if="renamingAreaId === area.id">
					<input
						ref="renameInputRef"
						v-model="renameValue"
						type="text"
						class="area-settings__rename-input"
						@click.stop
						@keydown.enter.prevent="saveRename(area.id)"
						@keydown.escape.prevent="cancelRename"
						@blur="saveRename(area.id)" />
				</template>
				<template v-else>
					<span class="area-settings__section-name" @dblclick.stop="startRename(area)">{{ area.name }}</span>
					<button
						class="area-settings__action-btn area-settings__action-btn--rename"
						:title="renameText"
						@click.stop="startRename(area)">
						✎
					</button>
				</template>

				<!-- Keyword count -->
				<span class="area-settings__section-count">{{ filteredKeywords(area).length }}</span>

				<!-- Reorder buttons -->
				<button
					class="area-settings__action-btn"
					:disabled="index === 0"
					:title="moveUpText"
					@click.stop="moveArea(index, -1)">
					▲
				</button>
				<button
					class="area-settings__action-btn"
					:disabled="index === areas.length - 1"
					:title="moveDownText"
					@click.stop="moveArea(index, 1)">
					▼
				</button>

				<!-- Delete -->
				<button
					class="area-settings__action-btn area-settings__action-btn--delete"
					:title="deleteText"
					@click.stop="onDeleteArea(area)">
					✕
				</button>
			</div>

			<div v-if="openSections[area.id]" class="area-settings__section-body">
				<div class="area-settings__add">
					<input
						v-model="newKeyword[area.id]"
						type="text"
						:placeholder="addPlaceholder"
						class="area-settings__add-input"
						@keydown.enter.prevent="onAddKeyword(area)" />
					<button
						class="area-settings__add-btn"
						:disabled="!newKeyword[area.id]?.trim()"
						@click="onAddKeyword(area)">
						+
					</button>
				</div>
				<div class="area-settings__keywords">
					<span
						v-for="word in filteredKeywords(area)"
						:key="word"
						class="area-settings__keyword">
						{{ word }}
						<button class="area-settings__keyword-remove" @click="onRemoveKeyword(area, word)">✕</button>
					</span>
					<span v-if="filteredKeywords(area).length === 0" class="area-settings__empty">
						{{ noKeywordsText }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { useShopAreasStore } from '../stores/shopAreas'
import type { ShopArea } from '../types'

const shopAreasStore = useShopAreasStore()

defineEmits<{ back: [] }>()

const backText = t('shopping_list', 'Back to lists')
const title = t('shopping_list', 'Manage Areas')
const description = t('shopping_list', 'Manage your shop areas, keywords, and display order. Keywords auto-detect which area an item belongs to when added or pasted.')
const searchPlaceholder = t('shopping_list', 'Search keywords...')
const addPlaceholder = t('shopping_list', 'Add keyword...')
const noKeywordsText = t('shopping_list', 'No keywords')
const renameText = t('shopping_list', 'Rename')
const deleteText = t('shopping_list', 'Delete area')
const moveUpText = t('shopping_list', 'Move up')
const moveDownText = t('shopping_list', 'Move down')
const colorTitle = t('shopping_list', 'Change color')
const newAreaPlaceholder = t('shopping_list', 'New area name...')
const addAreaText = t('shopping_list', 'Add area')

const search = ref('')
const newKeyword = ref<Record<number, string>>({})
const openSections = ref<Record<number, boolean>>({})
const renamingAreaId = ref<number | null>(null)
const renameValue = ref('')
const renameInputRef = ref<HTMLInputElement[] | null>(null)
const newAreaName = ref('')
const newAreaColor = ref('#9E9E9E')

let saveTimeout: Record<number, ReturnType<typeof setTimeout>> = {}
let colorTimeout: Record<number, ReturnType<typeof setTimeout>> = {}

const areas = computed(() => shopAreasStore.myAreas)

onMounted(() => {
	shopAreasStore.fetchMine()
})

function filteredKeywords(area: ShopArea): string[] {
	const words = area.keywords ?? []
	const q = search.value.toLowerCase().trim()
	if (!q) return [...words].sort()
	return words.filter(w => w.includes(q)).sort()
}

function toggleSection(areaId: number) {
	openSections.value[areaId] = !openSections.value[areaId]
}

// --- Keywords ---

function onAddKeyword(area: ShopArea) {
	const word = newKeyword.value[area.id]?.trim().toLowerCase()
	if (!word) return
	if (area.keywords.includes(word)) {
		newKeyword.value[area.id] = ''
		return
	}

	const updated = [...area.keywords, word]
	area.keywords = updated
	newKeyword.value[area.id] = ''
	debounceSaveKeywords(area.id, updated)
}

function onRemoveKeyword(area: ShopArea, word: string) {
	const updated = area.keywords.filter(w => w !== word)
	area.keywords = updated
	debounceSaveKeywords(area.id, updated)
}

function debounceSaveKeywords(areaId: number, keywords: string[]) {
	if (saveTimeout[areaId]) clearTimeout(saveTimeout[areaId])
	saveTimeout[areaId] = setTimeout(() => {
		shopAreasStore.update(areaId, { keywords })
	}, 1000)
}

// --- Rename ---

async function startRename(area: ShopArea) {
	renamingAreaId.value = area.id
	renameValue.value = area.name
	await nextTick()
	if (renameInputRef.value && renameInputRef.value.length > 0) {
		renameInputRef.value[0].focus()
		renameInputRef.value[0].select()
	}
}

async function saveRename(areaId: number) {
	const trimmed = renameValue.value.trim()
	if (!trimmed || renamingAreaId.value !== areaId) {
		cancelRename()
		return
	}

	const area = areas.value.find(a => a.id === areaId)
	if (area && trimmed !== area.name) {
		await shopAreasStore.update(areaId, { name: trimmed })
	}
	renamingAreaId.value = null
}

function cancelRename() {
	renamingAreaId.value = null
}

// --- Color ---

function onColorChange(areaId: number, color: string) {
	// Update locally immediately for responsiveness
	const area = areas.value.find(a => a.id === areaId)
	if (area) area.color = color

	// Debounce the API save
	if (colorTimeout[areaId]) clearTimeout(colorTimeout[areaId])
	colorTimeout[areaId] = setTimeout(() => {
		shopAreasStore.update(areaId, { color })
	}, 500)
}

// --- Reorder ---

async function moveArea(index: number, direction: number) {
	const targetIndex = index + direction
	if (targetIndex < 0 || targetIndex >= areas.value.length) return

	const current = areas.value[index]
	const target = areas.value[targetIndex]

	// Swap sort orders
	const currentOrder = current.sortOrder
	const targetOrder = target.sortOrder

	// If they happen to have the same sortOrder, use index-based values
	const newCurrentOrder = currentOrder === targetOrder
		? targetIndex
		: targetOrder
	const newTargetOrder = currentOrder === targetOrder
		? index
		: currentOrder

	await Promise.all([
		shopAreasStore.update(current.id, { sortOrder: newCurrentOrder }),
		shopAreasStore.update(target.id, { sortOrder: newTargetOrder }),
	])

	// Re-fetch to get correct order
	await shopAreasStore.fetchMine()
}

// --- Create / Delete ---

async function onCreateArea() {
	const name = newAreaName.value.trim()
	if (!name) return

	await shopAreasStore.create(name, newAreaColor.value)
	newAreaName.value = ''
	newAreaColor.value = '#9E9E9E'
}

async function onDeleteArea(area: ShopArea) {
	if (!confirm(t('shopping_list', 'Delete "{name}"? Items in this area will become uncategorized.', { name: area.name }))) {
		return
	}
	await shopAreasStore.remove(area.id)
}
</script>

<style scoped>
.area-settings {
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
}

.area-settings__back {
	background: none;
	border: none;
	color: var(--color-primary-element);
	cursor: pointer;
	padding: 0;
	font-size: 0.9em;
	margin-bottom: 8px;
}

.area-settings__back:hover {
	text-decoration: underline;
}

.area-settings__header {
	margin-bottom: 16px;
}

.area-settings__header h2 {
	margin: 0 0 4px;
	font-size: 1.4em;
	font-weight: 700;
}

.area-settings__desc {
	margin: 0;
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
}

/* Create new area */
.area-settings__create {
	display: flex;
	gap: 8px;
	margin-bottom: 16px;
	align-items: center;
}

.area-settings__create-input {
	flex: 1;
	height: 36px;
	padding: 0 12px;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 0.9em;
	outline: none;
	box-sizing: border-box;
}

.area-settings__create-input:focus {
	border-color: var(--color-primary-element);
}

.area-settings__create-input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

.area-settings__create-color {
	width: 36px;
	height: 36px;
	padding: 2px;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius);
	background: var(--color-main-background);
	cursor: pointer;
}

.area-settings__create-btn {
	height: 36px;
	padding: 0 16px;
	border: none;
	border-radius: var(--border-radius-large);
	background: var(--color-primary-element);
	color: var(--color-primary-element-text);
	font-size: 0.85em;
	font-weight: 600;
	cursor: pointer;
	white-space: nowrap;
}

.area-settings__create-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

/* Search */
.area-settings__search {
	margin-bottom: 16px;
}

.area-settings__search-input {
	width: 100%;
	height: 36px;
	padding: 0 12px;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 0.9em;
	outline: none;
	box-sizing: border-box;
}

.area-settings__search-input:focus {
	border-color: var(--color-primary-element);
}

.area-settings__search-input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

/* Section */
.area-settings__section {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	margin-bottom: 8px;
	overflow: hidden;
}

.area-settings__section-header {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 12px;
	cursor: pointer;
	user-select: none;
	background: var(--color-background-dark);
}

.area-settings__section-header:hover {
	background: var(--color-background-hover);
}

.area-settings__section-toggle {
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	flex: 0 0 auto;
}

/* Color swatch in header */
.area-settings__color-input {
	width: 24px;
	height: 24px;
	padding: 1px;
	border: 1px solid var(--color-border-dark);
	border-radius: 50%;
	background: none;
	cursor: pointer;
	flex: 0 0 auto;
}

.area-settings__section-name {
	font-weight: 600;
	font-size: 0.9em;
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.area-settings__rename-input {
	flex: 1;
	height: 28px;
	padding: 0 8px;
	border: 1px solid var(--color-primary-element);
	border-radius: var(--border-radius);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 0.9em;
	font-weight: 600;
	outline: none;
	min-width: 0;
}

.area-settings__section-count {
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	flex: 0 0 auto;
}

/* Action buttons in header (rename, reorder, delete) */
.area-settings__action-btn {
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	font-size: 0.75em;
	padding: 2px 4px;
	border-radius: var(--border-radius);
	opacity: 0;
	transition: opacity 0.15s ease;
	flex: 0 0 auto;
	line-height: 1;
}

.area-settings__section-header:hover .area-settings__action-btn {
	opacity: 1;
}

.area-settings__action-btn:disabled {
	opacity: 0 !important;
	cursor: default;
}

.area-settings__section-header:hover .area-settings__action-btn:disabled {
	opacity: 0.25 !important;
}

.area-settings__action-btn--rename:hover {
	color: var(--color-primary-element);
}

.area-settings__action-btn--delete:hover {
	color: var(--color-error);
}

/* Section body (keywords) */
.area-settings__section-body {
	padding: 10px 14px;
}

.area-settings__add {
	display: flex;
	gap: 6px;
	margin-bottom: 10px;
}

.area-settings__add-input {
	flex: 1;
	height: 30px;
	padding: 0 10px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.85em;
	outline: none;
}

.area-settings__add-input:focus {
	border-color: var(--color-primary-element);
}

.area-settings__add-input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

.area-settings__add-btn {
	width: 30px;
	height: 30px;
	border: none;
	border-radius: var(--border-radius);
	background: var(--color-primary-element);
	color: var(--color-primary-element-text);
	font-size: 1.1em;
	font-weight: 700;
	cursor: pointer;
}

.area-settings__add-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.area-settings__keywords {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.area-settings__keyword {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 3px 8px;
	border-radius: var(--border-radius-pill, 12px);
	background: var(--color-background-dark);
	font-size: 0.8em;
	color: var(--color-main-text);
}

.area-settings__keyword-remove {
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	font-size: 0.8em;
	padding: 0 2px;
	line-height: 1;
}

.area-settings__keyword-remove:hover {
	color: var(--color-error);
}

.area-settings__empty {
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	font-style: italic;
}
</style>
