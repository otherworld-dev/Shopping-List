<template>
	<NcRadioGroup class="list-sort-settings"
		:label="title"
		:model-value="listsStore.listSort"
		@update:model-value="(value: string) => listsStore.setListSort(value as ListSort)">
		<NcCheckboxRadioSwitch v-for="option in options"
			:key="option.value"
			type="radio"
			name="shopping-list-list-sort"
			:value="option.value">
			{{ option.label }}
		</NcCheckboxRadioSwitch>
	</NcRadioGroup>
</template>

<script setup lang="ts">
import { NcCheckboxRadioSwitch, NcRadioGroup } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { useListsStore } from '../stores/lists'
import type { ListSort } from '../utils/listSort'

const listsStore = useListsStore()

const title = t('shopping_list', 'Sort lists')
const options: { value: ListSort, label: string }[] = [
	{ value: 'updated', label: t('shopping_list', 'Recently updated') },
	{ value: 'alpha', label: t('shopping_list', 'A to Z') },
	{ value: 'custom', label: t('shopping_list', 'Custom (drag to reorder)') },
]
</script>

<style scoped>
.list-sort-settings {
	padding: 0 0 12px;
}
</style>
