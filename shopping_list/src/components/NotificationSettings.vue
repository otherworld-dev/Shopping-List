<template>
	<section class="notification-settings">
		<h3 class="notification-settings__title">
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
import { useNotifyAddsPreference } from '../composables/useNotifyAddsPreference'

const { enabled, saving, setEnabled } = useNotifyAddsPreference()

const title = t('shopping_list', 'Notifications')
const switchLabel = t('shopping_list', 'Notify me when someone else adds items to a list')
const hint = t('shopping_list', 'Items added close together arrive as one notification, in Nextcloud and on your phone through the Nextcloud app.')
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
.notification-settings {
	padding: 0 0 4px;
}

.notification-settings__title {
	margin: 0 0 4px;
	font-size: 1em;
	font-weight: 600;
}
</style>
