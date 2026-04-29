<template>
	<div class="public-app">
		<div v-if="loading" class="public-app__loading">
			<NcLoadingIcon />
		</div>

		<div v-else-if="needsPassword" class="public-app__password">
			<div class="public-app__password-card">
				<h2>{{ passwordTitle }}</h2>
				<p>{{ passwordDesc }}</p>
				<form @submit.prevent="onSubmitPassword">
					<input
						ref="passwordRef"
						v-model="password"
						type="password"
						:placeholder="passwordPlaceholder"
						class="public-app__password-input"
						autofocus />
					<button type="submit" class="public-app__password-btn" :disabled="!password">
						{{ unlockText }}
					</button>
					<p v-if="passwordError" class="public-app__password-error">{{ passwordErrorText }}</p>
				</form>
			</div>
		</div>

		<div v-else-if="notFound" class="public-app__error">
			<h2>{{ notFoundTitle }}</h2>
			<p>{{ notFoundDesc }}</p>
		</div>

		<PublicListView
			v-else
			:token="token"
			:title="listTitle"
			:permission="listPermission" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NcLoadingIcon } from '@nextcloud/vue'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { publicApi } from './composables/useApi'
import { Permission } from './types'
import PublicListView from './components/PublicListView.vue'

const token = loadState('shopping_list', 'public_token') as string

const loading = ref(true)
const needsPassword = ref(false)
const notFound = ref(false)
const listTitle = ref('')
const listPermission = ref(Permission.READ)
const password = ref('')
const passwordError = ref(false)
const passwordRef = ref<HTMLInputElement | null>(null)

const passwordTitle = t('shopping_list', 'Password required')
const passwordDesc = t('shopping_list', 'This list is password protected.')
const passwordPlaceholder = t('shopping_list', 'Enter password')
const unlockText = t('shopping_list', 'Unlock')
const passwordErrorText = t('shopping_list', 'Incorrect password')
const notFoundTitle = t('shopping_list', 'Not found')
const notFoundDesc = t('shopping_list', 'This shared list does not exist or has expired.')

onMounted(async () => {
	try {
		const response = await publicApi.getList(token)
		const data = response.data.ocs.data
		if (data.passwordRequired) {
			needsPassword.value = true
		} else {
			listTitle.value = data.title
			listPermission.value = data.permission
		}
	} catch (e: unknown) {
		const err = e as { response?: { status?: number; data?: { ocs?: { data?: { passwordRequired?: boolean } } } } }
		if (err.response?.status === 403 && err.response?.data?.ocs?.data?.passwordRequired) {
			needsPassword.value = true
		} else {
			notFound.value = true
		}
	} finally {
		loading.value = false
	}
})

async function onSubmitPassword() {
	passwordError.value = false
	try {
		const response = await publicApi.auth(token, password.value)
		const data = response.data.ocs.data
		listTitle.value = data.title
		listPermission.value = data.permission
		needsPassword.value = false
	} catch {
		passwordError.value = true
		password.value = ''
		passwordRef.value?.focus()
	}
}
</script>

<style>
/* Override Nextcloud public page layout to give our app full width */
#content {
	min-height: 100vh;
}

#shopping_list_public {
	width: 100%;
	max-width: 100%;
}
</style>

<style scoped>
.public-app {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px 20px 80px;
}

.public-app__loading {
	display: flex;
	justify-content: center;
	padding: 60px;
}

.public-app__password {
	display: flex;
	justify-content: center;
	padding-top: 80px;
}

.public-app__password-card {
	text-align: center;
	max-width: 360px;
	width: 100%;
}

.public-app__password-card h2 {
	margin: 0 0 8px;
	font-size: 1.3em;
}

.public-app__password-card p {
	color: var(--color-text-maxcontrast);
	margin: 0 0 20px;
	font-size: 0.9em;
}

.public-app__password-input {
	width: 100%;
	height: 42px;
	padding: 0 14px;
	border: 2px solid var(--color-border);
	border-radius: var(--border-radius-large);
	background: var(--color-main-background);
	color: var(--color-main-text);
	font-size: 1em;
	outline: none;
	box-sizing: border-box;
	margin-bottom: 12px;
}

.public-app__password-input:focus {
	border-color: var(--color-primary-element);
}

.public-app__password-btn {
	width: 100%;
	height: 42px;
	background: var(--color-primary-element);
	color: var(--color-primary-element-text);
	border: none;
	border-radius: var(--border-radius-large);
	font-size: 1em;
	font-weight: 600;
	cursor: pointer;
}

.public-app__password-btn:disabled {
	opacity: 0.5;
	cursor: default;
}

.public-app__password-error {
	color: var(--color-error);
	font-size: 0.9em;
	margin-top: 12px;
}

.public-app__error {
	text-align: center;
	padding-top: 80px;
}

.public-app__error h2 {
	margin: 0 0 8px;
	font-size: 1.3em;
}

.public-app__error p {
	color: var(--color-text-maxcontrast);
	font-size: 0.9em;
}
</style>
