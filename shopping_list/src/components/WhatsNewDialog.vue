<template>
	<NcDialog :open="shown.length > 0"
		:name="title"
		:buttons="buttons"
		size="normal"
		@update:open="onUpdateOpen">
		<section v-for="entry in shown"
			:key="entry.version"
			class="whats-new__entry">
			<h3 class="whats-new__heading">
				{{ entry.title }}
				<span class="whats-new__version">{{ entry.version }}</span>
			</h3>
			<ul class="whats-new__items">
				<li v-for="(item, i) in entry.items"
					:key="i">
					{{ item }}
				</li>
			</ul>
			<a v-if="safeLink(entry.link)"
				class="whats-new__link"
				:href="safeLink(entry.link) ?? undefined"
				target="_blank"
				rel="noopener noreferrer">
				{{ readMoreText }}
			</a>
		</section>
	</NcDialog>
</template>

<script setup lang="ts">
import { NcDialog } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { useWhatsNew } from '../composables/useWhatsNew'
import { safeLink } from '../utils/whatsNew'

const { shown, close } = useWhatsNew()

const title = t('shopping_list', "What's new in Shopping List")
const readMoreText = t('shopping_list', 'Read more')
const buttons = [{
	label: t('shopping_list', 'Got it'),
	variant: 'primary' as const,
}]

function onUpdateOpen(open: boolean) {
	if (!open) close()
}
</script>

<style scoped>
.whats-new__entry + .whats-new__entry {
	margin-top: 16px;
}

.whats-new__heading {
	margin: 0 0 8px;
	font-size: 1.1em;
	font-weight: 600;
}

.whats-new__version {
	margin-inline-start: 6px;
	color: var(--color-text-maxcontrast);
	font-weight: normal;
	font-size: 0.9em;
}

/* Nextcloud's own styles take the bullets off every list. */
.whats-new__items {
	margin: 0 0 8px;
	padding-inline-start: 20px;
	list-style: disc;
}

.whats-new__items li + li {
	margin-top: 4px;
}

.whats-new__link {
	color: var(--color-primary-element);
	text-decoration: underline;
}
</style>
