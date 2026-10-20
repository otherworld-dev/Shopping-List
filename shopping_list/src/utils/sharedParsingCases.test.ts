import { describe, expect, it } from 'vitest'
import enJson from '../../resources/parsing/en.json'
import deJson from '../../resources/parsing/de.json'
import cases from '../../tests/fixtures/parsing-cases.json'
import { createIngredientParser } from './parseIngredient'
import type { ParsingPack } from './localePacks'

// The same lines are run through the PHP port by tests/Unit/IngredientParserTest.php,
// so the two parsers can't drift apart.
const pack = (raw: object): ParsingPack => ({ ...raw, unitAliases: {} } as ParsingPack)
const parsers = {
	en: createIngredientParser(pack(enJson)),
	de: createIngredientParser(pack(deJson)),
}

describe('shared parsing cases', () => {
	for (const c of cases as { lang: 'en' | 'de', line: string, name: string, quantity: string | null, checked: boolean }[]) {
		it(`${c.lang}: ${JSON.stringify(c.line)}`, () => {
			expect(parsers[c.lang].parseIngredient(c.line)).toEqual({ name: c.name, quantity: c.quantity, checked: c.checked })
		})
	}
})
