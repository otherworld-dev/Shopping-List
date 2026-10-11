<template>
	<NcModal :show="true"
		:name="name"
		size="large"
		dark
		close-on-click-outside
		@close="$emit('close')">
		<div class="image-viewer">
			<img v-if="!failed"
				:src="src"
				:alt="name"
				class="image-viewer__img"
				@error="failed = true">
			<p v-else class="image-viewer__error">
				{{ failedText }}
			</p>
		</div>
	</NcModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NcModal } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'

defineProps<{
	src: string
	name: string
}>()

defineEmits<{ close: [] }>()

const failed = ref(false)
const failedText = t('shopping_list', 'Could not load image')
</script>

<style scoped>
.image-viewer {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 120px;
	padding: 8px;
}

.image-viewer__img {
	max-width: 100%;
	max-height: 80vh;
	object-fit: contain;
	border-radius: var(--border-radius);
}

.image-viewer__error {
	color: var(--color-text-maxcontrast);
}
</style>
