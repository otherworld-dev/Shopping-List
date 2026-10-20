<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\ViaLabel;
use PHPUnit\Framework\TestCase;

class ViaLabelTest extends TestCase {
	public function testKeepsAPlainLabel(): void {
		self::assertSame('Home Assistant', ViaLabel::clean('Home Assistant'));
		self::assertSame('Kitchen', ViaLabel::clean('  Kitchen '));
	}

	public function testBlankMeansNone(): void {
		self::assertNull(ViaLabel::clean(''));
		self::assertNull(ViaLabel::clean('   '));
		self::assertNull(ViaLabel::clean("\x01\x02"));
		self::assertNull(ViaLabel::clean(null));
	}

	public function testCutsAtForty(): void {
		self::assertSame(str_repeat('a', 40), ViaLabel::clean(str_repeat('a', 50)));
	}
}
