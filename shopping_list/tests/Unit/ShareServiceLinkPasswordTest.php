<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShareService;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\HintException;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\Security\Events\ValidatePasswordPolicyEvent;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** A link's password has to pass the server's password policy, as Nextcloud's own share links do. */
class ShareServiceLinkPasswordTest extends TestCase {
	private ListShareMapper&MockObject $mapper;
	private IEventDispatcher&MockObject $events;
	private ShareService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ListShareMapper::class);
		$this->mapper->method('insert')->willReturnArgument(0);
		$this->mapper->method('update')->willReturnArgument(0);
		$this->mapper->method('findByCode')->willReturn(null);
		$this->events = $this->createMock(IEventDispatcher::class);
		$this->service = new ShareService(
			$this->mapper,
			$this->createMock(ShoppingListMapper::class),
			$this->createMock(ListService::class),
			$this->createMock(IUserManager::class),
			$this->createMock(IGroupManager::class),
			$this->createMock(PushService::class),
			$this->events,
		);
	}

	private static function link(): ListShare {
		$share = new ListShare();
		$share->setId(3);
		$share->setListId(5);
		$share->setSharedWith('__public_link__');
		$share->setSharedWithType(3);
		$share->setPermission(1);
		$share->setToken(str_repeat('ab', 32));
		$share->setCode('K7QM3XPD');
		return $share;
	}

	private function policyRefuses(string $hint): void {
		$this->events->method('dispatchTyped')
			->willThrowException(new HintException('Password policy failed', $hint));
	}

	public function testAPasswordThePolicyAcceptsIsSavedHashed(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->events->expects(self::once())->method('dispatchTyped')
			->with(self::callback(fn ($e) => $e instanceof ValidatePasswordPolicyEvent && $e->getPassword() === 'correct horse'));

		$share = $this->service->createLinkShare(5, 1, 'correct horse', null, 'alice');

		self::assertTrue(password_verify('correct horse', (string)$share->getPasswordHash()));
	}

	public function testANewLinkWithAPasswordThePolicyRefusesIsNotMade(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->policyRefuses('Password needs to be at least 10 characters long.');
		$this->mapper->expects(self::never())->method('insert');

		$this->expectException(\InvalidArgumentException::class);
		$this->expectExceptionMessage('Password needs to be at least 10 characters long.');
		$this->service->createLinkShare(5, 1, '1234', null, 'alice');
	}

	public function testResavingALinkWithAPasswordThePolicyRefusesChangesNothing(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(self::link());
		$this->policyRefuses('Password is among the 1,000,000 most common ones.');
		$this->mapper->expects(self::never())->method('update');

		$this->expectException(\InvalidArgumentException::class);
		$this->service->createLinkShare(5, 1, 'password', null, 'alice');
	}

	public function testChangingToAPasswordThePolicyRefusesChangesNothing(): void {
		$this->mapper->method('find')->willReturn(self::link());
		$this->policyRefuses('Password needs to be at least 10 characters long.');
		$this->mapper->expects(self::never())->method('update');

		$this->expectException(\InvalidArgumentException::class);
		$this->expectExceptionMessage('Password needs to be at least 10 characters long.');
		$this->service->updateLinkShare(3, null, '1234', false, null, false, 'alice');
	}

	public function testAnEmptyPasswordIsRefused(): void {
		$this->mapper->method('find')->willReturn(self::link());
		$this->mapper->expects(self::never())->method('update');

		$this->expectException(\InvalidArgumentException::class);
		$this->service->updateLinkShare(3, null, '', false, null, false, 'alice');
	}

	public function testALinkWithoutAPasswordSkipsThePolicy(): void {
		$this->mapper->method('findLinkShareByList')->willReturn(null);
		$this->events->expects(self::never())->method('dispatchTyped');

		self::assertNull($this->service->createLinkShare(5, 1, null, null, 'alice')->getPasswordHash());
	}
}
