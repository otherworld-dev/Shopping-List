<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\GuestName;
use PHPUnit\Framework\TestCase;

class GuestNameTest extends TestCase {
	public function testANormalNameIsKept(): void {
		self::assertSame('Anna', GuestName::clean('Anna'));
		self::assertSame('Anna-Lena Müller', GuestName::clean('Anna-Lena Müller'));
		self::assertSame('Zoë 🍋', GuestName::clean('Zoë 🍋'));
	}

	public function testWhitespaceIsTidied(): void {
		self::assertSame('Anna Smith', GuestName::clean("  Anna \t\n Smith  "));
	}

	public function testControlAndFormatCharactersGo(): void {
		self::assertSame('Annaevil', GuestName::clean("Anna\u{202E}evil"));
		self::assertSame('Anna', GuestName::clean("An\u{0000}na\u{200B}"));
	}

	public function testNothingLeftIsNoName(): void {
		foreach ([null, '', '   ', "\u{202E}", 42, ['Anna']] as $input) {
			self::assertNull(GuestName::clean($input));
		}
	}

	public function testALongNameIsCut(): void {
		self::assertSame(str_repeat('é', 40), GuestName::clean(str_repeat('é', 500)));
	}

	public function testBrokenUtf8IsNoName(): void {
		self::assertNull(GuestName::clean("\xC3\x28"));
	}
}
