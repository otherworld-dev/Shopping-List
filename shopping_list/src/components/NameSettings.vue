<template>
	<section class="name-settings">
		<h3 class="name-settings__title">
			{{ title }}
		</h3>
		<NcCheckboxRadioSwitch type="switch"
			:model-value="enabled"
			:loading="saving"
			:description="hint"
			@update:model-value="onToggle">
			{{ switchLabel }}
		</NcCheckboxRadioSwitch>
	</section>
</template>

<script setup lang="ts">
import { NcCheckboxRadioSwitch } from '@nextcloud/vue'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { useOwnNamePreference } from '../composables/useOwnNamePreference'

const { enabled, saving, setEnabled } = useOwnNamePreference()

const title = t('shopping_list', 'Names')
const switchLabel = t('shopping_list', 'Show my name on items')
const hint = t('shopping_list', 'Your name always shows to everyone else. This switch only changes what you see.')
const saveFailedText = t('shopping_list', 'Failed to save setting')

async function onToggle(value: boolean) {
	try {
		await setEnabled(value)
	} catch (e) {
		showError(saveFailedText)
		console.error(e)
	}
}
</script>

<style scoped>
.name-settings {
	padding: 0 0 4px;
}

.name-settings__title {
	margin: 0 0 4px;
	font-size: 1em;
	font-weight: 600;
}
</style>
