<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service\Parsing;

/**
 * Reads one item line ("2 cups of flour", "[x] Milk") into a name, an amount
 * and whether it was ticked. A port of src/utils/parseIngredient.ts that must
 * give the same answers: tests/fixtures/parsing-cases.json is run through
 * both, so change them together.
 */
final class IngredientParser {
	private ?string $prepositionRe;
	private bool $commaDecimal;
	private string $qtyPattern;

	public function __construct(
		private ParsingPack $pack,
	) {
		// Strips a connector word after a unit ("2 cups of flour" -> "flour")
		$this->prepositionRe = $pack->prepositions === []
			? null
			: '/^(?:' . implode('|', array_map(static fn (string $p) => preg_quote($p, '/'), $pack->prepositions)) . ')\s+/iu';

		// The decimal mark in the leading quantity: a dot, plus a comma for
		// languages that use one, so a comma elsewhere in the line is untouched.
		$this->commaDecimal = in_array(',', $pack->decimalSeparators, true);
		$dec = $this->commaDecimal ? '[.,]' : '\.';
		// [0-9], not \d: with the u flag PHP's \d also takes other scripts' digits, JS's never does
		$this->qtyPattern = '/^([0-9]+(?:\s+[0-9]+\/[0-9]+|\/[0-9]+|' . $dec . '[0-9]+)?(?:\s*-\s*[0-9]+(?:\/[0-9]+|' . $dec . '[0-9]+)?)?)\s*/u';
	}

	/**
	 * Trim as JavaScript's String#trim does, so a no-break space or an
	 * ideographic space from a phone keyboard goes too; PHP's trim() only
	 * knows ASCII whitespace.
	 */
	public static function trim(string $s): string {
		return (string)preg_replace('/^[\s\x{FEFF}]+|[\s\x{FEFF}]+$/u', '', $s);
	}

	/** The line without its list markup ("[x] - Milk" gives "Milk") */
	public function stripListMarkup(string $line): string {
		return $this->readListMarkup($line)[0];
	}

	/** @return array{name: string, quantity: ?string, checked: bool} */
	public function parse(string $line): array {
		[$rest, $checked] = $this->readListMarkup($line);
		return $this->parseLine($rest) + ['checked' => $checked];
	}

	/**
	 * The whole text read as an amount, with an optional unit ("3 pints",
	 * "4"), or null when anything else is left over ("lots", "3 pints milk").
	 * For changing only an item's amount, where a leftover word must never
	 * end up in the item's name.
	 */
	public function parseAmount(string $text): ?string {
		$trimmed = self::trim($text);
		if ($trimmed === '' || !preg_match($this->qtyPattern, $trimmed, $m)) {
			return null;
		}
		$qty = $this->quantityOf($m[1]);
		$rest = self::trim(substr($trimmed, strlen($m[0])));
		if ($rest === '') {
			return $qty;
		}
		$unit = $this->matchUnit($rest);
		return $unit !== '' && mb_strtolower($rest) === $unit ? $qty . ' ' . $unit : null;
	}

	private function quantityOf(string $match): string {
		$qty = self::trim($match);
		return $this->commaDecimal ? str_replace(',', '.', $qty) : $qty;
	}

	private function matchUnit(string $text): string {
		$lower = mb_strtolower($text);
		$best = '';
		foreach ($this->pack->units as $unit) {
			if (str_starts_with($lower, $unit . ' ') || str_starts_with($lower, $unit . ',') || $lower === $unit) {
				if (mb_strlen($unit) > mb_strlen($best)) {
					$best = $unit;
				}
			}
		}
		return $best;
	}

	/**
	 * Drop notes in brackets, stray commas and extra spaces, and capitalise
	 * the first letter unless the name is intercapped ("iPhone", "eBay").
	 */
	private function cleanName(string $raw): string {
		$name = $raw;
		// Nested brackets go from the inside out
		do {
			$prev = $name;
			$name = (string)preg_replace('/\s*\([^)]*\)/u', '', $name);
		} while ($prev !== $name);

		$name = (string)preg_replace('/[()]/u', '', $name);
		$name = (string)preg_replace('/,\s*,/u', ',', $name);
		$name = (string)preg_replace('/,\s*$/u', '', $name);
		$name = (string)preg_replace('/^\s*,\s*/u', '', $name);
		$name = self::trim((string)preg_replace('/\s+/u', ' ', $name));

		if ($name !== '') {
			$second = mb_substr($name, 1, 1);
			$secondIsUpper = $second !== '' && $second !== mb_strtolower($second);
			if (!$secondIsUpper) {
				$name = mb_strtoupper(mb_substr($name, 0, 1)) . mb_substr($name, 1);
			}
		}
		return $name;
	}

	private function stripConnector(string $rest): string {
		$rest = (string)preg_replace('/^,\s*/u', '', $rest);
		if ($this->prepositionRe !== null) {
			$rest = (string)preg_replace($this->prepositionRe, '', $rest);
		}
		return self::trim($rest);
	}

	/**
	 * Remove the list markup people paste from notes apps and chats, and
	 * report a ticked checkbox. "[ 10 ] Aepfel" keeps its number as the
	 * quantity; "1." numbers the line, so it goes. Markers can nest either
	 * way round, so this repeats until the line stops changing.
	 *
	 * @return array{0: string, 1: bool}
	 */
	private function readListMarkup(string $line): array {
		$out = self::trim($line);
		$checked = false;
		do {
			$prev = $out;
			if (preg_match('/^\[\s*([xX]?)\s*\]\s*/u', $out, $box)) {
				if ($box[1] !== '') {
					$checked = true;
				}
				$out = substr($out, strlen($box[0]));
			}
			$out = (string)preg_replace('/^\[\s*([0-9]+(?:[.,][0-9]+)?)\s*\]\s*/u', '$1 ', $out);
			$out = (string)preg_replace('/^[-*•]\s+/u', '', $out);
			$out = (string)preg_replace('/^[0-9]+[.)]\s+/u', '', $out);
		} while ($prev !== $out);
		return [self::trim($out), $checked];
	}

	/** @return array{name: string, quantity: ?string} */
	private function parseLine(string $trimmed): array {
		if ($trimmed === '') {
			return ['name' => '', 'quantity' => null];
		}

		// A unit word with no number ("Pinch of salt", "Prise Salz")
		$trimmedLower = mb_strtolower($trimmed);
		foreach ($this->pack->leadingUnits as $unit) {
			if (str_starts_with($trimmedLower, $unit . ' ') || str_starts_with($trimmedLower, $unit . ',')) {
				$rest = $this->stripConnector(self::trim(mb_substr($trimmed, mb_strlen($unit))));
				return ['name' => $this->cleanName($rest !== '' ? $rest : $trimmed), 'quantity' => '1 ' . $unit];
			}
		}

		if (!preg_match($this->qtyPattern, $trimmed, $m)) {
			return ['name' => $this->cleanName($trimmed), 'quantity' => null];
		}

		$qty = $this->quantityOf($m[1]);
		// The match is all ASCII, so byte offsets and character offsets agree
		$rest = self::trim(substr($trimmed, strlen($m[0])));

		// "2x Milk" / "2 × Milk": the x counts, it is not part of the name
		if (preg_match('/^[x×]\s+/iu', $rest, $mult)) {
			$rest = self::trim(substr($rest, strlen($mult[0])));
			return ['name' => $this->cleanName($rest !== '' ? $rest : $trimmed), 'quantity' => $qty];
		}

		// Digits glued onto a word only count when the word is a unit: "500ml"
		// is an amount, "7up" and "3M tape" are names.
		$next = mb_substr(substr($trimmed, strlen($m[1])), 0, 1);
		$attached = $next !== '' && !preg_match('/[\s,]/u', $next);
		$unit = $this->matchUnit($rest);
		if ($attached && $unit === '') {
			return ['name' => $this->cleanName($trimmed), 'quantity' => null];
		}

		if ($unit !== '') {
			$qty .= ' ' . $unit;
			$rest = $this->stripConnector(self::trim(mb_substr($rest, mb_strlen($unit))));
		}

		$rest = self::trim((string)preg_replace('/^,\s*/u', '', $rest));

		return ['name' => $this->cleanName($rest !== '' ? $rest : $trimmed), 'quantity' => $qty];
	}
}
