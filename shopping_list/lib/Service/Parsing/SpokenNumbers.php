<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service\Parsing;

/**
 * A number said out loud at the start of a line, turned into digits so the
 * parser can read it: speech engines often write "two pints of milk" rather
 * than "2 pints of milk". English only, and only on lines that come in as
 * text from an integration; typing in the web app never goes through this.
 */
final class SpokenNumbers {
	/** Longer phrases first, so "half a" and "a dozen" win over "half" and "a" */
	private const ENGLISH = [
		'half a' => '0.5',
		'a dozen' => '12',
		'one' => '1',
		'two' => '2',
		'three' => '3',
		'four' => '4',
		'five' => '5',
		'six' => '6',
		'seven' => '7',
		'eight' => '8',
		'nine' => '9',
		'ten' => '10',
		'eleven' => '11',
		'twelve' => '12',
		'thirteen' => '13',
		'fourteen' => '14',
		'fifteen' => '15',
		'sixteen' => '16',
		'seventeen' => '17',
		'eighteen' => '18',
		'nineteen' => '19',
		'twenty' => '20',
		'an' => '1',
		'a' => '1',
		'half' => '0.5',
	];

	public static function normalise(string $line, string $language): string {
		$base = mb_strtolower(explode('_', str_replace('-', '_', $language))[0]);
		if ($base !== 'en') {
			return $line;
		}
		foreach (self::ENGLISH as $words => $digits) {
			// A whole word with something after it: a bare "a" stays, "anchovies" is untouched
			$pattern = '/^\s*' . str_replace(' ', '\s+', preg_quote($words, '/')) . '(?=\s+\S)/iu';
			if (preg_match($pattern, $line, $m)) {
				return $digits . substr($line, strlen($m[0]));
			}
		}
		return $line;
	}
}
