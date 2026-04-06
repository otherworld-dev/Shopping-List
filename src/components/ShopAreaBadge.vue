<template>
	<span
		class="shop-area-badge"
		:style="{ backgroundColor: color || 'var(--color-background-dark)' }">
		{{ name }}
	</span>
</template>

<script setup lang="ts">
defineProps<{
	name: string
	color: string | null
}>()
</script>

<style scoped>
.shop-area-badge {
	display: inline-block;
	padding: 2px 10px;
	border-radius: var(--border-radius-pill);
	font-size: 0.8em;
	font-weight: 500;
	color: #fff;
	white-space: nowrap;
}
</style>
