<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Service\Parsing\ItemMerge;
use OCA\Shopping_List\Service\Parsing\ParsingPack;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class ItemMergeTest extends TestCase {
	/** The cases src/utils/sharedMergeCases.test.ts runs through the web app's merge. */
	private static function cases(string $group): array {
		$all = json_decode((string)file_get_contents(__DIR__ . '/../fixtures/merge-cases.json'), true);
		$out = [];
		foreach ($all[$group] as $c) {
			$out[json_encode($c, JSON_UNESCAPED_UNICODE)] = $c;
		}
		return $out;
	}

	public static function normalizeCases(): array {
		return self::cases('normalize');
	}

	public static function pluralizeCases(): array {
		return self::cases('pluralize');
	}

	public static function mergeCases(): array {
		return self::cases('merge');
	}

	private function en(): ItemMerge {
		return new ItemMerge(ParsingPack::forLanguage('en'));
	}

	#[DataProvider('normalizeCases')]
	public function testSharedNormalizeCases(string $input, string $expected): void {
		self::assertSame($expected, $this->en()->normalizeName($input));
	}

	#[DataProvider('pluralizeCases')]
	public function testSharedPluralizeCases(string $input, string $expected): void {
		self::assertSame($expected, $this->en()->pluralizeName($input));
	}

	#[DataProvider('mergeCases')]
	public function testSharedMergeCases(?string $existing, ?string $incoming, string $expected): void {
		self::assertSame($expected, $this->en()->mergeQuantities($existing, $incoming));
	}

	public function testOtherLanguagesNeverPluralise(): void {
		$de = new ItemMerge(ParsingPack::forLanguage('de'));
		self::assertSame('Ei', $de->pluralizeName('Ei'));
		// Without English rules "Eis" and "Ei" stay different items
		self::assertNotSame($de->normalizeName('Eis'), $de->normalizeName('Ei'));
	}

	public function testALanguageWithNoPackNeverPluralises(): void {
		$bg = new ItemMerge(ParsingPack::forLanguage('bg'));
		self::assertSame('Apel', $bg->pluralizeName('Apel'));
	}

	private static function item(int $id, string $name, bool $checked): Item {
		$item = new Item();
		$item->setId($id);
		$item->setName($name);
		$item->setChecked($checked);
		return $item;
	}

	public function testFindOpenMatchIgnoresTickedItems(): void {
		$items = [self::item(1, 'Milk', true), self::item(2, 'Bread', false), self::item(3, 'Milk', false)];
		self::assertSame(3, $this->en()->findOpenMatch($items, 'milk')?->getId());
		self::assertNull($this->en()->findOpenMatch([self::item(1, 'Milk', true)], 'Milk'));
	}

	public function testFindOpenMatchMatchesAPlural(): void {
		self::assertSame(1, $this->en()->findOpenMatch([self::item(1, 'Apple', false)], 'Apples')?->getId());
	}

	public function testFindCheckedMatchIgnoresOpenItems(): void {
		$items = [self::item(1, 'Milk', false), self::item(2, 'Milk', true), self::item(3, 'Milk', true)];
		self::assertSame(2, $this->en()->findCheckedMatch($items, 'Milk')?->getId());
		self::assertNull($this->en()->findCheckedMatch([self::item(1, 'Milk', false)], 'Milk'));
	}
}
