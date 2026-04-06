<template>
	<NcSelect
		v-model="selectedTags"
		:options="tagOptions"
		:multiple="true"
		:taggable="true"
		:placeholder="placeholder"
		label="name"
		@option:created="onTagCreated" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { NcSelect } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { useTagsStore } from '../stores/tags'
import type { Tag } from '../types'

const props = defineProps<{
	modelValue: Tag[]
}>()

const emit = defineEmits<{
	'update:modelValue': [tags: Tag[]]
}>()

const tagsStore = useTagsStore()
const placeholder = t('shoppinglist', 'Add tags...')

const selectedTags = ref<Tag[]>([...props.modelValue])

// Map to plain objects to avoid reactive proxy issues with NcSelect
const tagOptions = computed(() => tagsStore.tags.map(t => ({ id: t.id, name: t.name })))

watch(selectedTags, (newTags) => {
	emit('update:modelValue', newTags)
}, { deep: true })

watch(() => props.modelValue, (newVal) => {
	selectedTags.value = [...newVal]
})

onMounted(() => {
	if (tagsStore.tags.length === 0) {
		tagsStore.fetchAll()
	}
})

async function onTagCreated(newTag: string | { name: string }) {
	const name = typeof newTag === 'string' ? newTag : newTag.name
	const created = await tagsStore.create(name)
	if (created) {
		selectedTags.value = selectedTags.value.map(t =>
			(typeof t === 'string' ? t : t.name) === name ? created : t,
		)
	}
}
</script>
