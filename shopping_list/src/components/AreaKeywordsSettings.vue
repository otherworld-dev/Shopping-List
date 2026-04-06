<template>
	<div class="area-settings">
		<div class="area-settings__header">
			<button class="area-settings__back" @click="$emit('back')">
				← {{ backText }}
			</button>
			<h2>{{ title }}</h2>
			<p class="area-settings__desc">{{ description }}</p>
		</div>

		<div class="area-settings__search">
			<input
				v-model="search"
				type="text"
				:placeholder="searchPlaceholder"
				class="area-settings__search-input" />
		</div>

		<div v-for="areaName in areaNames" :key="areaName" class="area-settings__section">
			<div class="area-settings__section-header" @click="toggleSection(areaName)">
				<span class="area-settings__section-toggle">{{ openSections[areaName] ? '▾' : '▸' }}</span>
				<span class="area-settings__section-name">{{ areaName }}</span>
				<span class="area-settings__section-count">{{ filteredKeywords(areaName).length }}</span>
			</div>

			<div v-if="openSections[areaName]" class="area-settings__section-body">
				<div class="area-settings__add">
					<input
						v-model="newKeyword[areaName]"
						type="text"
						:placeholder="addPlaceholder"
						class="area-settings__add-input"
						@keydown.enter.prevent="onAddKeyword(areaName)" />
					<button
						class="area-settings__add-btn"
						:disabled="!newKeyword[areaName]?.trim()"
						@click="onAddKeyword(areaName)">
						+
					</button>
				</div>
				<div class="area-settings__keywords">
					<span
						v-for="word in filteredKeywords(areaName)"
						:key="word"
						class="area-settings__keyword">
						{{ word }}
						<button class="area-settings__keyword-remove" @click="onRemoveKeyword(areaName, word)">✕</button>
					</span>
					<span v-if="filteredKeywords(areaName).length === 0" class="area-settings__empty">
						{{ noKeywordsText }}
					</span>
				</div>
			</div>
		</div>

		<div class="area-settings__footer">
			<button class="area-settings__reset" @click="onReset">
				{{ resetText }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { useAreaKeywordsStore } from '../stores/areaKeywords'
import { useShopAreasStore } from '../stores/shopAreas'
import { useListsStore } from '../stores/lists'

const areaKeywordsStore = useAreaKeywordsStore()
const shopAreasStore = useShopAreasStore()
const listsStore = useListsStore()

defineEmits<{ back: [] }>()

const backText = t('shopping_list', 'Back to lists')
const title = t('shopping_list', 'Area Keywords')
const description = t('shopping_list', 'Keywords are used to auto-detect which shop area an item belongs to when added or pasted.')
const searchPlaceholder = t('shopping_list', 'Search keywords...')
const addPlaceholder = t('shopping_list', 'Add keyword...')
const noKeywordsText = t('shopping_list', 'No keywords')
const resetText = t('shopping_list', 'Reset to defaults')

const search = ref('')
const newKeyword = ref<Record<string, string>>({})
const openSections = ref<Record<string, boolean>>({})

const areaNames = computed(() => {
	if (!listsStore.currentListId) return Object.keys(areaKeywordsStore.keywords)
	const areas = shopAreasStore.areasByList[listsStore.currentListId] ?? []
	const names = areas.map(a => a.name)
	// Include any keyword areas not in the store (custom)
	for (const name of Object.keys(areaKeywordsStore.keywords)) {
		if (!names.includes(name)) names.push(name)
	}
	return names
})

function filteredKeywords(areaName: string): string[] {
	const words = areaKeywordsStore.getKeywords(areaName)
	const q = search.value.toLowerCase().trim()
	if (!q) return words.sort()
	return words.filter(w => w.includes(q)).sort()
}

function toggleSection(areaName: string) {
	openSections.value[areaName] = !openSections.value[areaName]
}

function onAddKeyword(areaName: string) {
	const word = newKeyword.value[areaName]?.trim()
	if (!word) return
	areaKeywordsStore.addKeyword(areaName, word)
	newKeyword.value[areaName] = ''
}

function onRemoveKeyword(areaName: string, word: string) {
	areaKeywordsStore.removeKeyword(areaName, word)
}

function onReset() {
	areaKeywordsStore.resetToDefaults()
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

.area-settings__section {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	margin-bottom: 8px;
	overflow: hidden;
}

.area-settings__section-header {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 14px;
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
}

.area-settings__section-name {
	font-weight: 600;
	font-size: 0.9em;
	flex: 1;
}

.area-settings__section-count {
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
}

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

.area-settings__footer {
	margin-top: 20px;
	padding-top: 16px;
	border-top: 1px solid var(--color-border);
}

.area-settings__reset {
	padding: 8px 16px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius-large);
	background: transparent;
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
	cursor: pointer;
}

.area-settings__reset:hover {
	background: var(--color-error);
	color: #fff;
	border-color: var(--color-error);
}
</style>
