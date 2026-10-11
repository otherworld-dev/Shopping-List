<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShareService;
use OCP\IGroupManager;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ShareServiceInviteCodeTest extends TestCase {
	private ListShareMapper&MockObject $mapper;
	private ShareService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ListShareMapper::class);
		$this->mapper->method('insert')->willReturnArgument(0);
		$this->mapper->method('update')->willReturnArgument(0);
		$this->service = new ShareService(
			$this->mapper,
			$this->createMock(ShoppingListMapper::class),
			$this->createMock(ListService::class),
			$this->createMock(IUserManager::class),
			$this->createMock(IGroupManager::class),
			$this->createMock(PushService::class),
		);
	}

	private static function link(?string $code, ?string $expiresAt = null): ListShare {
		$share = new ListShare();
		$share->setListId(5);
		$share->setSharedWith('__public_link__');
		$share->setSharedWithType(3);
		$share->setPermission(1);
		$share->setToken(str_repeat('ab', 32));
		$share->setCode($code);
		$share->setExpiresAt($expiresAt);
		return $share;
	}

	public function testANewLinkGetsACode(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->mapper->method('findByCode')->willReturn(null);

		$share = $this->service->createLinkShare(5, 1, null, null, 'alice');

		self::assertMatchesRegularExpression('/^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{8}$/', $share->getCode());
	}

	public function testACodeClashTriesAgain(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->mapper->expects(self::exactly(2))->method('findByCode')
			->willReturnOnConsecutiveCalls(self::link('K7QM3XPD'), null);

		self::assertNotNull($this->service->createLinkShare(5, 1, null, null, 'alice')->getCode());
	}

	public function testGivingUpAfterFiveClashes(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->mapper->expects(self::exactly(5))->method('findByCode')->willReturn(self::link('K7QM3XPD'));

		$this->expectException(\RuntimeException::class);
		$this->service->createLinkShare(5, 1, null, null, 'alice');
	}

	public function testResavingAnOldLinkGivesItACode(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(self::link(null));
		$this->mapper->method('findByCode')->willReturn(null);

		self::assertNotNull($this->service->createLinkShare(5, 0, null, null, 'alice')->getCode());
	}

	public function testResavingALinkKeepsItsCode(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(self::link('K7QM3XPD'));

		self::assertSame('K7QM3XPD', $this->service->createLinkShare(5, 0, null, null, 'alice')->getCode());
	}

	public function testUpdatingALinkKeepsItsCode(): void {
		$this->mapper->method('find')->willReturn(self::link('K7QM3XPD'));

		$share = $this->service->updateLinkShare(1, 0, 'secret', false, null, false, 'alice');

		self::assertSame('K7QM3XPD', $share->getCode());
	}

	public function testOpeningTheDialogFillsInAMissingCodeOnce(): void {
		$old = self::link(null);
		$this->mapper->method('findByList')->willReturn([$old]);
		$this->mapper->method('findByCode')->willReturn(null);
		$this->mapper->expects(self::once())->method('update');

		$first = $this->service->getShares(5, 'alice')[0]->getCode();
		$second = $this->service->getShares(5, 'alice')[0]->getCode();

		self::assertNotNull($first);
		self::assertSame($first, $second);
	}

	public function testACodeFindsItsLinkHoweverItIsTyped(): void {
		$share = self::link('K7QM3XPD');
		$this->mapper->method('findByCode')->with('K7QM3XPD')->willReturn($share);
		$this->mapper->method('findByToken')->willReturn($share);

		foreach (['K7QM3XPD', 'k7qm-3xpd', ' K7QM 3XPD '] as $typed) {
			self::assertSame($share, $this->service->findShareByCode($typed));
		}
	}

	public function testAnUnknownCodeIsNotFound(): void {
		$this->mapper->method('findByCode')->willReturn(null);

		$this->expectException(NotFoundException::class);
		$this->service->findShareByCode('K7QM3XPD');
	}

	public function testAnExpiredLinksCodeIsNotFound(): void {
		$share = self::link('K7QM3XPD', '2020-01-01T00:00:00+00:00');
		$this->mapper->method('findByCode')->willReturn($share);
		$this->mapper->method('findByToken')->willReturn($share);

		$this->expectException(NotFoundException::class);
		$this->service->findShareByCode('K7QM3XPD');
	}

	public function testJunkNeverReachesTheDatabase(): void {
		$this->mapper->expects(self::never())->method('findByCode');

		foreach ([str_repeat('A', 500), '../../etc', 'K7QM3XPÉ', ''] as $junk) {
			try {
				$this->service->findShareByCode($junk);
				self::fail('Expected not found for ' . $junk);
			} catch (NotFoundException) {
			}
		}
	}

	public function testALinkCanStopShowingNames(): void {
		$this->mapper->method('find')->willReturn(self::link('K7QM3XPD'));
		$share = $this->service->updateLinkShare(1, null, null, false, null, false, 'alice', false);
		self::assertFalse($share->showsNames());
		self::assertSame('K7QM3XPD', $share->getCode());
	}
}
