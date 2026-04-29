<template>
	<div class="public-list">
		<h2>{{ title }}</h2>

		<div class="public-list__card">
			<div v-if="canEdit" class="public-list__editor">
				<span class="public-list__editor-plus">+</span>
				<input
					ref="editorRef"
					v-model="newItemName"
					type="text"
					enterkeyhint="send"
					:placeholder="addItemText"
					class="public-list__editor-input"
					@keydown.enter.prevent="onAddItem" />
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
					<div v-if="group.areaName"
						class="public-list__area-header"
						:style="group.areaColor ? { borderLeftColor: group.areaColor } : {}">
						<span class="public-list__area-name">{{ group.areaName }}</span>
						<span class="public-list__area-count">{{ group.items.length }}</span>
					</div>
					<div v-else-if="areaGroups.length > 1" class="public-list__area-header">
						<span class="public-list__area-name public-list__area-name--muted">{{ uncategorizedText }}</span>
						<span class="public-list__area-count">{{ group.items.length }}</span>
					</div>

					<div class="public-list__items">
						<div
							v-for="item in group.items"
							:key="item.id"
							class="public-list__item"
							:class="{ 'public-list__item--checked': item.checked }">
							<label class="public-list__check">
								<input
									type="checkbox"
									:checked="item.checked"
									:disabled="!canEdit"
									@change="onToggleCheck(item)" />
							</label>
							<span v-if="item.quantity" class="public-list__quantity">
								{{ item.quantity }}{{ item.unit ? ' ' + item.unit : '' }}
							</span>
							<span class="public-list__name" :class="{ 'public-list__name--checked': item.checked }">
								{{ item.name }}
							</span>
							<span v-if="getAreaName(item.shopAreaId)" class="public-list__area">
								<span
									v-if="getAreaColor(item.shopAreaId)"
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
				<div
					v-for="item in checkedItems"
					:key="item.id"
					class="public-list__item public-list__item--checked">
					<label class="public-list__check">
						<input
							type="checkbox"
							:checked="true"
							:disabled="!canEdit"
							@change="onToggleCheck(item)" />
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
import { NcLoadingIcon } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { publicApi } from '../composables/useApi'
import type { Item, ShopArea } from '../types'
import { Permission } from '../types'

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
}

.public-list__card {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
}

.public-list__editor {
	display: flex;
	align-items: center;
	height: 42px;
	gap: 8px;
	background: var(--color-background-dark);
	border-bottom: 1px solid var(--color-border);
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
	color: var(--color-main-text);
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

.public-list__area-header {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 16px;
	border-left: 3px solid var(--color-border-dark);
	background-color: var(--color-background-dark);
}

.public-list__area-name {
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
	color: var(--color-text-maxcontrast);
	font-size: 0.75em;
	opacity: 0.7;
}

.public-list__items {
	display: flex;
	flex-direction: column;
}

.public-list__item {
	display: flex;
	align-items: center;
	min-height: 44px;
	padding: 0 12px;
	border-bottom: 1px solid var(--color-border);
	gap: 0;
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
	word-break: break-word;
}

.public-list__name--checked {
	text-decoration: line-through;
	color: var(--color-text-maxcontrast);
}

.public-list__area {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	flex: 0 0 auto;
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
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
	overflow: hidden;
	opacity: 0.65;
}
</style>
