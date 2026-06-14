/**
 * Language-neutral text folding for matching and duplicate detection.
 *
 * Strips LATIN diacritics (NFD, then remove only the U+0300–U+036F combining
 * marks block) and lowercases with a locale-INDEPENDENT mapping (toLowerCase,
 * never toLocaleLowerCase) so the same string folds identically regardless of
 * the viewer's locale — keeping shared lists consistent across languages.
 *
 * Only the Latin block is stripped, NOT all \p{Mn}: Japanese kana voicing marks
 * (U+3099/U+309A) and Arabic/Hebrew vowel marks are themselves combining marks
 * produced by NFD, so stripping all of them would corrupt those scripts
 * (バ -> ハ). For scripts without Latin diacritics or case this is a no-op.
 *
 * Examples: "Café" -> "cafe", "Jalapeño" -> "jalapeno", "ÄPFEL" -> "apfel",
 * "バナナ" -> "バナナ" (unchanged).
 */
export function fold(s: string): string {
	return s
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // Latin Combining Diacritical Marks only
		.toLowerCase()
}
