<template>
	<NcDialog
		:name="shareListTitle"
		@closing="$emit('close')">
		<div class="share-dialog">
			<div class="share-dialog__search">
				<NcSelect
					v-model="selectedSharee"
					:placeholder="searchPlaceholder"
					:options="shareeOptions"
					:loading="searching"
					:filterable="false"
					label="label"
					@search="onSearch"
					@option:selected="onShareeSelected">
					<template #no-options>
						{{ searchQuery ? noResultsText : typeToSearchText }}
					</template>
				</NcSelect>
			</div>

			<div v-if="shares.length > 0" class="share-dialog__list">
				<div
					v-for="share in shares"
					:key="share.id"
					class="share-dialog__item">
					<NcAvatar
						:user="share.sharedWithType === ShareType.USER ? share.sharedWith : undefined"
						:display-name="share.sharedWithDisplayName"
						:size="32"
						:is-no-user="share.sharedWithType === ShareType.GROUP" />
					<div class="share-dialog__info">
						<span class="share-dialog__name">{{ share.sharedWithDisplayName }}</span>
						<span v-if="share.sharedWithType === ShareType.GROUP" class="share-dialog__type">
							{{ groupText }}
						</span>
					</div>
					<NcSelect
						v-if="isOwner"
						:model-value="permissionOptions.find(o => o.value === share.permission)"
						:options="permissionOptions"
						:clearable="false"
						:searchable="false"
						label="label"
						class="share-dialog__permission"
						@option:selected="(opt: PermissionOption) => onPermissionChange(share.id, opt.value)" />
					<NcButton
						v-if="isOwner || share.sharedWith === currentUserId"
						type="tertiary"
						@click="onRemoveShare(share.id)">
						{{ removeText }}
					</NcButton>
				</div>
			</div>

			<NcEmptyContent v-else
				:name="notSharedText"
				:description="notSharedDesc">
				<template #icon>
					<NcIconSvgWrapper :svg="shareIcon" />
				</template>
			</NcEmptyContent>
		</div>
	</NcDialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
	NcDialog,
	NcSelect,
	NcAvatar,
	NcButton,
	NcEmptyContent,
	NcIconSvgWrapper,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { useSharesStore } from '../stores/shares'
import { ShareType, Permission } from '../types'
import type { ListShare } from '../types'

interface PermissionOption {
	label: string
	value: number
}

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

defineEmits<{
	close: []
}>()

const sharesStore = useSharesStore()

// Pre-compute translations
const shareListTitle = t('shoppinglist', 'Share list')
const searchPlaceholder = t('shoppinglist', 'Search users or groups...')
const noResultsText = t('shoppinglist', 'No results')
const typeToSearchText = t('shoppinglist', 'Type to search...')
const groupText = t('shoppinglist', 'Group')
const removeText = t('shoppinglist', 'Remove')
const notSharedText = t('shoppinglist', 'Not shared')
const notSharedDesc = t('shoppinglist', 'This list is not shared with anyone yet')
const groupLabel = t('shoppinglist', 'group')

const selectedSharee = ref<ShareeOption | null>(null)
const shareeOptions = ref<ShareeOption[]>([])
const searching = ref(false)
const searchQuery = ref('')

const shareIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19C20.92,17.39 19.61,16.08 18,16.08Z" fill="currentColor"/></svg>'

const shares = computed(() => sharesStore.sharesByList[props.listId] ?? [])

const permissionOptions: PermissionOption[] = [
	{ label: t('shoppinglist', 'Can view'), value: Permission.READ },
	{ label: t('shoppinglist', 'Can edit'), value: Permission.WRITE },
]

onMounted(() => {
	sharesStore.fetchByList(props.listId)
})

let searchTimeout: ReturnType<typeof setTimeout> | null = null

function onSearch(query: string) {
	searchQuery.value = query
	if (searchTimeout) clearTimeout(searchTimeout)
	if (!query) {
		shareeOptions.value = []
		return
	}
	searchTimeout = setTimeout(async () => {
		searching.value = true
		try {
			const url = generateOcsUrl('apps/files_sharing/api/v1/sharees')
			const response = await axios.get(url, {
				params: { search: query, itemType: 'file', perPage: 10 },
			})
			const data = response.data.ocs.data
			const options: ShareeOption[] = []

			// Users
			for (const user of (data.exact?.users ?? []).concat(data.users ?? [])) {
				if (user.value.shareWith !== props.currentUserId) {
					options.push({
						label: user.label,
						value: user.value.shareWith,
						type: ShareType.USER,
					})
				}
			}

			// Groups
			for (const group of (data.exact?.groups ?? []).concat(data.groups ?? [])) {
				options.push({
					label: `${group.label} (${groupLabel})`,
					value: group.value.shareWith,
					type: ShareType.GROUP,
				})
			}

			shareeOptions.value = options
		} catch (e) {
			console.error('Failed to search sharees', e)
		} finally {
			searching.value = false
		}
	}, 300)
}

async function onShareeSelected(option: ShareeOption) {
	if (!option) return
	await sharesStore.create(props.listId, option.value, option.type, Permission.WRITE)
	selectedSharee.value = null
	shareeOptions.value = []
}

async function onPermissionChange(shareId: number, permission: number) {
	await sharesStore.updatePermission(shareId, permission, props.listId)
}

async function onRemoveShare(shareId: number) {
	await sharesStore.remove(shareId, props.listId)
}
</script>

<style scoped>
.share-dialog {
	padding: 16px;
	min-height: 200px;
}

.share-dialog__search {
	margin-bottom: 16px;
}

.share-dialog__list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.share-dialog__item {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 8px;
	border-radius: var(--border-radius-large);
}

.share-dialog__item:hover {
	background-color: var(--color-background-hover);
}

.share-dialog__info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.share-dialog__name {
	font-weight: 500;
}

.share-dialog__type {
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
}

.share-dialog__permission {
	width: 120px;
}
</style>
