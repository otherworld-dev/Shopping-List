<template>
	<div class="item-editor">
		<div class="item-editor__main">
			<span class="item-editor__plus">+</span>
			<input
				ref="nameRef"
				v-model="name"
				type="text"
				enterkeyhint="send"
				:placeholder="addItemLabel"
				class="item-editor__input"
				@keydown.enter.prevent="onSubmit"
				@keydown.tab.prevent="focusArea"
				@paste="onPaste" />
			<div class="item-editor__area-wrapper" ref="areaWrapperRef">
				<input
					ref="areaRef"
					v-model="areaSearch"
					type="text"
					enterkeyhint="send"
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

const addItemLabel = t('shopping_list', 'Add an item to list...')
const shopAreaPlaceholder = t('shopping_list', 'Area')
const noMatchText = t('shopping_list', 'No match')

const nameRef = ref<HTMLInputElement | null>(null)
const areaRef = ref<HTMLInputElement | null>(null)
const areaWrapperRef = ref<HTMLElement | null>(null)

const name = ref('')
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

function onClickOutside(e: MouseEvent) {
	if (areaWrapperRef.value && !areaWrapperRef.value.contains(e.target as Node)) {
		closeDropdown()
	}
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

// --- Ingredient parsing ---

// Known units for matching
const UNITS = [
	'teaspoon', 'teaspoons', 'tsp',
	'tablespoon', 'tablespoons', 'tbsp',
	'cup', 'cups',
	'ounce', 'ounces', 'oz',
	'pound', 'pounds', 'lb', 'lbs',
	'gram', 'grams', 'g',
	'kilogram', 'kilograms', 'kg',
	'milliliter', 'milliliters', 'ml',
	'liter', 'liters', 'l',
	'pinch', 'pinches',
	'bunch', 'bunches',
	'clove', 'cloves',
	'can', 'cans',
	'bottle', 'bottles',
	'piece', 'pieces',
	'slice', 'slices',
	'head', 'heads',
	'stalk', 'stalks',
	'sprig', 'sprigs',
	'pack', 'packs', 'packet', 'packets',
	'bag', 'bags',
	'fl oz',
]

// Units that can appear without a number (e.g. "Pinch of salt", "Zest of 1 lime")
const LEADING_UNITS = ['pinch', 'pinches', 'bunch', 'bunches', 'zest', 'dash', 'handful']

function matchUnit(text: string): string {
	const lower = text.toLowerCase()
	let best = ''
	for (const unit of UNITS) {
		if (lower.startsWith(unit + ' ') || lower.startsWith(unit + ',') || lower === unit) {
			if (unit.length > best.length) best = unit
		}
	}
	return best
}

/**
 * Clean up an ingredient name:
 * - Remove parenthetical notes: "(chopped)", "(stems removed, chopped)"
 * - Remove trailing comma descriptions: ", finely diced"
 * - Capitalize first letter
 * - Collapse whitespace
 */
function cleanName(raw: string): string {
	let name = raw

	// Remove all parenthetical groups, including nested: (... (... ) ...)
	// Repeat until no more parens remain (handles nesting)
	let prev = ''
	while (prev !== name) {
		prev = name
		name = name.replace(/\s*\([^)]*\)/g, '')
	}

	name = name
		.replace(/[()]/g, '')                // remove any stray parens
		.replace(/,\s*,/g, ',')              // collapse double commas
		.replace(/,\s*$/, '')                // trailing comma
		.replace(/^\s*,\s*/, '')             // leading comma
		.replace(/\s+/g, ' ')               // collapse whitespace
		.trim()

	// Capitalize first letter
	if (name.length > 0) {
		name = name.charAt(0).toUpperCase() + name.slice(1)
	}
	return name
}

function parseIngredient(line: string): { name: string; quantity: string | null } {
	const trimmed = line.trim()
	if (!trimmed) return { name: '', quantity: null }

	// Check for lines starting with a unit word without a number ("Pinch of salt", "Zest of 1 lime")
	const trimmedLower = trimmed.toLowerCase()
	for (const unit of LEADING_UNITS) {
		if (trimmedLower.startsWith(unit + ' ') || trimmedLower.startsWith(unit + ',')) {
			let rest = trimmed.slice(unit.length).trim()
			rest = rest.replace(/^,\s*/, '').replace(/^of\s+/i, '').trim()
			return { name: cleanName(rest || trimmed), quantity: '1 ' + unit }
		}
	}

	// Match leading quantity: numbers, fractions, decimals (e.g. "2 1/2", "0.33", "1/4", "10-15")
	const qtyPattern = /^([\d]+(?:\s+[\d]+\/[\d]+|\/[\d]+|\.\d+)?(?:\s*-\s*[\d]+(?:\/[\d]+|\.\d+)?)?)\s*/
	const match = trimmed.match(qtyPattern)

	if (!match) {
		return { name: cleanName(trimmed), quantity: null }
	}

	const qtyStr = match[1].trim()
	let rest = trimmed.slice(match[0].length).trim()

	// Try to match a unit after the quantity
	const matchedUnit = matchUnit(rest)

	let finalQty = qtyStr
	if (matchedUnit) {
		finalQty = qtyStr + ' ' + matchedUnit
		rest = rest.slice(matchedUnit.length).trim()
		// Remove leading comma or "of"
		rest = rest.replace(/^,\s*/, '').replace(/^of\s+/i, '').trim()
	}

	// Clean up: remove leading comma
	rest = rest.replace(/^,\s*/, '').trim()

	return {
		name: cleanName(rest || trimmed),
		quantity: finalQty,
	}
}

// --- Auto-detect shop area from ingredient name (reads keywords from area entities) ---

function detectArea(ingredientName: string): number | null {
	const lower = ingredientName.toLowerCase()
	const areas = areaOptions.value

	for (const area of areas) {
		const fullArea = (shopAreasStore.areasByList[listsStore.currentListId!] ?? []).find(a => a.id === area.id)
		if (!fullArea?.keywords) continue
		for (const keyword of fullArea.keywords) {
			if (lower.includes(keyword)) {
				return area.id
			}
		}
	}
	return null
}

async function onPaste(e: ClipboardEvent) {
	const text = e.clipboardData?.getData('text') ?? ''
	if (!text.includes('\n')) return // Single line — let default paste handle it

	e.preventDefault()

	const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0)
	if (lines.length === 0) return

	// If only one line, populate the name field with the full text for editing
	if (lines.length === 1) {
		name.value = lines[0]
		return
	}

	// Multiple lines — create items for each
	for (const line of lines) {
		const parsed = parseIngredient(line)
		if (!parsed.name) continue

		const explicitArea = selectedAreaId.value !== null
		const areaId = selectedAreaId.value ?? detectArea(parsed.name)
		await itemsStore.create(props.listId, {
			name: parsed.name,
			quantity: parsed.quantity || '1',
			shopAreaId: areaId,
			areaExplicit: explicitArea,
		})
	}

	name.value = ''
	await nextTick()
	nameRef.value?.focus()
}

async function onSubmit() {
	const trimmedName = name.value.trim()
	if (!trimmedName) return

	closeDropdown()

	const parsed = parseIngredient(trimmedName)
	if (!parsed.name) return

	const explicitArea = selectedAreaId.value !== null
	const areaId = selectedAreaId.value ?? detectArea(parsed.name)
	await itemsStore.create(props.listId, {
		name: parsed.name,
		quantity: parsed.quantity || '1',
		shopAreaId: areaId,
		areaExplicit: explicitArea,
	})

	name.value = ''
	await nextTick()
	nameRef.value?.focus()
}
</script>

<style scoped>
.item-editor {
	background-color: var(--color-background-dark);
	border-bottom: 1px solid var(--color-border);
	padding: 10px 16px;
}

.item-editor__main {
	display: flex !important;
	flex-direction: row !important;
	flex-wrap: nowrap !important;
	align-items: center;
	height: 42px;
	gap: 8px;
	background: var(--color-main-background);
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	padding: 0 4px 0 0;
	transition: border-color 0.15s ease;
}

.item-editor__main:focus-within {
	border-color: var(--color-primary-element);
}

.item-editor__plus {
	flex: 0 0 auto;
	font-size: 1.2em;
	color: var(--color-primary-element);
	padding: 0 8px 0 12px;
	user-select: none;
	font-weight: 700;
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
	padding: 0;
}

.item-editor__input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

/* Filterable area dropdown */
.item-editor__area-wrapper {
	flex: 0 0 auto !important;
	position: relative;
	display: flex;
	align-items: center;
	border-left: 1px solid var(--color-border);
}

.item-editor__area-input {
	width: 90px;
	height: 28px;
	padding: 0 22px 0 8px;
	border: none;
	border-radius: 0;
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.85em;
	outline: none;
	cursor: text;
	box-sizing: border-box;
}

.item-editor__area-input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
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
