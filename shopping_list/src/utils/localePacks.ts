import { getLanguage } from '@nextcloud/l10n'

export interface ParsingPack {
	units: string[]
	unitAliases: Record<string, string>
	leadingUnits: string[]
	prepositions: string[]
	decimalSeparators: string[]
}

// Eagerly bundle every parsing pack under resources/parsing/*.json
const parsingModules = import.meta.glob<ParsingPack>(
	'../../resources/parsing/*.json',
	{ eager: true, import: 'default' },
)

const parsingPacks: Record<string, ParsingPack> = {}
for (const path in parsingModules) {
	const lang = path.match(/\/([^/]+)\.json$/)?.[1]
	if (lang) parsingPacks[lang] = parsingModules[path]
}

/** The viewer's UI language reduced to its base code (e.g. "pt_BR" -> "pt"). */
export function currentLang(): string {
	const l = (getLanguage() || 'en').toLowerCase()
	return l.split(/[-_]/)[0]
}

/** Parsing pack for the viewer's language, falling back to English. */
export function getParsingPack(): ParsingPack {
	return parsingPacks[currentLang()] ?? parsingPacks.en
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
