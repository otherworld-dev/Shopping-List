<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\Parsing\ParsingPack;
use PHPUnit\Framework\TestCase;

class ParsingPackTest extends TestCase {
	public function testARegionWithItsOwnPackGetsIt(): void {
		self::assertSame('pt_BR', ParsingPack::forLanguage('pt_BR')->language);
	}

	public function testFallsBackToTheBaseLanguage(): void {
		self::assertSame('de', ParsingPack::forLanguage('de_AT')->language);
	}

	public function testFallsBackToEnglish(): void {
		self::assertSame('en', ParsingPack::forLanguage('xx')->language);
		self::assertSame('en', ParsingPack::forLanguage('')->language);
	}

	/** As hasMorphology() in the web app: the viewer's language decides, not the pack it falls back to */
	public function testMorphologyFollowsTheUsersLanguage(): void {
		$bg = ParsingPack::forLanguage('bg');
		self::assertSame('en', $bg->language);
		self::assertFalse($bg->morphology);
		self::assertTrue(ParsingPack::forLanguage('en_GB')->morphology);
		self::assertTrue(ParsingPack::forLanguage('')->morphology);
		// The cached English pack is not changed by a request for another language
		self::assertTrue(ParsingPack::forLanguage('en')->morphology);
	}

	public function testOnlyEnglishHasAliasesAndMorphology(): void {
		$en = ParsingPack::forLanguage('en');
		self::assertTrue($en->morphology);
		self::assertSame('pint', $en->unitAliases['pints']);
		self::assertContains('pints', $en->units);

		$de = ParsingPack::forLanguage('de');
		self::assertFalse($de->morphology);
		self::assertSame([], $de->unitAliases);
		self::assertContains(',', $de->decimalSeparators);
	}
}
