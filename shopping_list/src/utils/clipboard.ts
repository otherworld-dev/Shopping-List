/**
 * Copy text to the clipboard. Browsers only offer the Clipboard API on https
 * and localhost, and plenty of home servers run on plain http, so without it
 * this falls back to selecting a hidden textarea and execCommand('copy').
 * Resolves to whether the text was copied.
 */
export async function copyToClipboard(
	text: string,
	clipboard: { writeText(text: string): Promise<void> } | undefined = navigator.clipboard,
	doc: Document = document,
): Promise<boolean> {
	if (clipboard) {
		try {
			await clipboard.writeText(text)
			return true
		} catch {
			// Refused or unavailable: try the old way below
		}
	}
	const area = doc.createElement('textarea')
	area.value = text
	area.setAttribute('readonly', '')
	area.style.position = 'fixed'
	area.style.opacity = '0'
	doc.body.appendChild(area)
	area.select()
	try {
		return doc.execCommand('copy')
	} catch {
		return false
	} finally {
		area.remove()
	}
}
