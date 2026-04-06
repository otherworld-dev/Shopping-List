<template>
	<span class="tag-chip">
		{{ name }}
	</span>
</template>

<script setup lang="ts">
defineProps<{
	name: string
}>()
</script>

<style scoped>
.tag-chip {
	display: inline-block;
	padding: 2px 8px;
	border-radius: var(--border-radius-pill);
	background-color: var(--color-primary-element-light);
	color: var(--color-primary-element-light-text);
	font-size: 0.75em;
	white-space: nowrap;
}
</style>
