<template>
	<Transition name="offline-fade">
		<div v-if="visible" class="offline-indicator" :class="statusClass">
			<span v-if="syncing" class="offline-indicator__icon spinning">&#8635;</span>
			<span v-else-if="!isOnline" class="offline-indicator__icon">&#9888;</span>
			<span v-else class="offline-indicator__icon">&#10003;</span>

			<span class="offline-indicator__text">{{ statusText }}</span>

			<span v-if="pendingCount > 0 && !syncing" class="offline-indicator__badge">
				{{ pendingCount }}
			</span>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { useNetworkStatus } from '../offline/networkStatus'
import { useSyncEngine } from '../offline/syncEngine'

const { isOnline } = useNetworkStatus()
const { syncing, pendingCount } = useSyncEngine()

const justSynced = ref(false)
let syncedTimer: ReturnType<typeof setTimeout> | null = null

watch(syncing, (isSyncing, wasSyncing) => {
	if (wasSyncing && !isSyncing && pendingCount.value === 0) {
		justSynced.value = true
		if (syncedTimer) clearTimeout(syncedTimer)
		syncedTimer = setTimeout(() => { justSynced.value = false }, 3000)
	}
})

const visible = computed(() => {
	return !isOnline.value || syncing.value || justSynced.value || pendingCount.value > 0
})

const statusClass = computed(() => {
	if (syncing.value) return 'offline-indicator--syncing'
	if (!isOnline.value) return 'offline-indicator--offline'
	if (justSynced.value) return 'offline-indicator--synced'
	if (pendingCount.value > 0) return 'offline-indicator--pending'
	return ''
})

const statusText = computed(() => {
	if (syncing.value) return t('shopping_list', 'Syncing changes…')
	if (!isOnline.value && pendingCount.value > 0) {
		return t('shopping_list', 'Offline — {count} pending', { count: pendingCount.value })
	}
	if (!isOnline.value) return t('shopping_list', 'You\'re offline')
	if (justSynced.value) return t('shopping_list', 'All changes synced')
	if (pendingCount.value > 0) return t('shopping_list', '{count} changes pending', { count: pendingCount.value })
	return ''
})
</script>

<style scoped>
.offline-indicator {
	position: fixed;
	bottom: 16px;
	right: 16px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 14px;
	border-radius: 20px;
	font-size: 13px;
	font-weight: 500;
	z-index: 10000;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	transition: background-color 0.3s, color 0.3s;
}

.offline-indicator--offline {
	background-color: var(--color-warning, #e9a004);
	color: var(--color-warning-text, #000);
}

.offline-indicator--syncing {
	background-color: var(--color-primary-element, #0082c9);
	color: var(--color-primary-element-text, #fff);
}

.offline-indicator--synced {
	background-color: var(--color-success, #46ba61);
	color: var(--color-success-text, #fff);
}

.offline-indicator--pending {
	background-color: var(--color-warning, #e9a004);
	color: var(--color-warning-text, #000);
}

.offline-indicator__icon {
	font-size: 16px;
	line-height: 1;
}

.offline-indicator__badge {
	background: rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding: 1px 7px;
	font-size: 11px;
	font-weight: 700;
}

.spinning {
	display: inline-block;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

.offline-fade-enter-active,
.offline-fade-leave-active {
	transition: opacity 0.3s, transform 0.3s;
}

.offline-fade-enter-from,
.offline-fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
