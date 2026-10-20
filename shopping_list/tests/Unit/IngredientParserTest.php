<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\Parsing\IngredientParser;
use OCA\Shopping_List\Service\Parsing\ParsingPack;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class IngredientParserTest extends TestCase {
	/** The same lines src/utils/sharedParsingCases.test.ts runs through the web app's parser. */
	public static function sharedCases(): array {
		$cases = json_decode((string)file_get_contents(__DIR__ . '/../fixtures/parsing-cases.json'), true);
		$out = [];
		foreach ($cases as $c) {
			$out[$c['lang'] . ': ' . json_encode($c['line'], JSON_UNESCAPED_UNICODE)] = [$c];
		}
		return $out;
	}

	#[DataProvider('sharedCases')]
	public function testSharedCases(array $c): void {
		$parsed = (new IngredientParser(ParsingPack::forLanguage($c['lang'])))->parse($c['line']);
		self::assertSame($c['name'], $parsed['name']);
		self::assertSame($c['quantity'], $parsed['quantity']);
		self::assertSame($c['checked'], $parsed['checked']);
	}

	private function en(): IngredientParser {
		return new IngredientParser(ParsingPack::forLanguage('en'));
	}

	public function testParseAmountReadsAnAmountWithAUnit(): void {
		self::assertSame('3 pints', $this->en()->parseAmount('3 pints'));
		self::assertSame('0.5 pound', $this->en()->parseAmount('0.5 pound'));
	}

	public function testParseAmountReadsABareNumber(): void {
		self::assertSame('4', $this->en()->parseAmount('4'));
	}

	public function testParseAmountRefusesLeftovers(): void {
		self::assertNull($this->en()->parseAmount('lots'));
		self::assertNull($this->en()->parseAmount('3 pints milk'));
		self::assertNull($this->en()->parseAmount(''));
	}
}
