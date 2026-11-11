<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service\Parsing;

use OCA\Shopping_List\Db\Item;

/**
 * Spotting an item that is already on the list and adding up its amount,
 * so "milk" added twice tops up one Milk instead of making two. A port of
 * src/utils/itemMerge.ts; tests/fixtures/merge-cases.json is run through
 * both, so change them together.
 */
final class ItemMerge {
	/**
	 * English uncountable or already-singular nouns, so topping up "Milk"
	 * never renames it "Milks". Anything here ending in "s" also changes
	 * duplicate matching, through singularize.
	 */
	private const SINGULAR_EXCEPTIONS = [
		'asparagus', 'hummus', 'couscous', 'cheese', 'rice', 'juice',
		'lettuce', 'sauce', 'produce', 'grease', 'mousse',
		'milk', 'bread', 'butter', 'flour', 'sugar', 'salt', 'water', 'cream',
		'honey', 'coffee', 'tea', 'cocoa', 'pasta', 'spaghetti', 'meat', 'beef',
		'pork', 'lamb', 'mince', 'bacon', 'ham', 'fish', 'salmon', 'tuna', 'oil',
		'vinegar', 'ketchup', 'mayonnaise', 'mustard', 'garlic', 'ginger',
		'spinach', 'broccoli', 'celery', 'sweetcorn', 'tofu', 'gravy', 'custard',
		'granola', 'muesli', 'foil', 'bleach', 'toothpaste',
	];

	public function __construct(
		private ParsingPack $pack,
	) {
	}

	/** Case- and accent-insensitive, as fold() in src/utils/fold.ts */
	public static function fold(string $s): string {
		if (class_exists('\Normalizer')) {
			$s = \Normalizer::normalize($s, \Normalizer::FORM_D) ?: $s;
		}
		$s = preg_replace('/[\x{0300}-\x{036F}]/u', '', $s) ?? $s;
		return mb_strtolower($s);
	}

	private function singularize(string $word): string {
		$lower = mb_strtolower($word);
		if (mb_strlen($lower) <= 2 || in_array($lower, self::SINGULAR_EXCEPTIONS, true)) {
			return $lower;
		}
		// berries -> berry
		if (str_ends_with($lower, 'ies')) {
			return mb_substr($lower, 0, -3) . 'y';
		}
		// loaves -> loaf, halves -> half, knives -> knife
		if (str_ends_with($lower, 'ves')) {
			$stem = mb_substr($lower, 0, -3);
			if (str_ends_with($stem, 'l') || str_ends_with($stem, 'a') || str_ends_with($stem, 'oa')) {
				return $stem . 'f';
			}
			return $stem . 'fe';
		}
		// radishes -> radish, batches -> batch
		foreach (['shes', 'ches', 'sses', 'xes', 'zes'] as $ending) {
			if (str_ends_with($lower, $ending)) {
				return mb_substr($lower, 0, -2);
			}
		}
		// tomatoes -> tomato, but not shoes
		if (str_ends_with($lower, 'oes') && $lower !== 'shoes') {
			return mb_substr($lower, 0, -2);
		}
		// apples -> apple, but not grass or hummus
		if (str_ends_with($lower, 's') && !str_ends_with($lower, 'ss') && !str_ends_with($lower, 'us')) {
			return mb_substr($lower, 0, -1);
		}
		return $lower;
	}

	/** The plural of a name's last word, English only; any other language is left alone. */
	public function pluralizeName(string $name): string {
		if (!$this->pack->morphology) {
			return $name;
		}

		$words = explode(' ', $name);
		$last = $words[count($words) - 1];
		$lower = mb_strtolower($last);

		if (mb_strlen($lower) <= 1 || in_array($lower, self::SINGULAR_EXCEPTIONS, true)) {
			return $name;
		}
		// Already plural
		if ($this->singularize($lower) !== $lower) {
			return $name;
		}

		if (str_ends_with($lower, 'y') && !preg_match('/[aeiou]/', mb_substr($lower, -2, 1))) {
			$plural = mb_substr($last, 0, -1) . 'ies';
		} elseif (str_ends_with($lower, 'fe')) {
			$plural = mb_substr($last, 0, -2) . 'ves';
		} elseif (str_ends_with($lower, 'f') && !str_ends_with($lower, 'ff')) {
			$plural = mb_substr($last, 0, -1) . 'ves';
		} elseif (preg_match('/(?:ch|sh|ss|x|z|o)$/', $lower)) {
			$plural = $last . 'es';
		} else {
			$plural = $last . 's';
		}

		$words[count($words) - 1] = $plural;
		return implode(' ', $words);
	}

	/** The form two names are compared in: folded, notes dropped, English singular. */
	public function normalizeName(string $name): string {
		$cleaned = IngredientParser::trim(self::fold($name));
		$cleaned = (string)preg_replace('/\s*[(（][^)）]*[)）]\s*/u', ' ', $cleaned);
		$cleaned = (string)preg_replace('/(?:,\s|，\s*).*$/u', '', $cleaned);
		$cleaned = IngredientParser::trim((string)preg_replace('/\s+/u', ' ', $cleaned));

		// Other languages skip this: German "Eis" and "Ei" are different things
		if (!$this->pack->morphology) {
			return $cleaned;
		}
		return implode(' ', array_map(fn (string $w) => $this->singularize($w), explode(' ', $cleaned)));
	}

	/** @param Item[] $items */
	public function findOpenMatch(array $items, string $name): ?Item {
		$normalized = $this->normalizeName($name);
		foreach ($items as $item) {
			if (!$item->getChecked() && $this->normalizeName($item->getName()) === $normalized) {
				return $item;
			}
		}
		return null;
	}

	/**
	 * A ticked-off item of the same name, to bring back rather than add
	 * another beside it.
	 *
	 * @param Item[] $items
	 */
	public function findCheckedMatch(array $items, string $name): ?Item {
		$normalized = $this->normalizeName($name);
		foreach ($items as $item) {
			if ($item->getChecked() && $this->normalizeName($item->getName()) === $normalized) {
				return $item;
			}
		}
		return null;
	}

	private function canonicalUnit(string $unit): string {
		$lower = mb_strtolower($unit);
		return $this->pack->unitAliases[$lower] ?? $lower;
	}

	private static function evalNumber(string $s): ?float {
		if (preg_match('/^([0-9]+)\s+([0-9]+)\/([0-9]+)$/', $s, $m)) {
			return (int)$m[3] === 0 ? null : (int)$m[1] + (int)$m[2] / (int)$m[3];
		}
		if (preg_match('/^([0-9]+)\/([0-9]+)$/', $s, $m)) {
			return (int)$m[2] === 0 ? null : (int)$m[1] / (int)$m[2];
		}
		return is_numeric($s) ? (float)$s : null;
	}

	/** @return array{number: ?float, unit: string, raw: string} */
	private static function parseQuantity(?string $qty): array {
		$trimmed = IngredientParser::trim($qty ?? '');
		if ($trimmed === '' || !preg_match('/^([0-9]+(?:\s+[0-9]+\/[0-9]+|\.[0-9]+|\/[0-9]+)?)\s*(.*)$/u', $trimmed, $m)) {
			return ['number' => null, 'unit' => '', 'raw' => $trimmed];
		}
		return ['number' => self::evalNumber(IngredientParser::trim($m[1])), 'unit' => mb_strtolower(IngredientParser::trim($m[2])), 'raw' => $trimmed];
	}

	/** Like Number#toString after toFixed(4): "2", "0.75", "0.3" */
	private static function formatNumber(float $n): string {
		if (floor($n) === $n && abs($n) < 1e15) {
			return (string)(int)$n;
		}
		return rtrim(rtrim(number_format($n, 4, '.', ''), '0'), '.');
	}

	/** Two amounts added up when their units agree, otherwise joined with "+". */
	public function mergeQuantities(?string $existing, ?string $incoming): string {
		$hasExisting = IngredientParser::trim($existing ?? '') !== '';
		$hasIncoming = IngredientParser::trim($incoming ?? '') !== '';
		if (!$hasExisting && !$hasIncoming) {
			return '';
		}
		if (!$hasExisting) {
			return (string)$incoming;
		}
		if (!$hasIncoming) {
			return (string)$existing;
		}

		$a = self::parseQuantity($existing);
		$b = self::parseQuantity($incoming);

		if ($a['number'] !== null && $b['number'] !== null
			&& $this->canonicalUnit($a['unit']) === $this->canonicalUnit($b['unit'])) {
			$formatted = self::formatNumber($a['number'] + $b['number']);
			// The existing item's unit text, so the name on the list doesn't change
			return $a['unit'] !== '' ? $formatted . ' ' . $a['unit'] : $formatted;
		}

		return $a['raw'] . ' + ' . $b['raw'];
	}
}
