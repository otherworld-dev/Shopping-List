<template>
	<div class="share-overlay" @click.self="$emit('close')">
		<div class="share-modal">
			<div class="share-modal__header">
				<h3>{{ shareTitle }}</h3>
				<button class="share-modal__close" @click="$emit('close')">✕</button>
			</div>

			<div class="share-modal__search">
				<input
					ref="searchRef"
					v-model="searchQuery"
					type="text"
					:placeholder="searchPlaceholder"
					class="share-modal__search-input"
					@input="onSearchInput" />
			</div>

			<div v-if="shareeResults.length > 0" class="share-modal__results">
				<div
					v-for="sharee in shareeResults"
					:key="sharee.value + sharee.type"
					class="share-modal__result"
					@click="onSelectSharee(sharee)">
					<span class="share-modal__icon">{{ sharee.type === 1 ? '👥' : '👤' }}</span>
					<div class="share-modal__result-info">
						<span class="share-modal__result-name">{{ sharee.label }}</span>
						<span v-if="sharee.type === 1" class="share-modal__result-type">{{ groupText }}</span>
					</div>
				</div>
			</div>
			<div v-else-if="searchQuery.length > 0 && !searching" class="share-modal__no-results">
				{{ noResultsText }}
			</div>

			<div v-if="shares.length > 0" class="share-modal__shares">
				<div class="share-modal__section-title">{{ sharedWithText }}</div>
				<div
					v-for="share in shares"
					:key="share.id"
					class="share-modal__share">
					<span class="share-modal__icon">{{ share.sharedWithType === 1 ? '👥' : '👤' }}</span>
					<div class="share-modal__share-info">
						<span class="share-modal__share-name">{{ share.sharedWithDisplayName }}</span>
						<span v-if="share.sharedWithType === 1" class="share-modal__share-type">{{ groupText }}</span>
					</div>
					<select
						v-if="isOwner"
						class="share-modal__permission"
						:value="share.permission"
						@change="onPermissionChange(share.id, Number(($event.target as HTMLSelectElement).value))">
						<option :value="0">{{ canViewText }}</option>
						<option :value="1">{{ canEditText }}</option>
					</select>
					<button
						v-if="isOwner || share.sharedWith === currentUserId"
						class="share-modal__remove"
						@click="onRemoveShare(share.id)">
						✕
					</button>
				</div>
			</div>

			<div v-if="shares.length === 0 && searchQuery.length === 0" class="share-modal__empty">
				{{ emptyText }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { useSharesStore } from '../stores/shares'
import { ShareType, Permission } from '../types'

interface ShareeOption {
	label: string
	value: string
	type: number
}

const props = defineProps<{
	listId: number
	isOwner: boolean
	currentUserId: string
}>()

defineEmits<{ close: [] }>()

const sharesStore = useSharesStore()
const searchRef = ref<HTMLInputElement | null>(null)

const shareTitle = t('shopping_list', 'Share list')
const searchPlaceholder = t('shopping_list', 'Search users or groups...')
const noResultsText = t('shopping_list', 'No users found')
const groupText = t('shopping_list', 'Group')
const sharedWithText = t('shopping_list', 'Shared with')
const canViewText = t('shopping_list', 'Can view')
const canEditText = t('shopping_list', 'Can edit')
const emptyText = t('shopping_list', 'Search above to share this list with other users.')
const groupLabel = t('shopping_list', 'group')

const searchQuery = ref('')
const searching = ref(false)
const shareeResults = ref<ShareeOption[]>([])

const shares = computed(() => sharesStore.sharesByList[props.listId] ?? [])

let searchTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(async () => {
	await sharesStore.fetchByList(props.listId)
	await nextTick()
	searchRef.value?.focus()
})

function onSearchInput() {
	if (searchTimeout) clearTimeout(searchTimeout)
	const query = searchQuery.value.trim()
	if (!query) {
		shareeResults.value = []
		return
	}
	searching.value = true
	searchTimeout = setTimeout(async () => {
		try {
			const url = generateOcsUrl('apps/files_sharing/api/v1/sharees')
			const response = await axios.get(url, {
				params: { search: query, itemType: 'file', perPage: 10 },
			})
			const data = response.data.ocs.data
			const options: ShareeOption[] = []

			for (const user of (data.exact?.users ?? []).concat(data.users ?? [])) {
				if (user.value.shareWith !== props.currentUserId) {
					options.push({
						label: user.label,
						value: user.value.shareWith,
						type: ShareType.USER,
					})
				}
			}

			for (const group of (data.exact?.groups ?? []).concat(data.groups ?? [])) {
				options.push({
					label: `${group.label} (${groupLabel})`,
					value: group.value.shareWith,
					type: ShareType.GROUP,
				})
			}

			shareeResults.value = options
		} catch (e) {
			console.error('Failed to search sharees', e)
		} finally {
			searching.value = false
		}
	}, 300)
}

async function onSelectSharee(sharee: ShareeOption) {
	await sharesStore.create(props.listId, sharee.value, sharee.type, Permission.WRITE)
	searchQuery.value = ''
	shareeResults.value = []
}

async function onPermissionChange(shareId: number, permission: number) {
	await sharesStore.updatePermission(shareId, permission, props.listId)
}

async function onRemoveShare(shareId: number) {
	await sharesStore.remove(shareId, props.listId)
}
</script>

<style scoped>
.share-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10000;
}

.share-modal {
	background: var(--color-main-background);
	border-radius: var(--border-radius-large);
	width: 440px;
	max-width: 90vw;
	max-height: 80vh;
	overflow-y: auto;
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.share-modal__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 20px 12px;
	border-bottom: 1px solid var(--color-border);
}

.share-modal__header h3 {
	margin: 0;
	font-size: 1.1em;
	font-weight: 600;
}

.share-modal__close {
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	font-size: 1.1em;
	cursor: pointer;
	padding: 4px 8px;
	border-radius: var(--border-radius);
}

.share-modal__close:hover {
	background: var(--color-background-hover);
	color: var(--color-main-text);
}

.share-modal__search {
	padding: 12px 20px;
}

.share-modal__search-input {
	width: 100%;
	height: 38px;
	padding: 0 12px;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 0.95em;
	outline: none;
	box-sizing: border-box;
}

.share-modal__search-input:focus {
	border-color: var(--color-primary-element);
}

.share-modal__search-input::placeholder {
	color: var(--color-text-maxcontrast);
}

.share-modal__results {
	padding: 0 12px 8px;
}

.share-modal__result {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px;
	border-radius: var(--border-radius-large);
	cursor: pointer;
}

.share-modal__result:hover {
	background: var(--color-background-hover);
}

.share-modal__icon {
	font-size: 1.2em;
	flex-shrink: 0;
	width: 28px;
	text-align: center;
}

.share-modal__result-info {
	display: flex;
	flex-direction: column;
}

.share-modal__result-name {
	font-weight: 500;
	font-size: 0.9em;
}

.share-modal__result-type {
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
}

.share-modal__no-results {
	padding: 12px 20px;
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
	text-align: center;
}

.share-modal__shares {
	padding: 0 20px 16px;
}

.share-modal__section-title {
	font-size: 0.75em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--color-text-maxcontrast);
	padding: 8px 0 6px;
	border-top: 1px solid var(--color-border);
}

.share-modal__share {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 6px 0;
}

.share-modal__share-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.share-modal__share-name {
	font-weight: 500;
	font-size: 0.9em;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.share-modal__share-type {
	font-size: 0.8em;
	color: var(--color-text-maxcontrast);
}

.share-modal__permission {
	height: 28px;
	padding: 0 6px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	background: transparent;
	color: var(--color-main-text);
	font-size: 0.8em;
	outline: none;
	cursor: pointer;
}

.share-modal__remove {
	background: none;
	border: none;
	color: var(--color-text-maxcontrast);
	cursor: pointer;
	padding: 4px 6px;
	border-radius: var(--border-radius);
	font-size: 0.85em;
}

.share-modal__remove:hover {
	color: var(--color-error);
}

.share-modal__empty {
	padding: 20px;
	text-align: center;
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
}
</style>
