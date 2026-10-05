<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\PasswordRequiredException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCP\ISession;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class PublicShareAccessTest extends TestCase {
	private ShareService&MockObject $shares;
	/** @var array<string, mixed> what the browser session holds */
	private array $stored = [];
	private PublicShareAccess $access;

	protected function setUp(): void {
		$this->shares = $this->createMock(ShareService::class);
		$session = $this->createMock(ISession::class);
		$session->method('get')->willReturnCallback(fn (string $key) => $this->stored[$key] ?? null);
		$session->method('set')->willReturnCallback(function (string $key, mixed $value): void {
			$this->stored[$key] = $value;
		});
		$this->access = new PublicShareAccess($this->shares, $session);
	}

	private function share(?string $passwordHash, int $permission = 0): ListShare {
		$share = new ListShare();
		$share->setId(1);
		$share->setListId(5);
		$share->setToken('tok');
		$share->setPasswordHash($passwordHash);
		$share->setPermission($permission);
		return $share;
	}

	/** The link as it is on the server now. */
	private function linkIs(ListShare $share): void {
		$this->shares->method('findValidShare')->with('tok')->willReturn($share);
	}

	public function testResolveReturnsTheShareOfAnOpenLink(): void {
		$share = $this->share(null);
		$this->linkIs($share);

		self::assertSame($share, $this->access->resolve('tok'));
	}

	public function testResolveNeedsThePasswordInTheSessionForAProtectedLink(): void {
		$this->linkIs($this->share('hash'));

		$this->expectException(PasswordRequiredException::class);
		$this->access->resolve('tok');
	}

	public function testResolveAcceptsAProtectedLinkOnceUnlocked(): void {
		$share = $this->share('hash');
		$this->linkIs($share);
		$this->access->grant($share);

		self::assertSame($share, $this->access->resolve('tok'));
	}

	public function testChangingThePasswordLocksTheLinkAgain(): void {
		$this->access->grant($this->share('old hash'));
		$this->linkIs($this->share('new hash'));

		$this->expectException(PasswordRequiredException::class);
		$this->access->resolve('tok');
	}

	public function testAnUnlockFromBeforePasswordChangesCountedAsksAgain(): void {
		// Sessions used to hold just true for an unlocked link
		$this->stored[PublicShareAccess::sessionKey('tok')] = true;
		$this->linkIs($this->share('hash'));

		$this->expectException(PasswordRequiredException::class);
		$this->access->resolve('tok');
	}

	public function testTheSessionNeverHoldsThePasswordHash(): void {
		$this->access->grant($this->share('$2y$10$secrethash'));

		self::assertNotContains('$2y$10$secrethash', $this->stored);
	}

	public function testAssertWriteRefusesReadOnlyLinks(): void {
		$this->access->assertWrite($this->share(null, 1));

		$this->expectException(NoPermissionException::class);
		$this->access->assertWrite($this->share(null, 0));
	}
}
