/**
 * The "Open in the app" button on a public list page, for Android phones. Every Nextcloud is
 * its own domain, so the app can't claim these links itself; an intent: link hands the page's
 * address to it instead, or opens the website (which links to Play and F-Droid) when the app
 * isn't installed. Chrome, Firefox and Samsung Internet follow intent: links.
 */

export const ANDROID_PACKAGE = 'dev.otherworld.shoppinglist'

export const APP_WEBSITE = 'https://shoppinglist.otherworld.dev/'

export function isAndroid(userAgent: string): boolean {
	return /\bAndroid\b/i.test(userAgent)
}

export function openInAppUrl(pageUrl: string): string {
	const url = new URL(pageUrl)
	return `intent://${url.host}${url.pathname}#Intent;scheme=https;package=${ANDROID_PACKAGE};`
		+ `S.browser_fallback_url=${encodeURIComponent(APP_WEBSITE)};end`
}
