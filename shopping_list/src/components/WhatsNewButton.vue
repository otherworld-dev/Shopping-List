<template>
	<NcButton v-if="hasNotes"
		class="whats-new-button"
		variant="secondary"
		wide
		@click="showLatest">
		{{ label }}
	</NcButton>
</template>

<script setup lang="ts">
import { NcButton } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { useWhatsNew } from '../composables/useWhatsNew'

// Hidden when there are no notes up to the installed version.
const { hasNotes, showLatest } = useWhatsNew()

const label = t('shopping_list', "What's new")
</script>

<style scoped>
.whats-new-button {
	margin-top: 8px;
}
</style>
