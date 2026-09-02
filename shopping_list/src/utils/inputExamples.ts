/**
 * The example lines shown in the add box's input help, one per format the
 * parser understands: a bullet, a checkbox with a count, a ticked checkbox
 * (imported as already checked off), an amount with a unit, and a numbered
 * line.
 *
 * These are gettext source strings. Translators swap the words for their own
 * language (and a unit from their parsing pack) but keep the markup. The help
 * popover runs each translated line through the live parser and shows the
 * result, so the help can never promise something the parser would not do.
 * inputExamples.test.ts pins what the English lines produce.
 */
export const INPUT_EXAMPLES: readonly string[] = [
	'- Apples',
	'[ ] 3 Bananas',
	'[x] Eggs',
	'2 cups flour',
	'1. Milk',
]
