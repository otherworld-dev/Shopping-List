<template>
	<NcEmptyContent :name="name" :description="description">
		<template #icon>
			<slot name="icon" />
		</template>
	</NcEmptyContent>
</template>

<script setup lang="ts">
import { NcEmptyContent } from '@nextcloud/vue'

defineProps<{
	name: string
	description: string
}>()
</script>
