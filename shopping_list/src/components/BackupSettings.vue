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
			:aria-label="restoreText"
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
const downloadFailedText = t('shopping_list', 'Could not download the backup')

async function onDownload() {
	// Not a plain `location.href`: the endpoint's error path returns JSON
	// with no attachment disposition, which would navigate the SPA away
	// with no feedback instead of showing a toast.
	try {
		const response = await api.backup.download()
		const filename = `shopping-list-backup-${new Date().toISOString().slice(0, 10)}.json`
		const objectUrl = URL.createObjectURL(response.data)
		const link = document.createElement('a')
		link.href = objectUrl
		link.download = filename
		link.click()
		URL.revokeObjectURL(objectUrl)
	} catch (e) {
		showError(downloadFailedText)
		console.error(e)
	}
}

async function onFileChosen(event: Event) {
	const input = event.target as HTMLInputElement
	const file = input.files?.[0]
	if (!file) return

	restoring.value = true
	let restored = false
	try {
		const payload = JSON.parse(await file.text())
		const response = await api.backup.restore(payload)
		const added = response.data.lists ?? 0
		showSuccess(n('shopping_list', 'Restored %n list', 'Restored %n lists', added))
		restored = true
	} catch (e) {
		showError(t('shopping_list', 'That file could not be restored'))
		console.error(e)
	} finally {
		restoring.value = false
		// Clear it so choosing the same file again still fires a change event.
		input.value = ''
	}

	if (restored) {
		await listsStore.fetchAll()
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
