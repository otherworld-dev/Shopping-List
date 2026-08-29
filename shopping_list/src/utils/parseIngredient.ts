import type { ParsingPack } from './localePacks'

export interface ParsedIngredient {
	name: string
	quantity: string | null
}

function escapeRe(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Ingredient parsing for one language pack.
 *
 * Built as a factory rather than a set of bare functions so the pack is an
 * explicit dependency: components pass getParsingPack(), tests pass a pack
 * directly and need no module mocking.
 */
export function createIngredientParser(pack: ParsingPack) {
	// Strips a connector word after a unit ("2 cups of flour" -> "flour";
	// German "von"). Null when the language defines none.
	const prepositionRe = pack.prepositions.length
		? new RegExp('^(?:' + pack.prepositions.map(escapeRe).join('|') + ')\\s+', 'i')
		: null

	// Decimal mark in the leading quantity: dot, plus comma for languages that
	// use it (e.g. German "0,5"). Built from the active pack so a comma
	// elsewhere in the line is never touched.
	const commaDecimal = pack.decimalSeparators.includes(',')
	const decClass = commaDecimal ? '[.,]' : '\\.'
	const qtyPattern = new RegExp(
		'^([\\d]+(?:\\s+[\\d]+/[\\d]+|/[\\d]+|' + decClass + '\\d+)?(?:\\s*-\\s*[\\d]+(?:/[\\d]+|' + decClass + '\\d+)?)?)\\s*',
	)

	function matchUnit(text: string): string {
		const lower = text.toLowerCase()
		let best = ''
		for (const unit of pack.units) {
			if (lower.startsWith(unit + ' ') || lower.startsWith(unit + ',') || lower === unit) {
				if (unit.length > best.length) best = unit
			}
		}
		return best
	}

	/**
	 * Clean up an ingredient name:
	 * - Remove parenthetical notes: "(chopped)", "(stems removed, chopped)"
	 * - Remove trailing comma descriptions: ", finely diced"
	 * - Capitalize first letter, unless the name is intercapped
	 * - Collapse whitespace
	 */
	function cleanName(raw: string): string {
		let name = raw

		// Remove all parenthetical groups, including nested: (... (... ) ...)
		let prev = ''
		while (prev !== name) {
			prev = name
			name = name.replace(/\s*\([^)]*\)/g, '')
		}

		name = name
			.replace(/[()]/g, '')
			.replace(/,\s*,/g, ',')
			.replace(/,\s*$/, '')
			.replace(/^\s*,\s*/, '')
			.replace(/\s+/g, ' ')
			.trim()

		// Capitalize the first letter, but leave intercapped product names alone:
		// an uppercase second letter means the case is deliberate ("iPhone",
		// "eBay"), and forcing it would corrupt the name.
		if (name.length > 0) {
			const second = name.charAt(1)
			const secondIsUpper = second !== '' && second !== second.toLowerCase()
			if (!secondIsUpper) {
				name = name.charAt(0).toUpperCase() + name.slice(1)
			}
		}
		return name
	}

	function stripConnector(rest: string): string {
		rest = rest.replace(/^,\s*/, '')
		if (prepositionRe) rest = rest.replace(prepositionRe, '')
		return rest.trim()
	}

	/**
	 * Normalise the list markup people paste in from notes apps and chats, so
	 * the quantity logic below sees a plain line.
	 *
	 * A bracketed number is rewritten rather than removed, because it IS the
	 * quantity: "[ 10 ] Aepfel" becomes "10 Aepfel". A checkbox is removed and
	 * its ticked state discarded, since there is no supported way to create an
	 * already-checked item. An ordered-list index is removed rather than read
	 * as a quantity, because "1." numbers the line, it does not count the item.
	 */
	function stripListMarkup(line: string): string {
		let out = line.trim()
		// [ ] / [x] / [X] checkbox. Deliberately does not match "[ 10 ]".
		out = out.replace(/^\[\s*[xX]?\s*\]\s*/, '')
		// [ 10 ] bracketed quantity -> plain leading quantity.
		out = out.replace(/^\[\s*(\d+(?:[.,]\d+)?)\s*\]\s*/, '$1 ')
		// Bullet markers. The trailing space requirement keeps "-3" intact.
		out = out.replace(/^[-*•]\s+/, '')
		// Ordered-list index. Requires the separator and a space, so a decimal
		// like "1.5 kg" is untouched.
		out = out.replace(/^\d+[.)]\s+/, '')
		return out.trim()
	}

	function parseIngredient(line: string): ParsedIngredient {
		const trimmed = stripListMarkup(line)
		if (!trimmed) return { name: '', quantity: null }

		// Lines starting with a unit word without a number ("Pinch of salt",
		// "Prise Salz")
		const trimmedLower = trimmed.toLowerCase()
		for (const unit of pack.leadingUnits) {
			if (trimmedLower.startsWith(unit + ' ') || trimmedLower.startsWith(unit + ',')) {
				const rest = stripConnector(trimmed.slice(unit.length).trim())
				return { name: cleanName(rest || trimmed), quantity: '1 ' + unit }
			}
		}

		const match = trimmed.match(qtyPattern)

		if (!match) {
			return { name: cleanName(trimmed), quantity: null }
		}

		// Normalize a decimal comma to a dot within the matched quantity only
		const qtyStr = commaDecimal ? match[1].trim().replace(/,/g, '.') : match[1].trim()
		let rest = trimmed.slice(match[0].length).trim()

		// "2x Milk" / "2 x Milk" / "2 × Milk": the x is a count marker, not part
		// of the name. Everyday notation in English and German alike.
		const mult = rest.match(/^[x×]\s+/i)
		if (mult) {
			rest = rest.slice(mult[0].length).trim()
			return { name: cleanName(rest || trimmed), quantity: qtyStr }
		}

		// Digits glued straight onto a word only count as a quantity when that
		// word is a unit: "500ml Milk" stays a quantity, but "7up", "7-Eleven"
		// and "3M tape" are names, and splitting them would corrupt them. A
		// comma is a separator ("10, Aepfel"), not a glued word.
		const attached = trimmed.length > match[1].length && !/[\s,]/.test(trimmed.charAt(match[1].length))
		if (attached && !matchUnit(rest)) {
			return { name: cleanName(trimmed), quantity: null }
		}

		// Try to match a unit after the quantity
		const matchedUnit = matchUnit(rest)

		let finalQty = qtyStr
		if (matchedUnit) {
			finalQty = qtyStr + ' ' + matchedUnit
			rest = stripConnector(rest.slice(matchedUnit.length).trim())
		}

		rest = rest.replace(/^,\s*/, '').trim()

		return {
			name: cleanName(rest || trimmed),
			quantity: finalQty,
		}
	}

	return { parseIngredient, stripListMarkup }
}
