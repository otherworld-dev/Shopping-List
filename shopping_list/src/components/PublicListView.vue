<template>
	<div class="public-list">
		<h2>{{ title }}</h2>

		<div class="public-list__card">
			<div v-if="canEdit" class="public-list__editor">
				<span class="public-list__editor-plus">+</span>
				<input ref="editorRef"
					v-model="newItemName"
					type="text"
					enterkeyhint="send"
					:placeholder="addItemText"
					class="public-list__editor-input"
					@keydown.enter.prevent="onAddItem">
			</div>

			<div v-if="loading" class="public-list__loading">
				<NcLoadingIcon />
			</div>

			<template v-else>
				<div v-if="uncheckedItems.length === 0 && checkedItems.length === 0"
					class="public-list__empty">
					{{ emptyText }}
				</div>

				<div v-for="group in areaGroups" :key="group.areaId ?? 'none'" class="public-list__area-group">
					<button v-if="hasHeader(group)"
						type="button"
						class="public-list__area-header"
						:style="group.areaColor ? { borderLeftColor: group.areaColor } : {}"
						:aria-expanded="!isGroupCollapsed(group)"
						:aria-controls="groupElementId(group)"
						@click="toggleArea(group.areaId)">
						<NcIconSvgWrapper :path="mdiChevronDown"
							:size="18"
							class="public-list__area-chevron"
							:class="{ 'public-list__area-chevron--collapsed': isGroupCollapsed(group) }" />
						<span class="public-list__area-name" :class="{ 'public-list__area-name--muted': !group.areaName }">
							{{ group.areaName || uncategorizedText }}
						</span>
						<span class="public-list__area-count">{{ group.items.length }}</span>
					</button>

					<div v-show="!isGroupCollapsed(group)"
						:id="groupElementId(group)"
						class="public-list__items">
						<div v-for="item in group.items"
							:key="item.id"
							class="public-list__item"
							:class="{ 'public-list__item--checked': item.checked }">
							<label class="public-list__check">
								<input type="checkbox"
									:checked="item.checked"
									:disabled="!canEdit"
									@change="onToggleCheck(item)">
							</label>
							<span v-if="item.quantity" class="public-list__quantity">
								{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
							</span>
							<span class="public-list__name" :class="{ 'public-list__name--checked': item.checked }">
								{{ item.name }}
							</span>
							<span v-if="getAreaName(item.shopAreaId)" class="public-list__area">
								<span v-if="getAreaColor(item.shopAreaId)"
									class="public-list__area-dot"
									:style="{ backgroundColor: getAreaColor(item.shopAreaId)! }" />
								{{ getAreaName(item.shopAreaId) }}
							</span>
						</div>
					</div>
				</div>
			</template>
		</div>

		<div v-if="!loading && checkedItems.length > 0" class="public-list__bought">
			<h3 @click="showChecked = !showChecked">
				{{ boughtText }} ({{ checkedItems.length }})
				<span class="public-list__toggle">{{ showChecked ? '▾' : '▸' }}</span>
			</h3>
			<div v-if="showChecked" class="public-list__bought-card">
				<div v-for="item in checkedItems"
					:key="item.id"
					class="public-list__item public-list__item--checked">
					<label class="public-list__check">
						<input type="checkbox"
							:checked="true"
							:disabled="!canEdit"
							@change="onToggleCheck(item)">
					</label>
					<span v-if="item.quantity" class="public-list__quantity">
						{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
					</span>
					<span class="public-list__name public-list__name--checked">{{ item.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NcIconSvgWrapper, NcLoadingIcon } from '@nextcloud/vue'
import { mdiChevronDown } from '@mdi/js'
import { t } from '@nextcloud/l10n'
import { publicApi } from '../composables/useApi'
import type { Item, ShopArea } from '../types'
import { Permission } from '../types'
import { useCollapsedAreas } from '../composables/useCollapsedAreas'

const props = defineProps<{
	token: string
	title: string
	permission: number
}>()

const items = ref<Item[]>([])
const areas = ref<ShopArea[]>([])
const loading = ref(true)
const showChecked = ref(true)

const emptyText = t('shopping_list', 'No items yet')
const uncategorizedText = t('shopping_list', 'Uncategorized')
const boughtText = t('shopping_list', 'Checked off')
const addItemText = t('shopping_list', 'Add an item to list...')

const editorRef = ref<HTMLInputElement | null>(null)
const newItemName = ref('')

const canEdit = computed(() => props.permission >= Permission.WRITE)

const uncheckedItems = computed(() => items.value.filter(i => !i.checked))
const checkedItems = computed(() => items.value.filter(i => i.checked))

interface AreaGroup {
	areaId: number | null
	areaName: string | null
	areaColor: string | null
	items: Item[]
}

const areaGroups = computed((): AreaGroup[] => {
	const unchecked = uncheckedItems.value
	if (unchecked.length === 0) return []

	const grouped = new Map<number | null, Item[]>()
	for (const item of unchecked) {
		const key = item.shopAreaId
		if (!grouped.has(key)) grouped.set(key, [])
		grouped.get(key)!.push(item)
	}

	const result: AreaGroup[] = []
	for (const area of areas.value) {
		const areaItems = grouped.get(area.id)
		if (areaItems && areaItems.length > 0) {
			result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, items: areaItems })
			grouped.delete(area.id)
		}
	}

	const uncategorized: Item[] = []
	for (const [, groupItems] of grouped) {
		uncategorized.push(...groupItems)
	}
	if (uncategorized.length > 0) {
		result.push({ areaId: null, areaName: null, areaColor: null, items: uncategorized })
	}

	return result
})

// Keyed by list id, the same as the logged-in view, so opening your own
// share link in the same browser shows the areas folded the same way. The id
// is only known once the areas or items have loaded; before that there are
// no headers to click anyway.
const { isCollapsed, toggle: toggleArea } = useCollapsedAreas(
	() => areas.value[0]?.listId ?? items.value[0]?.listId ?? null,
)

// A lone "Uncategorized" group gets no header, so it has nothing to click
// and must never be hidden, even if it was collapsed earlier.
function hasHeader(group: AreaGroup): boolean {
	return !!group.areaName || areaGroups.value.length > 1
}

function isGroupCollapsed(group: AreaGroup): boolean {
	return hasHeader(group) && isCollapsed(group.areaId)
}

function groupElementId(group: AreaGroup): string {
	return `public-list-area-${group.areaId ?? 'none'}`
}

function getAreaName(areaId: number | null): string | null {
	if (areaId === null) return null
	return areas.value.find(a => a.id === areaId)?.name ?? null
}

function getAreaColor(areaId: number | null): string | null {
	if (areaId === null) return null
	return areas.value.find(a => a.id === areaId)?.color ?? null
}

onMounted(async () => {
	try {
		const [itemsRes, areasRes] = await Promise.all([
			publicApi.getItems(props.token),
			publicApi.getAreas(props.token),
		])
		items.value = itemsRes.data.ocs.data
		areas.value = areasRes.data.ocs.data
	} catch (e) {
		console.error('Failed to load public list', e)
	} finally {
		loading.value = false
	}
})

async function onAddItem() {
	const name = newItemName.value.trim()
	if (!name) return

	newItemName.value = ''
	try {
		const response = await publicApi.createItem(props.token, { name, quantity: '1' })
		items.value.push(response.data.ocs.data)
	} catch (e) {
		console.error('Failed to add item', e)
	}
	editorRef.value?.focus()
}

async function onToggleCheck(item: Item) {
	const newChecked = !item.checked
	item.checked = newChecked // optimistic
	try {
		await publicApi.checkItem(props.token, item.id, newChecked)
	} catch {
		item.checked = !newChecked // revert
	}
}
</script>

<style scoped>
.public-list h2 {
	margin: 0 0 16px;
	font-size: 1.5em;
	font-weight: 700;
	color: var(--color-main-text, #fff);
}

.public-list__card {
	border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
	border-radius: var(--border-radius-large, 10px);
	background-color: var(--color-main-background, rgba(0, 0, 0, 0.35));
	backdrop-filter: blur(10px);
	overflow: hidden;
}

.public-list__editor {
	display: flex;
	align-items: center;
	height: 42px;
	gap: 8px;
	background: var(--color-background-dark, rgba(0, 0, 0, 0.2));
	border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
	padding: 0 4px 0 0;
}

.public-list__editor-plus {
	flex: 0 0 auto;
	font-size: 1.2em;
	color: var(--color-primary-element);
	padding: 0 8px 0 12px;
	user-select: none;
	font-weight: 700;
}

.public-list__editor-input {
	flex: 1 1 0%;
	min-width: 0;
	height: 100%;
	border: none;
	background: transparent;
	color: var(--color-main-text, #fff);
	font-size: 0.95em;
	outline: none;
	padding: 0;
}

.public-list__editor-input::placeholder {
	color: var(--color-text-maxcontrast);
	font-style: italic;
}

.public-list__loading {
	display: flex;
	justify-content: center;
	padding: 40px;
}

.public-list__empty {
	padding: 40px;
	text-align: center;
	color: var(--color-text-maxcontrast);
}

.public-list__area-group {
	border-top: 1px solid var(--color-border);
}

/* A native button, so it is keyboard reachable and announces its state.
   Nextcloud styles every button globally, and its :hover, :focus and :active
   rules are specific enough to beat a single class: they would paint the
   left border near-black and flash the background white on press. The card
   and group classes in front keep these rules ahead without !important. */
.public-list__card .public-list__area-group > button.public-list__area-header {
	display: flex;
	align-items: center;
	gap: 6px;
	width: 100%;
	min-width: 0;
	min-height: 0;
	margin: 0;
	padding: 6px 16px 6px 10px;
	border: none;
	border-left: 3px solid var(--color-border-dark, rgba(255, 255, 255, 0.2));
	border-radius: 0;
	background-color: var(--color-background-dark, rgba(0, 0, 0, 0.2));
	color: inherit;
	font: inherit;
	text-align: start;
	cursor: pointer;
}

.public-list__card .public-list__area-group > button.public-list__area-header:is(:hover, :focus, :active) {
	border-left-color: var(--color-border-dark, rgba(255, 255, 255, 0.2));
	color: inherit;
}

.public-list__card .public-list__area-group > button.public-list__area-header:is(:hover, :active) {
	background-color: var(--color-background-darker, rgba(0, 0, 0, 0.3));
}

.public-list__card .public-list__area-group > button.public-list__area-header:focus-visible {
	outline: 2px solid var(--color-main-text, #fff);
	outline-offset: -2px;
}

/* The icon wrapper is a 34px box by default, sized for a clickable icon on
   its own. Here it sits inside the header button, so it shrinks to the
   glyph. The header class in front outranks the wrapper's own rule. */
.public-list__area-header .public-list__area-chevron {
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	justify-content: center;
	width: 18px;
	height: 18px;
	min-width: 0;
	min-height: 0;
	color: var(--color-text-maxcontrast);
	transition: transform 0.15s ease;
}

.public-list__area-chevron--collapsed {
	transform: rotate(-90deg);
}

.public-list__area-chevron--collapsed:dir(rtl) {
	transform: rotate(90deg);
}

@media (prefers-reduced-motion: reduce) {
	.public-list__area-header .public-list__area-chevron {
		transition: none;
	}
}

.public-list__area-name {
	min-width: 0;
	overflow-wrap: anywhere;
	font-size: 0.8em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--color-text-maxcontrast);
}

.public-list__area-name--muted {
	font-weight: 500;
}

.public-list__area-count {
	flex: 0 0 auto;
	color: var(--color-text-maxcontrast);
	font-size: 0.75em;
	opacity: 0.7;
}

.public-list__items {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.public-list__item {
	display: flex;
	align-items: center;
	min-width: 0;
	min-height: 44px;
	padding: 0 12px;
	border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
	gap: 0;
	color: var(--color-main-text, #fff);
}

.public-list__item:last-child {
	border-bottom: none;
}

.public-list__check {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 0 10px 0 4px;
	cursor: pointer;
}

.public-list__check input[type="checkbox"] {
	width: 18px;
	height: 18px;
	cursor: pointer;
	accent-color: var(--color-primary-element);
	margin: 0;
}

.public-list__quantity {
	flex: 0 0 auto;
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	white-space: nowrap;
	padding-right: 8px;
}

.public-list__name {
	flex: 1 1 0%;
	min-width: 0;
	font-size: 0.95em;
	padding-right: 8px;
	overflow-wrap: anywhere;
}

.public-list__name--checked {
	text-decoration: line-through;
	color: var(--color-text-maxcontrast);
}

.public-list__area {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	flex: 0 1 auto;
	min-width: 0;
	max-width: 40%;
	overflow: hidden;
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	white-space: nowrap;
	padding: 0 8px;
}

.public-list__area-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	flex-shrink: 0;
}

.public-list__bought {
	margin-top: 20px;
}

.public-list__bought h3 {
	margin: 0 0 8px;
	font-size: 0.9em;
	color: var(--color-text-maxcontrast);
	font-weight: 500;
	cursor: pointer;
	user-select: none;
}

.public-list__toggle {
	margin-left: 4px;
}

.public-list__bought-card {
	border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
	border-radius: var(--border-radius-large, 10px);
	background-color: var(--color-main-background, rgba(0, 0, 0, 0.35));
	backdrop-filter: blur(10px);
	overflow: hidden;
	opacity: 0.65;
}
</style>
