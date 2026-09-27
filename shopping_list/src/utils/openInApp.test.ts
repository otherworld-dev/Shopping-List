import { describe, expect, it } from 'vitest'
import { isAndroid, openInAppUrl } from './openInApp'

describe('isAndroid', () => {
	it('spots an Android browser', () => {
		expect(isAndroid('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/128.0 Mobile Safari/537.36')).toBe(true)
		expect(isAndroid('Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0')).toBe(true)
	})

	it('leaves everything else alone', () => {
		expect(isAndroid('Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Version/17.5 Mobile/15E148 Safari/604.1')).toBe(false)
		expect(isAndroid('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0 Safari/537.36')).toBe(false)
	})
})

describe('openInAppUrl', () => {
	it('hands the share link to the app, with the website as the fallback', () => {
		expect(openInAppUrl('https://cloud.example.com/apps/shopping_list/s/3f9a0c')).toBe(
			'intent://cloud.example.com/apps/shopping_list/s/3f9a0c#Intent;scheme=https;package=dev.otherworld.shoppinglist;'
			+ 'S.browser_fallback_url=https%3A%2F%2Fshoppinglist.otherworld.dev%2F;end',
		)
	})

	it('keeps a port, a sub-path and index.php, and drops a query', () => {
		expect(openInAppUrl('https://example.com:8443/nextcloud/index.php/apps/shopping_list/s/tok?x=1')).toBe(
			'intent://example.com:8443/nextcloud/index.php/apps/shopping_list/s/tok#Intent;scheme=https;package=dev.otherworld.shoppinglist;'
			+ 'S.browser_fallback_url=https%3A%2F%2Fshoppinglist.otherworld.dev%2F;end',
		)
	})
})
