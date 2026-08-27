<template>
	<div class="import-export-dialog__overlay" @mousedown.self="$emit('close')">
		<div class="import-export-dialog">
			<div class="import-export-dialog__header">
				<h3>{{ titleText }}</h3>
				<button class="import-export-dialog__close" @click="$emit('close')">✕</button>
			</div>

			<div class="import-export-dialog__tabs">
				<button
					class="import-export-dialog__tab"
					:class="{ 'import-export-dialog__tab--active': activeTab === 'export' }"
					@click="activeTab = 'export'">
					{{ exportTabText }}
				</button>
				<button
					class="import-export-dialog__tab"
					:class="{ 'import-export-dialog__tab--active': activeTab === 'import' }"
					@click="activeTab = 'import'">
					{{ importTabText }}
				</button>
			</div>

			<!-- Export tab -->
			<div v-if="activeTab === 'export'" class="import-export-dialog__body">
				<p class="import-export-dialog__hint">{{ exportHintText }}</p>
				<textarea
					ref="exportRef"
					class="import-export-dialog__textarea"
					readonly
					:value="exportText" />
				<div class="import-export-dialog__actions">
					<button class="import-export-dialog__btn" @click="onCopy">
						{{ copyText }}
					</button>
				</div>
			</div>

			<!-- Import tab -->
			<div v-if="activeTab === 'import'" class="import-export-dialog__body">
				<p class="import-export-dialog__hint">{{ importHintText }}</p>
				<textarea
					v-model="importText"
					class="import-export-dialog__textarea"
					:placeholder="importPlaceholder" />
				<div class="import-export-dialog__actions">
					<button class="import-export-dialog__btn import-export-dialog__btn--primary" @click="onImport">
						{{ doImportText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { useItemsStore } from '../stores/items'

const props = defineProps<{
	listId: number
}>()

const emit = defineEmits<{
	(e: 'close'): void
}>()

const itemsStore = useItemsStore()

const activeTab = ref<'export' | 'import'>('export')
const importText = ref('')
const exportRef = ref<HTMLTextAreaElement | null>(null)

// Translations
const titleText = t('shopping_list', 'Import / Export')
const exportTabText = t('shopping_list', 'Export')
const importTabText = t('shopping_list', 'Import')
const exportHintText = t('shopping_list', 'Copy the list below to share or back it up.')
const importHintText = t('shopping_list', 'Paste your list here. Each line becomes one item.')
const importPlaceholder = '[ ] 3, Apples\n[ ] Milk\n- Bananas\nKnusperstangen'
const copyText = t('shopping_list', 'Copy to clipboard')
const doImportText = t('shopping_list', 'Import items')

// --- Export ---

const exportText = computed(() => {
	const allItems = itemsStore.itemsByList[props.listId] ?? []
	return allItems.map(item => {
		const check = item.checked ? '[x]' : '[ ]'
		const qty = item.quantity && item.quantity !== '1' ? item.quantity + ', ' : ''
		return `${check} ${qty}${item.name}`
	}).join('\n')
})

async function onCopy() {
	try {
		await navigator.clipboard.writeText(exportText.value)
		showSuccess(t('shopping_list', 'Copied to clipboard'))
	} catch {
		// Fallback: select text in textarea
		exportRef.value?.select()
		const ok = document.execCommand('copy')
		if (ok) {
			showSuccess(t('shopping_list', 'Copied to clipboard'))
		} else {
			showError(t('shopping_list', 'Failed to copy — please select and copy manually'))
		}
	}
}

// --- Import ---

interface ParsedLine {
	name: string
	quantity: string
	checked: boolean
}

/**
 * Parse a single line using the formats described in the issue:
 *
 * Supported formats:
 *   [ ] qty, Name        unchecked with quantity
 *   [x] qty, Name        checked with quantity
 *   [ 1 ] Name           amount in brackets
 *   [ 10 ] Aepfel        amount in brackets
 *   - Name               bullet list
 *   * Name               bullet list
 *   • Name               bullet list
 *   Name                 plain name
 *
 * Amount defaults to 1 if not provided.
 */
function parseLine(line: string): ParsedLine | null {
	const trimmed = line.trim()
	if (!trimmed) return null

	let checked = false
	let rest = trimmed
	let quantity = '1'

	// Format: [x] or [ ] or [X] — checked/unchecked prefix
	const checkboxMatch = rest.match(/^\[\s*(x|X|\s*)\s*\](.*)$/)
	if (checkboxMatch) {
		checked = checkboxMatch[1].trim().toLowerCase() === 'x'
		rest = checkboxMatch[2].trim()
	}

	// Format: [ number ] at the start (e.g. "[ 1 ] Apples" or "[ 10 ] Aepfel")
	// This applies when there was no checkbox prefix already matched
	if (!checkboxMatch) {
		const bracketQtyMatch = rest.match(/^\[\s*(\d+(?:[.,]\d+)?)\s*\](.*)$/)
		if (bracketQtyMatch) {
			quantity = bracketQtyMatch[1].replace(',', '.')
			rest = bracketQtyMatch[2].trim()
		}
	}

	// After checkbox or bracket-qty, optional "number," or "number " before the name
	// e.g. "[x] 10, Aepfel"  or  "[x] 10,Aepfel"  or  "[ ] Apfelschorle"
	const qtyAfterCheckbox = rest.match(/^(\d+(?:[.,]\d+)?)(?:\s*,\s*|\s+)(.+)$/)
	if (qtyAfterCheckbox) {
		quantity = qtyAfterCheckbox[1].replace(',', '.')
		rest = qtyAfterCheckbox[2].trim()
	} else {
		// No explicit quantity after bracket — rest is the full name
		// Remove leading "," or number-only that stands alone
		rest = rest.replace(/^,\s*/, '').trim()
	}

	// Remove bullet list markers
	rest = rest.replace(/^[-*•]\s*/, '').trim()

	if (!rest) return null

	// Capitalize first letter
	const name = rest.charAt(0).toUpperCase() + rest.slice(1)

	return { name, quantity, checked }
}

async function onImport() {
	const lines = importText.value.split(/\r?\n/)
	const parsed: ParsedLine[] = []
	for (const line of lines) {
		const p = parseLine(line)
		if (p) parsed.push(p)
	}

	if (parsed.length === 0) {
		showError(t('shopping_list', 'No items found to import'))
		return
	}

	for (const item of parsed) {
		// Snapshot known IDs before creation so we can identify the new item
		const knownIds = new Set((itemsStore.itemsByList[props.listId] ?? []).map(i => i.id))

		await itemsStore.create(props.listId, {
			name: item.name,
			quantity: item.quantity,
		})

		// If the item should be checked, find the newly created item (not in knownIds) and toggle it
		if (item.checked) {
			const allItems = itemsStore.itemsByList[props.listId] ?? []
			const created = allItems.find(i => !knownIds.has(i.id) && i.name === item.name)
			if (created) {
				await itemsStore.toggleCheck(props.listId, created.id)
			}
		}
	}

	showSuccess(t('shopping_list', '{count} items imported', { count: parsed.length }))
	importText.value = ''
	emit('close')
}
</script>

<style scoped>
.import-export-dialog__overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.import-export-dialog {
	background: var(--color-main-background);
	border-radius: var(--border-radius-large);
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
	width: min(560px, 96vw);
	max-height: 90vh;
	display: flex;
	flex-direction: column;
}

.import-export-dialog__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 20px 0;
}

.import-export-dialog__header h3 {
	margin: 0;
	font-size: 1.1em;
	font-weight: 600;
}

.import-export-dialog__close {
	background: none;
	border: none;
	font-size: 1em;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	padding: 4px 8px;
	border-radius: var(--border-radius);
}

.import-export-dialog__close:hover {
	background: var(--color-background-hover);
	color: var(--color-main-text);
}

.import-export-dialog__tabs {
	display: flex;
	gap: 4px;
	padding: 12px 20px 0;
	border-bottom: 1px solid var(--color-border);
}

.import-export-dialog__tab {
	background: none;
	border: none;
	border-bottom: 2px solid transparent;
	padding: 6px 12px;
	font-size: 0.9em;
	cursor: pointer;
	color: var(--color-text-maxcontrast);
	margin-bottom: -1px;
}

.import-export-dialog__tab--active {
	color: var(--color-main-text);
	border-bottom-color: var(--color-primary-element);
	font-weight: 600;
}

.import-export-dialog__body {
	padding: 16px 20px 20px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow-y: auto;
}

.import-export-dialog__hint {
	margin: 0;
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
}

.import-export-dialog__textarea {
	width: 100%;
	min-height: 240px;
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);
	background: var(--color-background-dark);
	color: var(--color-main-text);
	font-family: monospace;
	font-size: 0.85em;
	padding: 10px;
	resize: vertical;
	box-sizing: border-box;
}

.import-export-dialog__actions {
	display: flex;
	justify-content: flex-end;
}

.import-export-dialog__btn {
	background: none;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius-large);
	color: var(--color-main-text);
	padding: 8px 18px;
	font-size: 0.9em;
	cursor: pointer;
}

.import-export-dialog__btn:hover {
	background: var(--color-background-hover);
}

.import-export-dialog__btn--primary {
	background: var(--color-primary-element);
	border-color: var(--color-primary-element);
	color: var(--color-primary-element-text);
}

.import-export-dialog__btn--primary:hover {
	background: var(--color-primary-element-hover);
	border-color: var(--color-primary-element-hover);
}
</style>
