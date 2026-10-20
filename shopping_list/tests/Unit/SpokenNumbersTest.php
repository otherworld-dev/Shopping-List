<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\Parsing\SpokenNumbers;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class SpokenNumbersTest extends TestCase {
	public static function lines(): array {
		return [
			['two pints of milk', '2 pints of milk'],
			['Twenty eggs', '20 eggs'],
			['a pint of milk', '1 pint of milk'],
			['an apple', '1 apple'],
			['a dozen eggs', '12 eggs'],
			['half a pound of butter', '0.5 pound of butter'],
			['half a loaf', '0.5 loaf'],
			['milk', 'milk'],
			['2 pints', '2 pints'],
			['anchovies', 'anchovies'],
			['a', 'a'],
		];
	}

	#[DataProvider('lines')]
	public function testNormalisesALeadingNumberWord(string $line, string $expected): void {
		self::assertSame($expected, SpokenNumbers::normalise($line, 'en'));
	}

	public function testAWholeAmountCanBeJustTheWord(): void {
		self::assertSame('6', SpokenNumbers::normalise('six', 'en', true));
		self::assertSame('12', SpokenNumbers::normalise('a dozen', 'en', true));
		self::assertSame('0.5', SpokenNumbers::normalise('half', 'en', true));
		self::assertSame('3 pints', SpokenNumbers::normalise('three pints', 'en', true));
		// A line still needs something after the word
		self::assertSame('six', SpokenNumbers::normalise('six', 'en'));
	}

	public function testOnlyEnglish(): void {
		self::assertSame('zwei Eier', SpokenNumbers::normalise('zwei Eier', 'de'));
		self::assertSame('2 pints of milk', SpokenNumbers::normalise('two pints of milk', 'en_GB'));
	}
}
