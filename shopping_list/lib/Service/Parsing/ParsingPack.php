<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service\Parsing;

/**
 * One language's words for reading an item line: units, units that can lead
 * a line on their own ("Pinch of salt"), connector words ("of") and decimal
 * marks. The same resources/parsing/*.json packs the web app bundles, read
 * the way src/utils/localePacks.ts reads them, so both sides parse alike.
 */
final class ParsingPack {
	/**
	 * English unit aliases, used only to add up amounts when merging a
	 * duplicate ("2 cups" + "1 cup"). Kept in code, as in localePacks.ts,
	 * because they are not words a translator can do anything with.
	 */
	private const EN_UNIT_ALIASES = [
		'cups' => 'cup',
		'teaspoons' => 'teaspoon',
		'tsp' => 'teaspoon',
		'tablespoons' => 'tablespoon',
		'tbsp' => 'tablespoon',
		'ounces' => 'ounce',
		'oz' => 'ounce',
		'pounds' => 'pound',
		'lbs' => 'pound',
		'lb' => 'pound',
		'grams' => 'gram',
		'g' => 'gram',
		'kilograms' => 'kilogram',
		'kg' => 'kilogram',
		'milliliters' => 'milliliter',
		'ml' => 'milliliter',
		'liters' => 'liter',
		'l' => 'liter',
		'cans' => 'can',
		'bottles' => 'bottle',
		'slices' => 'slice',
		'pieces' => 'piece',
		'pcs' => 'piece',
		'pc' => 'piece',
		'dkg' => 'dag',
		'cloves' => 'clove',
		'stalks' => 'stalk',
		'sprigs' => 'sprig',
		'bags' => 'bag',
		'packs' => 'pack',
		'packets' => 'pack',
		'pkg' => 'pack',
		'pinches' => 'pinch',
		'bunches' => 'bunch',
		'heads' => 'head',
		'pints' => 'pint',
		'litre' => 'liter',
		'litres' => 'liter',
		'loaves' => 'loaf',
		'tins' => 'tin',
		'boxes' => 'box',
		'cartons' => 'carton',
	];

	/** Languages with singular/plural rules, as MORPHOLOGY_LANGS in localePacks.ts */
	private const MORPHOLOGY_LANGS = ['en'];

	private const DIR = __DIR__ . '/../../../resources/parsing';

	/** @var array<string, self> */
	private static array $cache = [];

	/**
	 * @param string[] $units
	 * @param array<string, string> $unitAliases
	 * @param string[] $leadingUnits
	 * @param string[] $prepositions
	 * @param string[] $decimalSeparators
	 */
	private function __construct(
		public readonly string $language,
		public readonly array $units,
		public readonly array $unitAliases,
		public readonly array $leadingUnits,
		public readonly array $prepositions,
		public readonly array $decimalSeparators,
		public readonly bool $morphology,
	) {
	}

	/**
	 * The pack for a Nextcloud language code: the full locale ("pt_BR"), then
	 * the base code ("pt"), then English, so a region can have its own pack
	 * or share its language's, and a missing or broken pack never stops a parse.
	 */
	public static function forLanguage(string $languageCode): self {
		$norm = mb_strtolower(str_replace('-', '_', $languageCode));
		$candidates = [];
		if ($norm !== '') {
			$candidates[] = $norm;
			$base = explode('_', $norm)[0];
			if ($base !== '' && $base !== $norm) {
				$candidates[] = $base;
			}
		}
		$candidates[] = 'en';

		$files = self::availablePacks();
		foreach ($candidates as $cand) {
			if (!isset($files[$cand])) {
				continue;
			}
			$pack = self::load($files[$cand]);
			if ($pack !== null) {
				return $pack;
			}
		}
		// Only reachable if en.json itself is broken: parse with no words at all.
		return new self('en', [], self::EN_UNIT_ALIASES, [], [], ['.'], true);
	}

	/**
	 * Pack files by lower-case name, so "pt_BR" from Nextcloud finds
	 * pt_BR.json whatever the case of either.
	 *
	 * @return array<string, string>
	 */
	private static function availablePacks(): array {
		$out = [];
		foreach (glob(self::DIR . '/*.json') ?: [] as $path) {
			$name = basename($path, '.json');
			$out[mb_strtolower($name)] = $name;
		}
		return $out;
	}

	private static function load(string $name): ?self {
		if (isset(self::$cache[$name])) {
			return self::$cache[$name];
		}
		$raw = @file_get_contents(self::DIR . '/' . $name . '.json');
		$data = $raw === false ? null : json_decode($raw, true);
		if (!is_array($data)) {
			return null;
		}
		$lower = mb_strtolower($name);
		$base = explode('_', $lower)[0];
		return self::$cache[$name] = new self(
			$name,
			self::strings($data['units'] ?? []),
			$lower === 'en' ? self::EN_UNIT_ALIASES : [],
			self::strings($data['leadingUnits'] ?? []),
			self::strings($data['prepositions'] ?? []),
			self::strings($data['decimalSeparators'] ?? ['.']),
			in_array($base, self::MORPHOLOGY_LANGS, true),
		);
	}

	/** @return string[] */
	private static function strings(mixed $value): array {
		if (!is_array($value)) {
			return [];
		}
		return array_values(array_filter($value, static fn ($v) => is_string($v) && $v !== ''));
	}
}
