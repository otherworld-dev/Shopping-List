<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ListShare;
use PHPUnit\Framework\TestCase;

class ListShareTest extends TestCase {
	public function testALinkShareCarriesItsInviteCode(): void {
		$share = new ListShare();
		$share->setSharedWithType(3);
		$share->setToken('abc');
		$share->setCode('K7QM3XPD');

		self::assertSame('K7QM3XPD', $share->jsonSerialize()['code']);
	}

	public function testUserAndGroupSharesHaveNoCode(): void {
		foreach ([0, 1] as $type) {
			$share = new ListShare();
			$share->setSharedWithType($type);
			self::assertArrayNotHasKey('code', $share->jsonSerialize());
		}
	}

	public function testALinkShowsNamesUnlessTurnedOff(): void {
		$share = new ListShare();
		$share->setSharedWithType(3);
		self::assertTrue($share->showsNames());
		self::assertTrue($share->jsonSerialize()['showNames']);

		$share->setShowNames(false);
		self::assertFalse($share->showsNames());
		self::assertFalse($share->jsonSerialize()['showNames']);
	}
}
