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
	private ISession&MockObject $session;
	private PublicShareAccess $access;

	protected function setUp(): void {
		$this->shares = $this->createMock(ShareService::class);
		$this->session = $this->createMock(ISession::class);
		$this->access = new PublicShareAccess($this->shares, $this->session);
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

	public function testResolveReturnsTheShareOfAnOpenLink(): void {
		$share = $this->share(null);
		$this->shares->method('findValidShare')->with('tok')->willReturn($share);
		$this->session->expects(self::never())->method('get');

		self::assertSame($share, $this->access->resolve('tok'));
	}

	public function testResolveNeedsThePasswordInTheSessionForAProtectedLink(): void {
		$this->shares->method('findValidShare')->willReturn($this->share('hash'));
		$this->session->method('get')->with('shopping_list_public_tok')->willReturn(null);

		$this->expectException(PasswordRequiredException::class);
		$this->access->resolve('tok');
	}

	public function testResolveAcceptsAProtectedLinkOnceUnlocked(): void {
		$share = $this->share('hash');
		$this->shares->method('findValidShare')->willReturn($share);
		$this->session->method('get')->with('shopping_list_public_tok')->willReturn(true);

		self::assertSame($share, $this->access->resolve('tok'));
	}

	public function testAssertWriteRefusesReadOnlyLinks(): void {
		$this->access->assertWrite($this->share(null, 1));

		$this->expectException(NoPermissionException::class);
		$this->access->assertWrite($this->share(null, 0));
	}

	public function testGrantMarksTheSession(): void {
		$this->session->expects(self::once())->method('set')->with('shopping_list_public_tok', true);

		$this->access->grant('tok');
	}
}
