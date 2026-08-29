import { defineConfig } from 'vitest/config'

// Deliberately not extending vite.config.ts. That one is built by
// @nextcloud/vite-config for producing the app bundle, and its plugins and
// outDir handling are not wanted for unit tests. Everything under src/utils/
// is plain TypeScript with no Vue or Nextcloud runtime, so it needs no setup.
export default defineConfig({
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node',
	},
})
