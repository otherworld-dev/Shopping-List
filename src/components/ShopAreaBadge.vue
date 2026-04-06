<template>
	<span class="shop-area">
		<span
			v-if="color"
			class="shop-area__dot"
			:style="{ backgroundColor: color }" />
		<span class="shop-area__name">{{ name }}</span>
	</span>
</template>

<script setup lang="ts">
defineProps<{
	name: string
	color: string | null
}>()
</script>

<style scoped>
.shop-area {
	display: inline-flex;
	align-items: center;
	gap: 6px;
}

.shop-area__dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	flex-shrink: 0;
}

.shop-area__name {
	font-size: 0.85em;
	font-weight: 500;
	color: var(--color-text-maxcontrast);
}
</style>
