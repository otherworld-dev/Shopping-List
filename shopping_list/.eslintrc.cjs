// Nextcloud's shared ESLint rules, in the Vue 3 + TypeScript flavour, since
// every component here is <script setup lang="ts">. package.json declares
// "type": "module", so this file is .cjs to stay a CommonJS config.
module.exports = {
	root: true,
	extends: ['@nextcloud/eslint-config/vue3'],
	rules: {
		// The whole codebase is TypeScript, so parameter names and types are
		// already in every signature. Docblocks here explain why, where that is
		// not obvious, and are not required to restate the what.
		'jsdoc/require-jsdoc': 'off',
		'jsdoc/require-param': 'off',
	},
}
