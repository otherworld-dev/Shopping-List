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

export function normalizeName(name: string): string {
	return name
		.toLowerCase()
		.trim()
		.replace(/\s*\(.*?\)\s*/g, ' ')  // strip parentheticals
		.replace(/,\s.*$/, '')             // strip trailing comma notes
		.replace(/\s+/g, ' ')
		.trim()
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
