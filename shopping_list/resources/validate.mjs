#!/usr/bin/env node
/**
 * Validate locale packs (keywords + parsing) before merging a translation PR.
 *
 * Hard errors (exit 1): malformed JSON/shape, missing area keys, wrong types.
 * Warnings (exit 0): tokens that aren't lowercase, very short Latin tokens that
 * risk substring leakage, duplicates, and cross-area substring collisions.
 *
 * Run: npm run keywords:validate
 */
import { readFileSync, readdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const KEYWORDS_DIR = join(ROOT, 'keywords')
const PARSING_DIR = join(ROOT, 'parsing')

const AREA_KEYS = [
	'Produce', 'Dairy', 'Bakery', 'Meat & Seafood', 'Frozen', 'Beverages',
	'Snacks', 'Household', 'Personal Care', 'General', 'Pets', 'Other',
]

let errors = 0
let warnings = 0
const err = (m) => { console.error('  x ' + m); errors++ }
const warn = (m) => { console.warn('  ! ' + m); warnings++ }

function splitTokens(joined) {
	return joined.split(/[,\n]/).map(t => t.trim()).filter(Boolean)
}

// Matches the runtime fold() (NFD + strip Latin combining marks + lowercase)
function fold(s) {
	return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

// After fold(), Latin tokens are ASCII letters; CJK/other scripts are not — so
// the short-token leakage warning only applies to Latin tokens.
function isShortLatin(f) {
	return /^[a-z]+$/.test(f) && f.length < 3
}

function validateKeywords(file, data) {
	if (typeof data !== 'object' || data === null || Array.isArray(data)) {
		err(`${file}: must be a JSON object keyed by area name`)
		return
	}
	for (const key of AREA_KEYS) {
		if (!(key in data)) err(`${file}: missing area "${key}"`)
	}
	for (const key of Object.keys(data)) {
		if (!AREA_KEYS.includes(key)) warn(`${file}: unknown area "${key}" (ignored at seed time)`)
		if (key in data && typeof data[key] !== 'string') {
			err(`${file}: area "${key}" must be a comma/newline-joined string`)
		}
	}

	const byArea = {}
	for (const key of AREA_KEYS) {
		if (typeof data[key] !== 'string') continue
		const seen = new Set()
		byArea[key] = []
		for (const tok of splitTokens(data[key])) {
			const f = fold(tok)
			if (tok !== tok.toLowerCase()) warn(`${file} [${key}]: "${tok}" is not lowercase`)
			if (seen.has(f)) { warn(`${file} [${key}]: duplicate "${tok}"`); continue }
			seen.add(f)
			byArea[key].push(f)
			if (isShortLatin(f)) warn(`${file} [${key}]: very short token "${tok}" may match inside unrelated words`)
		}
	}
	// Earlier-sorted area's token appearing inside a later area's token (would win by area order)
	for (let i = 0; i < AREA_KEYS.length; i++) {
		const a = byArea[AREA_KEYS[i]] || []
		for (let j = i + 1; j < AREA_KEYS.length; j++) {
			const b = byArea[AREA_KEYS[j]] || []
			for (const ta of a) {
				for (const tb of b) {
					if (tb.includes(ta)) warn(`${file}: "${AREA_KEYS[i]}" token "${ta}" is a substring of "${AREA_KEYS[j]}" token "${tb}"`)
				}
			}
		}
	}
}

function validateParsing(file, data) {
	for (const k of ['units', 'leadingUnits', 'prepositions', 'decimalSeparators']) {
		if (!Array.isArray(data?.[k])) { err(`${file}: "${k}" must be an array`); continue }
		for (const v of data[k]) {
			if (typeof v !== 'string') err(`${file}: "${k}" entries must be strings`)
			else if (k === 'units' && v !== v.toLowerCase()) warn(`${file} [units]: "${v}" is not lowercase`)
		}
	}
	// unitAliases intentionally NOT a translatable field — it lives in code
	// (localePacks.ts EN_UNIT_ALIASES). A stray one in a pack is harmless noise.
	if ('unitAliases' in (data ?? {})) {
		warn(`${file}: "unitAliases" is ignored (aliases live in code, not the pack)`)
	}
}

function run(dir, validator, label) {
	if (!existsSync(dir)) { warn(`${label} dir not found: ${dir}`); return }
	for (const f of readdirSync(dir).filter(n => n.endsWith('.json'))) {
		console.log(`Checking ${label}/${f}`)
		let data
		try {
			data = JSON.parse(readFileSync(join(dir, f), 'utf8'))
		} catch (e) {
			err(`${f}: invalid JSON — ${e.message}`)
			continue
		}
		validator(f, data)
	}
}

run(KEYWORDS_DIR, validateKeywords, 'keywords')
run(PARSING_DIR, validateParsing, 'parsing')

console.log(`\n${errors} error(s), ${warnings} warning(s).`)
process.exit(errors > 0 ? 1 : 0)
