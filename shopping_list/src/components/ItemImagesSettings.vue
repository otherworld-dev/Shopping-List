<template>
	<section class="image-settings">
		<h3 class="image-settings__title">
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
import { useImagePreference } from '../composables/useImagePreference'

const { enabled, saving, setEnabled } = useImagePreference()

const title = t('shopping_list', 'Item images')
const switchLabel = t('shopping_list', 'Show item images')
const hint = t('shopping_list', 'Attach a photo to an item from its menu, or paste or drop one onto it. Photos are part of the list, so everyone with access can see them. This switch only changes what you see.')
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
.image-settings {
	max-width: 800px;
	margin: 0 auto;
	padding: 0 20px 20px;
}

.image-settings__title {
	margin: 0 0 4px;
	font-size: 1.1em;
	font-weight: 600;
}
</style>
