<template>
	<div class="item-editor">
		<div class="item-editor__main">
			<span class="item-editor__plus">+</span>
			<input ref="nameRef"
				v-model="name"
				type="text"
				enterkeyhint="send"
				:placeholder="addItemLabel"
				class="item-editor__input"
				@keydown.enter.prevent="onSubmit"
				@keydown.tab.prevent="focusArea"
				@paste="onPaste">
			<div ref="areaWrapperRef" class="item-editor__area-wrapper">
				<input ref="areaRef"
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
					@keydown.up.prevent="moveHighlight(-1)">
				<button v-if="selectedAreaId !== null"
					class="item-editor__area-clear"
					tabindex="-1"
					@click="clearArea">
					✕
				</button>
				<div v-if="dropdownOpen" class="item-editor__dropdown">
					<div v-for="(area, i) in filteredAreas"
						:key="area.id"
						class="item-editor__dropdown-item"
						:class="{ 'item-editor__dropdown-item--highlighted': i === highlightIndex }"
						@mousedown.prevent="selectArea(area)">
						<span v-if="area.color"
							class="item-editor__dropdown-dot"
							:style="{ backgroundColor: area.color }" />
						{{ area.name }}
					</div>
					<div v-if="filteredAreas.length === 0" class="item-editor__dropdown-empty">
						{{ noMatchText }}
					</div>
				</div>
			</div>
			<NcPopover class="item-editor__help" popup-role="dialog">
				<template #trigger>
					<NcButton variant="tertiary-no-background"
						size="small"
						:aria-label="helpLabel"
						:title="helpLabel">
						<template #icon>
							<NcIconSvgWrapper :path="mdiHelpCircleOutline" :size="18" />
						</template>
					</NcButton>
				</template>
				<div class="input-help" tabindex="0" :aria-label="helpLabel">
					<p class="input-help__title">
						{{ helpTitle }}
					</p>
					<p class="input-help__intro">
						{{ helpIntro }}
					</p>
					<table class="input-help__examples">
						<thead>
							<tr>
								<th scope="col">
									{{ helpTypedHeader }}
								</th>
								<th scope="col">
									{{ helpResultHeader }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="example in inputExamples" :key="example.input">
								<td><code class="input-help__line">{{ example.input }}</code></td>
								<td class="input-help__result" :class="{ 'input-help__result--checked': example.checked }">
									<span v-if="example.quantity" class="input-help__quantity">{{ example.quantity }}</span> <span class="input-help__name">{{ example.name }}</span> <span v-if="example.checked" class="input-help__checked">{{ checkedOffText }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</NcPopover>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import { NcButton, NcIconSvgWrapper, NcPopover } from '@nextcloud/vue'
import { mdiHelpCircleOutline } from '@mdi/js'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { useListsStore } from '../stores/lists'
import { fold } from '../utils/fold'
import { getParsingPack } from '../utils/localePacks'
import { createIngredientParser } from '../utils/parseIngredient'
import { INPUT_EXAMPLES } from '../utils/inputExamples'

const props = defineProps<{
	listId: number
}>()

const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const listsStore = useListsStore()

const addItemLabel = t('shopping_list', 'Add an item or paste a list...')
const helpLabel = t('shopping_list', 'Input format help')
const helpTitle = t('shopping_list', 'Type one item, or paste a whole list')
const helpIntro = t('shopping_list', 'Every pasted line becomes its own item. Amounts, units and list markers are read for you.')
const helpTypedHeader = t('shopping_list', 'You type')
const helpResultHeader = t('shopping_list', 'You get')
// Same wording as the section a ticked example lands in.
const checkedOffText = t('shopping_list', 'Checked off')
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

// Parser for the viewer's language, with English fallback. The implementation
// lives in utils/parseIngredient.ts so it can be unit tested directly, without
// a component or a mocked locale.
const { parseIngredient } = createIngredientParser(getParsingPack())

// The input help shows each example line next to what this parser makes of
// it, so the help always matches what a paste would really produce, in the
// viewer's language.
const inputExamples = INPUT_EXAMPLES.map(source => {
	const input = t('shopping_list', source)
	return { input, ...parseIngredient(input) }
})

// --- Auto-detect shop area from ingredient name (reads keywords from area entities) ---

function detectArea(ingredientName: string): number | null {
	const needle = fold(ingredientName)
	const areas = shopAreasStore.areasByList[listsStore.currentListId!] ?? []
	let bestArea: number | null = null
	let bestLen = 0

	// Prefer the longest (most specific) matching keyword across all areas so a
	// short early-area token (e.g. "ham") can't shadow a specific later one
	// (e.g. "shampoo"). Areas are already sort-ordered, so ties keep the earlier.
	for (const area of areas) {
		if (!area.keywords) continue
		for (const keyword of area.keywords) {
			if (!keyword) continue
			const k = fold(keyword)
			if (k.length > bestLen && needle.includes(k)) {
				bestLen = k.length
				bestArea = area.id
			}
		}
	}
	return bestArea
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
			checked: parsed.checked,
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
		checked: parsed.checked,
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

/* Input format help */
.item-editor__help {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
}

.input-help {
	max-width: min(380px, calc(100vw - 32px));
	padding: 12px 14px;
	border-radius: var(--border-radius-large);
}

.input-help:focus-visible {
	outline: 2px solid var(--color-primary-element);
	outline-offset: -2px;
}

.input-help__title {
	font-weight: 600;
	margin: 0 0 4px;
}

.input-help__intro {
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
	margin: 0 0 10px;
}

.input-help__examples {
	border-collapse: collapse;
	width: 100%;
}

.input-help__examples th {
	text-align: start;
	font-weight: 600;
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	padding: 0 12px 4px 0;
}

.input-help__examples td {
	padding: 3px 12px 3px 0;
	vertical-align: middle;
}

.input-help__line {
	font-family: monospace;
	font-size: 0.85em;
	background: var(--color-background-dark);
	border-radius: var(--border-radius);
	padding: 2px 6px;
	white-space: nowrap;
}

.input-help__result {
	font-size: 0.9em;
}

.input-help__quantity {
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	white-space: nowrap;
	padding-right: 8px;
}

/* A ticked example is drawn the way a checked-off item is in the list. */
.input-help__result--checked .input-help__name {
	text-decoration: line-through;
	color: var(--color-text-maxcontrast);
}

.input-help__checked {
	color: var(--color-text-maxcontrast);
	font-size: 0.8em;
	white-space: nowrap;
	padding-left: 6px;
}
</style>
