<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\IniSize;
use PHPUnit\Framework\TestCase;

class IniSizeTest extends TestCase {
	public function testParsesPhpIniShorthand(): void {
		self::assertSame(512 * 1024 * 1024, IniSize::bytes('512M'));
		self::assertSame(2 * 1024 * 1024, IniSize::bytes('2m'));
		self::assertSame(1024 * 1024 * 1024, IniSize::bytes('1G'));
		self::assertSame(64 * 1024, IniSize::bytes('64K'));
		self::assertSame(1000, IniSize::bytes('1000'));
	}

	public function testUnlimitedAndUnsetAreNull(): void {
		self::assertNull(IniSize::bytes('-1'));
		self::assertNull(IniSize::bytes(''));
		self::assertNull(IniSize::bytes(false));
	}

	public function testHumanUsesBinaryUnits(): void {
		self::assertSame('10 MB', IniSize::human(10 * 1024 * 1024));
		self::assertSame('512 KB', IniSize::human(512 * 1024));
		self::assertSame('2 GB', IniSize::human(2 * 1024 * 1024 * 1024));
		self::assertSame('900 bytes', IniSize::human(900));
	}
}
