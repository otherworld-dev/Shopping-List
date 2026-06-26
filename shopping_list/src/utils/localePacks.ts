import { getLanguage } from '@nextcloud/l10n'

export interface ParsingPack {
	units: string[]
	unitAliases: Record<string, string>
	leadingUnits: string[]
	prepositions: string[]
	decimalSeparators: string[]
}

// Raw on-disk pack: everything except unitAliases, which lives in code (below).
type RawParsingPack = Omit<ParsingPack, 'unitAliases'>

/**
 * English unit aliases (abbreviations + plurals -> canonical form), used only to
 * canonicalise units when merging duplicate items ("2 cups" + "1 cup" -> 3 cups).
 *
 * These deliberately live in code, NOT in the translatable parsing JSON: every
 * value is just another English unit word ("cup" -> "cup"), so exposing them on
 * Crowdin added ~30 un-translatable strings that could never reach 100% and
 * confused translators. Other languages get no aliases (exact-string merge still
 * works); a language pack can be given its own map here if it ever needs one.
 */
const EN_UNIT_ALIASES: Record<string, string> = {
	cups: 'cup',
	teaspoons: 'teaspoon',
	tsp: 'teaspoon',
	tablespoons: 'tablespoon',
	tbsp: 'tablespoon',
	ounces: 'ounce',
	oz: 'ounce',
	pounds: 'pound',
	lbs: 'pound',
	lb: 'pound',
	grams: 'gram',
	g: 'gram',
	kilograms: 'kilogram',
	kg: 'kilogram',
	milliliters: 'milliliter',
	ml: 'milliliter',
	liters: 'liter',
	l: 'liter',
	cans: 'can',
	bottles: 'bottle',
	slices: 'slice',
	pieces: 'piece',
	cloves: 'clove',
	stalks: 'stalk',
	sprigs: 'sprig',
	bags: 'bag',
	packs: 'pack',
	packets: 'pack',
	pinches: 'pinch',
	bunches: 'bunch',
	heads: 'head',
}

// Eagerly bundle every parsing pack under resources/parsing/*.json
const parsingModules = import.meta.glob<RawParsingPack>(
	'../../resources/parsing/*.json',
	{ eager: true, import: 'default' },
)

const parsingPacks: Record<string, ParsingPack> = {}
for (const path in parsingModules) {
	const lang = path.match(/\/([^/]+)\.json$/)?.[1]?.toLowerCase()
	if (!lang) continue
	// Aliases come from code: English gets its map, other languages get none.
	const unitAliases = lang === 'en' ? EN_UNIT_ALIASES : {}
	parsingPacks[lang] = { ...parsingModules[path], unitAliases }
}

/**
 * Locale candidates, most specific first: full locale, base code, English.
 * Lets a region use its own pack ("pt_br") or fall back to the base ("pt")
 * and finally English — robust to whatever Crowdin names the file.
 */
function langCandidates(): string[] {
	const raw = (getLanguage() || 'en').toLowerCase().replace(/-/g, '_')
	const base = raw.split('_')[0]
	const out = [raw]
	if (base !== raw) out.push(base)
	out.push('en')
	return out
}

/** The viewer's UI language reduced to its base code (e.g. "pt_BR" -> "pt"). */
export function currentLang(): string {
	return (getLanguage() || 'en').toLowerCase().split(/[-_]/)[0]
}

/** Parsing pack for the viewer's language, falling back to English. */
export function getParsingPack(): ParsingPack {
	for (const cand of langCandidates()) {
		if (parsingPacks[cand]) return parsingPacks[cand]
	}
	return parsingPacks.en
}

/**
 * Languages with registered morphology rules (singular/plural). English only
 * for now; other languages safely skip the singular/plural niceties rather
 * than apply English grammar to non-English words.
 */
const MORPHOLOGY_LANGS = new Set(['en'])

export function hasMorphology(): boolean {
	return MORPHOLOGY_LANGS.has(currentLang())
}
