import type { Item } from '../types'

const UNIT_ALIASES: Record<string, string> = {
	cups: 'cup', teaspoons: 'teaspoon', tsp: 'teaspoon',
	tablespoons: 'tablespoon', tbsp: 'tablespoon',
	ounces: 'ounce', oz: 'ounce',
	pounds: 'pound', lbs: 'pound', lb: 'pound',
	grams: 'gram', g: 'gram',
	kilograms: 'kilogram', kg: 'kilogram',
	milliliters: 'milliliter', ml: 'milliliter',
	liters: 'liter', l: 'liter',
	cans: 'can', bottles: 'bottle', slices: 'slice',
	pieces: 'piece', cloves: 'clove',
	stalks: 'stalk', sprigs: 'sprig',
	bags: 'bag', packs: 'pack', packets: 'pack',
	pinches: 'pinch', bunches: 'bunch',
	heads: 'head',
}

function canonicalUnit(unit: string): string {
	const lower = unit.toLowerCase()
	return UNIT_ALIASES[lower] ?? lower
}

// Words that should not be singularized (already singular or uncountable)
const SINGULAR_EXCEPTIONS = new Set([
	'asparagus', 'hummus', 'couscous', 'cheese', 'rice', 'juice',
	'lettuce', 'sauce', 'produce', 'grease', 'mousse',
])

function singularize(word: string): string {
	const lower = word.toLowerCase()
	if (lower.length <= 2 || SINGULAR_EXCEPTIONS.has(lower)) return lower

	// ies → y (berries → berry, cherries → cherry)
	if (lower.endsWith('ies')) return lower.slice(0, -3) + 'y'
	// ves → f/fe (loaves → loaf, halves → half)
	if (lower.endsWith('ves')) {
		const stem = lower.slice(0, -3)
		// calves→calf, halves→half, loaves→loaf
		if (stem.endsWith('l') || stem.endsWith('a') || stem.endsWith('oa')) return stem + 'f'
		// knives→knife
		return stem + 'fe'
	}
	// ches, shes, sses, xes, zes → drop "es" (radishes → radish, batches → batch)
	if (lower.endsWith('shes') || lower.endsWith('ches') || lower.endsWith('sses') || lower.endsWith('xes') || lower.endsWith('zes')) {
		return lower.slice(0, -2)
	}
	// oes → o (tomatoes → tomato, potatoes → potato) but not "shoes"
	if (lower.endsWith('oes') && lower !== 'shoes') return lower.slice(0, -2)
	// General s (apples → apple) but not words ending in ss (grass, bass)
	if (lower.endsWith('s') && !lower.endsWith('ss') && !lower.endsWith('us')) return lower.slice(0, -1)

	return lower
}

/**
 * Pluralize a display name. Preserves the original casing of the root.
 */
export function pluralizeName(name: string): string {
	// Only pluralize the last word
	const words = name.split(' ')
	const last = words[words.length - 1]
	const lower = last.toLowerCase()

	if (lower.length <= 1 || SINGULAR_EXCEPTIONS.has(lower)) return name

	// Already plural — check by round-tripping through singularize
	if (singularize(lower) !== lower) return name

	let plural: string
	// consonant + y → ies (berry → berries)
	if (lower.endsWith('y') && !/[aeiou]/.test(lower.charAt(lower.length - 2))) {
		plural = last.slice(0, -1) + 'ies'
	// f/fe → ves (loaf → loaves, knife → knives)
	} else if (lower.endsWith('fe')) {
		plural = last.slice(0, -2) + 'ves'
	} else if (lower.endsWith('f') && !lower.endsWith('ff')) {
		plural = last.slice(0, -1) + 'ves'
	// ch, sh, ss, x, z, o → es (radish → radishes, tomato → tomatoes)
	} else if (/(?:ch|sh|ss|x|z|o)$/.test(lower)) {
		plural = last + 'es'
	} else {
		plural = last + 's'
	}

	words[words.length - 1] = plural
	return words.join(' ')
}

export function normalizeName(name: string): string {
	const cleaned = name
		.toLowerCase()
		.trim()
		.replace(/\s*\(.*?\)\s*/g, ' ')  // strip parentheticals
		.replace(/,\s.*$/, '')             // strip trailing comma notes
		.replace(/\s+/g, ' ')
		.trim()

	// Singularize each word for matching
	return cleaned.split(' ').map(singularize).join(' ')
}

export function findMatchingItem(items: Item[], name: string): Item | undefined {
	const normalized = normalizeName(name)
	return items.find(item => !item.checked && normalizeName(item.name) === normalized)
}

interface ParsedQuantity {
	number: number | null
	unit: string
	raw: string
}

function evalNumber(s: string): number | null {
	// Mixed fraction: "2 1/2"
	const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/)
	if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3])
	// Simple fraction: "1/4"
	const frac = s.match(/^(\d+)\/(\d+)$/)
	if (frac) return parseInt(frac[1]) / parseInt(frac[2])
	// Decimal or integer
	const n = parseFloat(s)
	return isNaN(n) ? null : n
}

function parseQuantity(qty: string | null): ParsedQuantity {
	if (!qty?.trim()) return { number: null, unit: '', raw: qty ?? '' }

	const trimmed = qty.trim()
	const match = trimmed.match(/^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)\s*(.*)$/)

	if (!match) return { number: null, unit: '', raw: trimmed }

	const number = evalNumber(match[1].trim())
	const unit = match[2].trim().toLowerCase()

	return { number, unit, raw: trimmed }
}

export function mergeQuantities(existing: string | null, incoming: string | null): string {
	if (!existing?.trim() && !incoming?.trim()) return ''
	if (!existing?.trim()) return incoming!
	if (!incoming?.trim()) return existing!

	const a = parseQuantity(existing)
	const b = parseQuantity(incoming)

	if (a.number !== null && b.number !== null) {
		if (canonicalUnit(a.unit) === canonicalUnit(b.unit)) {
			const sum = a.number + b.number
			const formatted = Number.isInteger(sum) ? sum.toString() : parseFloat(sum.toFixed(4)).toString()
			// Use the existing item's unit text for display consistency
			return a.unit ? `${formatted} ${a.unit}` : formatted
		}
	}

	// Can't merge — append with "+"
	return `${a.raw} + ${b.raw}`
}
