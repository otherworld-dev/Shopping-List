<template>
	<ul v-if="!hidden" class="android-app-link">
		<NcAppNavigationItem :name="linkText"
			:href="ANDROID_APP_URL"
			force-menu>
			<template #icon>
				<NcIconSvgWrapper :svg="phoneIcon" :size="20" />
			</template>
			<template #actions>
				<NcActionButton @click="onHide">
					{{ hideText }}
				</NcActionButton>
			</template>
		</NcAppNavigationItem>
	</ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NcActionButton, NcAppNavigationItem, NcIconSvgWrapper } from '@nextcloud/vue'
import { t } from '@nextcloud/l10n'
import { browserStorage } from '../utils/browserStorage'
import { ANDROID_APP_URL, loadHidden, saveHidden } from '../utils/androidAppLink'

// Points people at the companion app from the navigation footer. An outside
// link, so NcAppNavigationItem opens it in a new tab. Hiding it is kept in
// this browser only.
const storage = browserStorage()
const hidden = ref(loadHidden(storage))

const phoneIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" fill="currentColor"/></svg>'

const linkText = t('shopping_list', 'Get the Android app')
const hideText = t('shopping_list', 'Hide this link')

function onHide() {
	hidden.value = true
	saveHidden(storage)
}
</script>

<style scoped>
.android-app-link {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
