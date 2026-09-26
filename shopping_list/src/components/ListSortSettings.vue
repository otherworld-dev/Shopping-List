<template>
	<section class="list-sort-settings">
		<h3 class="list-sort-settings__title">
			{{ title }}
		</h3>
		<NcCheckboxRadioSwitch v-for="option in options"
			:key="option.value"
			type="radio"
			name="shopping-list-list-sort"
			:value="option.value"
			:model-value="listsStore.listSort"
			@update:model-value="(value: ListSort) => listsStore.setListSort(value)">
			{{ option.label }}
		</NcCheckboxRadioSwitch>
	</section>
</template>

<script setup lang="ts">
import { NcCheckboxRadioSwitch } from '@nextcloud/vue'
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

.list-sort-settings__title {
	margin: 0 0 4px;
	font-size: 1em;
	font-weight: 600;
}
</style>
