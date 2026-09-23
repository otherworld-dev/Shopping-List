<template>
	<div class="list-view">
		<div class="list-view__header">
			<h2>{{ listsStore.currentList?.title }}</h2>
			<div class="list-view__actions">
				<div v-if="currentShares.length > 0"
					class="list-view__avatars"
					@click="showShareDialog = true">
					<NcAvatar v-for="share in visibleShares"
						:key="share.id"
						:user="share.sharedWithType === ShareType.USER ? share.sharedWith : undefined"
						:display-name="share.sharedWithDisplayName || share.sharedWith"
						:is-no-user="share.sharedWithType === ShareType.GROUP"
						:size="28"
						:show-user-status="false"
						class="list-view__avatar" />
					<span v-if="overflowCount > 0" class="list-view__avatar-overflow">
						+{{ overflowCount }}
					</span>
				</div>
				<NcActions :aria-label="listActionsText">
					<NcActionButton v-if="listsStore.currentList?.isOwner"
						@click="showShareDialog = true">
						{{ shareText }}
					</NcActionButton>
					<NcActionButton :disabled="itemsStore.uncheckedItems.length === 0"
						@click="onCopyAsText">
						{{ copyAsTextText }}
					</NcActionButton>
					<NcActionSeparator />
					<NcActionCaption :name="sortItemsText" />
					<NcActionRadio v-for="option in openSortOptions"
						:key="option.value"
						v-model="openSort"
						name="shopping-list-open-sort"
						:value="option.value">
						{{ option.label }}
					</NcActionRadio>
					<NcActionSeparator />
					<NcActionCaption :name="sortCheckedText" />
					<NcActionRadio v-for="option in boughtSortOptions"
						:key="option.value"
						v-model="boughtSort"
						name="shopping-list-bought-sort"
						:value="option.value">
						{{ option.label }}
					</NcActionRadio>
				</NcActions>
			</div>
		</div>

		<div class="list-view__card">
			<ItemEditor v-if="canEdit"
				:list-id="listsStore.currentList!.id" />

			<div v-if="itemsStore.loading" class="list-view__loading">
				<NcLoadingIcon />
			</div>

			<template v-else>
				<div v-if="itemsStore.uncheckedItems.length === 0 && itemsStore.checkedItems.length === 0"
					class="list-view__empty">
					<NcEmptyContent :name="emptyName"
						:description="emptyDesc">
						<template #icon>
							<NcIconSvgWrapper :svg="cartIcon" />
						</template>
					</NcEmptyContent>
				</div>

				<!-- Items grouped by shop area -->
				<div v-for="(group, groupIndex) in localGroups" :key="group.areaId ?? 'none'" class="list-view__area-group">
					<button v-if="hasHeader(group)"
						type="button"
						class="list-view__area-header"
						:style="group.areaColor ? { borderInlineStartColor: group.areaColor } : {}"
						:aria-expanded="!isGroupCollapsed(group)"
						:aria-controls="groupElementId(group)"
						@click="toggleArea(group.areaId)">
						<NcIconSvgWrapper :path="mdiChevronDown"
							:size="18"
							class="list-view__area-chevron"
							:class="{ 'list-view__area-chevron--collapsed': isGroupCollapsed(group) }" />
						<span class="list-view__area-name" :class="{ 'list-view__area-name--muted': !group.areaName }">
							{{ group.areaName || uncategorizedText }}
						</span>
						<span class="list-view__area-count">{{ group.items.length }}</span>
					</button>

					<draggable v-show="!isGroupCollapsed(group)"
						:id="groupElementId(group)"
						v-model="localGroups[groupIndex].items"
						item-key="id"
						:group="{ name: 'items' }"
						:disabled="!canDrag"
						:animation="150"
						:delay="150"
						:delay-on-touch-only="true"
						class="list-view__items"
						ghost-class="list-view__item--ghost"
						@start="isDragging = true"
						@end="onDragEnd">
						<template #item="{ element }">
							<ItemRow :item-id="element.id"
								:list-id="listsStore.currentList!.id"
								:can-edit="canEdit"
								:editing="editingItemId === element.id"
								@close-edit="editingItemId = null" />
						</template>
					</draggable>
				</div>
			</template>
		</div>

		<div v-if="!itemsStore.loading && itemsStore.checkedItems.length > 0" class="list-view__bought">
			<div class="list-view__bought-header">
				<h3 @click="showChecked = !showChecked">
					{{ boughtText }} ({{ itemsStore.checkedItems.length }})
					<span class="list-view__toggle">{{ showChecked ? '▾' : '▸' }}</span>
				</h3>
				<div v-if="canEdit" class="list-view__bought-actions">
					<button class="list-view__action-btn" @click="onUncheckAll">
						{{ uncheckAllText }}
					</button>
					<button class="list-view__action-btn list-view__action-btn--danger" @click="onClearChecked">
						{{ clearCheckedText }}
					</button>
				</div>
			</div>
			<div v-if="showChecked" class="list-view__bought-card">
				<ItemRow v-for="itemId in checkedItemIds"
					:key="itemId"
					:item-id="itemId"
					:list-id="listsStore.currentList!.id"
					:can-edit="canEdit"
					:editing="false" />
			</div>
		</div>

		<ShareDialog v-if="showShareDialog && listsStore.currentList"
			:list-id="listsStore.currentList.id"
			:is-owner="listsStore.currentList.isOwner"
			:current-user-id="currentUserId"
			@close="showShareDialog = false" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, watch, onMounted, onUnmounted } from 'vue'
import {
	NcActionButton,
	NcActionCaption,
	NcActionRadio,
	NcActions,
	NcActionSeparator,
	NcAvatar,
	NcEmptyContent,
	NcIconSvgWrapper,
	NcLoadingIcon,
} from '@nextcloud/vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { getLanguage, t } from '@nextcloud/l10n'
import { getCurrentUser } from '@nextcloud/auth'
import { mdiChevronDown } from '@mdi/js'
import { useListsStore } from '../stores/lists'
import { useItemsStore } from '../stores/items'
import { useShopAreasStore } from '../stores/shopAreas'
import { Permission, ShareType } from '../types'
import { useSharesStore } from '../stores/shares'
import draggable from 'vuedraggable'
import ItemRow from './ItemRow.vue'
import ItemEditor from './ItemEditor.vue'
import ShareDialog from './ShareDialog.vue'
import { formatListAsText } from '../utils/listText'
import { browserStorage } from '../utils/browserStorage'
import {
	groupOpenItems,
	loadBoughtSort,
	loadOpenSort,
	saveBoughtSort,
	saveOpenSort,
	sortBought,
} from '../utils/itemSort'
import type { AreaGroup, BoughtSort, OpenSort } from '../utils/itemSort'
import { useCollapsedAreas } from '../composables/useCollapsedAreas'
import { useImagePreference } from '../composables/useImagePreference'
import { isFileDrag } from '../utils/imageFiles'

const listsStore = useListsStore()
const itemsStore = useItemsStore()
const shopAreasStore = useShopAreasStore()
const sharesStore = useSharesStore()

const MAX_VISIBLE_AVATARS = 3

const currentShares = computed(() => {
	const listId = listsStore.currentListId
	return listId !== null ? (sharesStore.sharesByList[listId] ?? []) : []
})

const visibleShares = computed(() => currentShares.value.slice(0, MAX_VISIBLE_AVATARS))
const overflowCount = computed(() => Math.max(0, currentShares.value.length - MAX_VISIBLE_AVATARS))

const showChecked = ref(true)
const showShareDialog = ref(false)
const currentUserId = getCurrentUser()?.uid ?? ''
const editingItemId = ref<number | null>(null)

// Capture-phase click listener to bypass Nextcloud's click interception
// on non-interactive elements. Editable rows use a ::after overlay that
// makes them clickable; we detect which row was hit via data-item-id.
function onCaptureClick(e: MouseEvent) {
	const target = e.target as HTMLElement

	// Don't hijack clicks on the checkbox or the actions (⋮) kebab — let those
	// handle their own click so the menu can open instead of entering edit mode.
	if (target.closest('.item-row__check') || target.closest('.item-row__actions') || target.closest('.item-row__thumb')) return
	// "Add image" opens the picker by clicking the row's hidden file input,
	// which must not put the row into edit mode.
	if ((target as HTMLInputElement).type === 'checkbox' || (target as HTMLInputElement).type === 'file') return

	if (isDragging.value) return

	const row = target.closest('.item-row:not(.item-row--checked)') as HTMLElement | null
	if (row) {
		const idStr = row.getAttribute('data-item-id')
		if (idStr) {
			editingItemId.value = parseInt(idStr, 10)
			return
		}
	}

	if (editingItemId.value !== null && !target.closest('.item-row--editing')) {
		editingItemId.value = null
	}
}

onMounted(() => document.addEventListener('click', onCaptureClick, true))
onUnmounted(() => document.removeEventListener('click', onCaptureClick, true))

const { enabled: imagesEnabled } = useImagePreference()

// A file dropped anywhere but on a row that takes it would make the browser
// open the file and leave the app. Cancel the default for every file drag;
// a row that accepts one marks itself with item-row--drop-target on
// dragenter and sets the copy effect itself, everywhere else the cursor
// says no. Sortable's row drags never carry files, so they pass through.
function onDocumentDragOver(e: DragEvent) {
	if (!isFileDrag(e.dataTransfer)) return
	e.preventDefault()
	const accepting = (e.target as Element | null)?.closest?.('.item-row--drop-target')
	if (!accepting && e.dataTransfer) e.dataTransfer.dropEffect = 'none'
}

function onDocumentDrop(e: DragEvent) {
	if (isFileDrag(e.dataTransfer)) e.preventDefault()
}

function removeDropGuard() {
	document.removeEventListener('dragover', onDocumentDragOver)
	document.removeEventListener('drop', onDocumentDrop)
}

watch(imagesEnabled, (on) => {
	removeDropGuard()
	if (on) {
		document.addEventListener('dragover', onDocumentDragOver)
		document.addEventListener('drop', onDocumentDrop)
	}
}, { immediate: true })

onUnmounted(removeDropGuard)

// Pre-compute translations once
const shareText = t('shopping_list', 'Share')
const listActionsText = t('shopping_list', 'List actions')
const copyAsTextText = t('shopping_list', 'Copy list as text')
const copiedText = t('shopping_list', 'List copied to clipboard')
const copyFailedText = t('shopping_list', 'Could not copy the list')
const emptyName = t('shopping_list', 'No items yet')
const emptyDesc = t('shopping_list', 'Add your first item above')
const uncategorizedText = t('shopping_list', 'Uncategorized')
const boughtText = t('shopping_list', 'Checked off')
const uncheckAllText = t('shopping_list', 'Restore all')
const clearCheckedText = t('shopping_list', 'Delete all')
const sortItemsText = t('shopping_list', 'Sort items')
const sortCheckedText = t('shopping_list', 'Sort checked-off items')
const byAreaText = t('shopping_list', 'By area')
const aToZText = t('shopping_list', 'A to Z')

const openSortOptions: { value: OpenSort, label: string }[] = [
	{ value: 'area', label: byAreaText },
	{ value: 'areaAlpha', label: t('shopping_list', 'By area, A to Z') },
	{ value: 'alpha', label: aToZText },
]

const boughtSortOptions: { value: BoughtSort, label: string }[] = [
	{ value: 'area', label: byAreaText },
	{ value: 'alpha', label: aToZText },
	{ value: 'recent', label: t('shopping_list', 'Most recent first') },
]

// How the open and checked-off items are ordered. One choice each for all
// lists, kept in this browser only.
const storage = browserStorage()

function storedChoice<T>(initial: T, save: (value: T) => void) {
	const current = shallowRef(initial)
	return computed({
		get: () => current.value,
		set: (value: T) => {
			current.value = value
			save(value)
		},
	})
}

const openSort = storedChoice(loadOpenSort(storage), sort => saveOpenSort(storage, sort))
const boughtSort = storedChoice(loadBoughtSort(storage), sort => saveBoughtSort(storage, sort))

// Copies the outstanding items as plain text, in the format the add box
// accepts when pasted, so a list round trips into a chat message and back.
async function onCopyAsText() {
	const text = formatListAsText(itemsStore.uncheckedItems)
	if (!text) return

	try {
		await navigator.clipboard.writeText(text)
		showSuccess(copiedText)
		return
	} catch {
		// navigator.clipboard needs a secure context, which a self-hosted
		// instance served over plain http is not. Fall back to a detached
		// textarea, which still works there.
	}

	const ta = document.createElement('textarea')
	ta.value = text
	ta.setAttribute('readonly', '')
	ta.style.position = 'fixed'
	ta.style.opacity = '0'
	document.body.appendChild(ta)
	ta.select()
	const copied = document.execCommand('copy')
	document.body.removeChild(ta)

	if (copied) {
		showSuccess(copiedText)
	} else {
		showError(copyFailedText)
	}
}

const canEdit = computed(() =>
	listsStore.currentList !== null && listsStore.currentList.permission >= Permission.WRITE,
)

const isDragging = ref(false)

const { isCollapsed, toggle: toggleArea } = useCollapsedAreas(() => listsStore.currentListId)

// A lone "Uncategorized" group gets no header, so it has nothing to click
// and must never be hidden, even if it was collapsed back when other areas
// still had items.
function hasHeader(group: AreaGroup): boolean {
	return !!group.areaName || localGroups.value.length > 1
}

function isGroupCollapsed(group: AreaGroup): boolean {
	return hasHeader(group) && isCollapsed(group.areaId)
}

function groupElementId(group: AreaGroup): string {
	return `list-view-area-${group.areaId ?? 'none'}`
}

const language = getLanguage()

const currentAreas = computed(() =>
	listsStore.currentListId
		? (shopAreasStore.areasByList[listsStore.currentListId] ?? [])
		: [],
)

const areaGroups = computed((): AreaGroup[] =>
	groupOpenItems(itemsStore.uncheckedItems, currentAreas.value, openSort.value, language),
)

// Dragging sets the order and area by hand, which only means something when
// the list shows that order. In the A to Z modes the sort decides where an
// item goes, so a drop would just snap back.
const canDrag = computed(() => canEdit.value && openSort.value === 'area')

// Local mutable copy of groups for vuedraggable to manipulate
const localGroups = ref<AreaGroup[]>([])

watch(areaGroups, (groups) => {
	// Only sync from store when not mid-drag to avoid fighting vuedraggable
	if (!isDragging.value) {
		localGroups.value = groups.map(g => ({ ...g, items: [...g.items] }))
	}
}, { immediate: true })

async function onDragEnd() {
	isDragging.value = false
	const listId = listsStore.currentList?.id
	if (!listId) return

	// Collect all sorted IDs and detect area changes
	const allSortedIds: number[] = []
	const areaUpdates: Promise<unknown>[] = []

	for (const group of localGroups.value) {
		for (const item of group.items) {
			allSortedIds.push(item.id)
			if (item.shopAreaId !== group.areaId) {
				areaUpdates.push(itemsStore.update(listId, item.id, { shopAreaId: group.areaId, areaExplicit: true }))
			}
		}
	}

	await Promise.all([
		...areaUpdates,
		itemsStore.reorder(listId, allSortedIds),
	])
}

const checkedItemIds = computed(() =>
	sortBought(itemsStore.checkedItems, boughtSort.value, currentAreas.value, language).map(i => i.id),
)

const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>'

watch(() => listsStore.currentListId, async (newId) => {
	if (newId !== null) {
		await Promise.all([
			itemsStore.fetchByList(newId),
			shopAreasStore.fetchByList(newId),
			sharesStore.fetchByList(newId),
		])
	}
}, { immediate: true })

async function onClearChecked() {
	if (listsStore.currentListId) {
		await itemsStore.clearChecked(listsStore.currentListId)
	}
}

async function onUncheckAll() {
	if (listsStore.currentListId) {
		await itemsStore.uncheckAll(listsStore.currentListId)
	}
}
</script>

<style scoped>
.list-view {
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
}

.list-view__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
}

.list-view__header h2 {
	margin: 0;
	font-size: 1.5em;
	font-weight: 700;
}

.list-view__actions {
	display: flex;
	gap: 4px;
}

.list-view__card {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
}

.list-view__loading {
	display: flex;
	justify-content: center;
	padding: 40px;
}

.list-view__empty {
	padding: 24px 12px;
}

.list-view__area-group {
	border-top: 1px solid var(--color-border);
}

/* A native button, so it is keyboard reachable and announces its state.
   Nextcloud styles every button globally, and its :hover, :focus and :active
   rules are specific enough to beat a single class: they would paint the
   left border near-black and flash the background white on press. The card
   and group classes in front keep these rules ahead without !important. */
.list-view__card .list-view__area-group > button.list-view__area-header {
	display: flex;
	align-items: center;
	gap: 6px;
	width: 100%;
	min-width: 0;
	min-height: 0;
	margin: 0;
	padding-block: 6px;
	padding-inline: 10px 16px;
	border: none;
	border-inline-start: 3px solid var(--color-border-dark);
	border-radius: 0;
	background-color: var(--color-background-dark);
	color: inherit;
	font: inherit;
	text-align: start;
	cursor: pointer;
}

.list-view__card .list-view__area-group > button.list-view__area-header:is(:hover, :focus, :active) {
	border-inline-start-color: var(--color-border-dark);
	color: inherit;
}

.list-view__card .list-view__area-group > button.list-view__area-header:is(:hover, :active) {
	background-color: var(--color-background-darker);
}

.list-view__card .list-view__area-group > button.list-view__area-header:focus-visible {
	outline: 2px solid var(--color-main-text);
	outline-offset: -2px;
}

/* The icon wrapper is a 34px box by default, sized for a clickable icon on
   its own. Here it sits inside the header button, so it shrinks to the
   glyph. The header class in front outranks the wrapper's own rule. */
.list-view__area-header .list-view__area-chevron {
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

.list-view__area-chevron--collapsed {
	transform: rotate(-90deg);
}

.list-view__area-chevron--collapsed:dir(rtl) {
	transform: rotate(90deg);
}

@media (prefers-reduced-motion: reduce) {
	.list-view__area-header .list-view__area-chevron {
		transition: none;
	}
}

.list-view__area-name {
	min-width: 0;
	overflow-wrap: anywhere;
	font-size: 0.8em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--color-text-maxcontrast);
}

.list-view__area-name--muted {
	font-weight: 500;
}

.list-view__area-count {
	flex: 0 0 auto;
	color: var(--color-text-maxcontrast);
	font-size: 0.75em;
	opacity: 0.7;
}

.list-view__items {
	display: flex;
	flex-direction: column;
	min-width: 0;
	min-height: 8px;
}

.list-view__item--ghost {
	opacity: 0.4;
	background-color: var(--color-primary-element-light);
	border-radius: var(--border-radius);
}

.list-view__avatars {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.list-view__avatar {
	margin-inline-start: -6px;
	border: 2px solid var(--color-main-background);
	border-radius: 50%;
}

.list-view__avatar:first-child {
	margin-inline-start: 0;
}

.list-view__avatar-overflow {
	margin-inline-start: 4px;
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
	font-weight: 500;
}

/* Bought section */
.list-view__bought {
	margin-top: 20px;
}

.list-view__bought-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 0 8px;
}

.list-view__bought-header h3 {
	margin: 0;
	font-size: 0.9em;
	color: var(--color-text-maxcontrast);
	font-weight: 500;
	cursor: pointer;
	user-select: none;
}

.list-view__bought-actions {
	display: flex;
	gap: 6px;
}

.list-view__action-btn {
	background: none;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	color: var(--color-text-maxcontrast);
	padding: 4px 10px;
	font-size: 0.8em;
	cursor: pointer;
}

.list-view__action-btn:hover {
	background-color: var(--color-background-hover);
	color: var(--color-main-text);
}

.list-view__action-btn--danger:hover {
	background-color: var(--color-error);
	color: #fff;
	border-color: var(--color-error);
}

.list-view__bought-card {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background-color: var(--color-main-background);
	overflow: hidden;
	opacity: 0.65;
}

.list-view__toggle {
	margin-inline-start: 4px;
}

@media (max-width: 1024px) {
	.list-view__header {
		padding-inline-start: 44px;
	}
}
</style>
