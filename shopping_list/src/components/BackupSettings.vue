<template>
	<NcAppNavigationSettings :name="backupText">
		<p class="backup__hint">
			{{ hintText }}
		</p>

		<NcButton wide @click="onDownload">
			{{ downloadText }}
		</NcButton>

		<NcButton wide :disabled="restoring" @click="fileInput?.click()">
			{{ restoring ? restoringText : restoreText }}
		</NcButton>

		<input ref="fileInput"
			type="file"
			accept="application/json,.json"
			class="backup__file"
			@change="onFileChosen">
	</NcAppNavigationSettings>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NcAppNavigationSettings, NcButton } from '@nextcloud/vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { t, n } from '@nextcloud/l10n'
import { api } from '../composables/useApi'
import { useListsStore } from '../stores/lists'

const listsStore = useListsStore()
const fileInput = ref<HTMLInputElement | null>(null)
const restoring = ref(false)

const backupText = t('shopping_list', 'Backup')
const hintText = t('shopping_list', 'A backup holds your own lists, their items, areas and tags. Shares are not included, and restoring adds lists rather than replacing the ones you have.')
const downloadText = t('shopping_list', 'Download backup')
const restoreText = t('shopping_list', 'Restore from backup')
const restoringText = t('shopping_list', 'Restoring...')

function onDownload() {
	window.location.href = api.backup.downloadUrl()
}

async function onFileChosen(event: Event) {
	const input = event.target as HTMLInputElement
	const file = input.files?.[0]
	if (!file) return

	restoring.value = true
	try {
		const payload = JSON.parse(await file.text())
		const response = await api.backup.restore(payload)
		const added = response.data.lists ?? 0
		showSuccess(n('shopping_list', 'Restored %n list', 'Restored %n lists', added))
		await listsStore.fetchAll()
	} catch (e) {
		showError(t('shopping_list', 'That file could not be restored'))
		console.error(e)
	} finally {
		restoring.value = false
		// Clear it so choosing the same file again still fires a change event.
		input.value = ''
	}
}
</script>

<style scoped>
.backup__hint {
	margin-bottom: 8px;
	color: var(--color-text-maxcontrast);
	font-size: 0.85em;
}

.backup__file {
	display: none;
}
</style>
