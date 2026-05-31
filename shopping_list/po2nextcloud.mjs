#!/usr/bin/env node
/**
 * Convert PO files from translationfiles/<locale>/shopping_list.po
 * to Nextcloud l10n/<locale>.json and l10n/<locale>.js
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const APP_ID = 'shopping_list'
const TRANSLATIONS_DIR = join(__dirname, 'translationfiles')
const L10N_DIR = join(__dirname, 'l10n')

function parsePo(content) {
	const translations = {}
	let pluralForm = 'nplurals=2; plural=(n != 1);'

	// Normalize line endings
	content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

	// Extract plural form from header
	const pluralMatch = content.match(/Plural-Forms:\s*(.+?)\\n/)
	if (pluralMatch) {
		pluralForm = pluralMatch[1].trim()
		if (pluralForm.endsWith(';')) {
			// keep as-is
		} else {
			pluralForm += ';'
		}
	}

	// Split into entries by double newline
	const entries = content.split(/\n\n+/)

	for (const entry of entries) {
		const lines = entry.trim().split('\n')

		let msgid = ''
		let msgstr = ''
		let current = null

		for (const line of lines) {
			if (line.startsWith('#')) continue

			if (line.startsWith('msgid ')) {
				current = 'msgid'
				msgid = extractQuoted(line.substring(6))
			} else if (line.startsWith('msgstr ')) {
				current = 'msgstr'
				msgstr = extractQuoted(line.substring(7))
			} else if (line.startsWith('"') && current) {
				const val = extractQuoted(line)
				if (current === 'msgid') msgid += val
				else if (current === 'msgstr') msgstr += val
			}
		}

		// Skip empty msgid (header) and untranslated strings
		if (msgid && msgstr) {
			translations[msgid] = msgstr
		}
	}

	return { translations, pluralForm }
}

function extractQuoted(str) {
	const match = str.match(/^"(.*)"$/)
	if (!match) return ''
	return match[1]
		.replace(/\\n/g, '\n')
		.replace(/\\t/g, '\t')
		.replace(/\\"/g, '"')
		.replace(/\\\\/g, '\\')
}

// Ensure l10n directory exists
mkdirSync(L10N_DIR, { recursive: true })

// Find all locale directories
const localeDirs = readdirSync(TRANSLATIONS_DIR).filter(d => {
	if (d === 'templates' || d === 'README.md') return false
	const poFile = join(TRANSLATIONS_DIR, d, 'shopping_list.po')
	return existsSync(poFile)
})

let converted = 0

for (const locale of localeDirs) {
	const poPath = join(TRANSLATIONS_DIR, locale, 'shopping_list.po')
	const content = readFileSync(poPath, 'utf8')
	const { translations, pluralForm } = parsePo(content)

	// Skip locales with no translations
	if (Object.keys(translations).length === 0) {
		console.log(`  skip ${locale} (no translations)`)
		continue
	}

	// Write JSON
	const jsonData = {
		translations,
		pluralForm,
	}
	writeFileSync(
		join(L10N_DIR, `${locale}.json`),
		JSON.stringify(jsonData, null, 4) + '\n',
		'utf8',
	)

	// Write JS
	const jsTranslations = JSON.stringify(translations, null, 4)
	const jsContent = `OC.L10N.register(\n    "${APP_ID}",\n    ${jsTranslations},\n"${pluralForm}");\n`
	writeFileSync(
		join(L10N_DIR, `${locale}.js`),
		jsContent,
		'utf8',
	)

	console.log(`  ${locale}: ${Object.keys(translations).length} strings`)
	converted++
}

console.log(`\nConverted ${converted} locales to l10n/`)
