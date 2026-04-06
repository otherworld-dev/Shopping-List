<template>
	<NcContent app-name="shopping_list">
		<NcAppNavigation>
			<ListSidebar @show-settings="showSettings = true" />
		</NcAppNavigation>
		<NcAppContent>
			<AreaKeywordsSettings v-if="showSettings" @back="showSettings = false" />
			<ListView v-else-if="listsStore.currentList" />
			<NcEmptyContent v-else
				:name="noListName"
				:description="noListDesc">
				<template #icon>
					<NcIconSvgWrapper :svg="cartIcon" />
				</template>
			</NcEmptyContent>
		</NcAppContent>
	</NcContent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
	NcContent,
	NcAppNavigation,
	NcAppContent,
	NcEmptyContent,
	NcIconSvgWrapper,
} from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import ListSidebar from './components/ListSidebar.vue'
import ListView from './components/ListView.vue'
import AreaKeywordsSettings from './components/AreaKeywordsSettings.vue'
import { useListsStore } from './stores/lists'
import { useAreaKeywordsStore } from './stores/areaKeywords'
import { usePush } from './composables/usePush'

const listsStore = useListsStore()
const areaKeywordsStore = useAreaKeywordsStore()
const showSettings = ref(false)

const noListName = t('shopping_list', 'No list selected')
const noListDesc = t('shopping_list', 'Select a list from the sidebar or create a new one')
const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>'

onMounted(async () => {
	await Promise.all([
		listsStore.fetchAll(),
		areaKeywordsStore.fetchFromServer(),
	])
	if (listsStore.lists.length > 0 && !listsStore.currentListId) {
		listsStore.selectList(listsStore.lists[0].id)
	}
	usePush()
})
</script>
