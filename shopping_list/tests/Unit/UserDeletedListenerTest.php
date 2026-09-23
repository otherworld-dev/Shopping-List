<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Listener\UserDeletedListener;
use OCA\Shopping_List\Service\UserDataCleanup;
use OCP\EventDispatcher\Event;
use OCP\IUser;
use OCP\User\Events\UserDeletedEvent;
use PHPUnit\Framework\TestCase;

class UserDeletedListenerTest extends TestCase {
	public function testCleansUpAfterTheDeletedUser(): void {
		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('bob');
		$cleanup = $this->createMock(UserDataCleanup::class);
		$cleanup->expects(self::once())->method('deleteUser')->with('bob');

		(new UserDeletedListener($cleanup))->handle(new UserDeletedEvent($user));
	}

	public function testIgnoresOtherEvents(): void {
		$cleanup = $this->createMock(UserDataCleanup::class);
		$cleanup->expects(self::never())->method('deleteUser');

		(new UserDeletedListener($cleanup))->handle(new Event());
	}
}
