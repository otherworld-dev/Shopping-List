<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ListShare;
use OCP\ISession;

/**
 * Who is behind a public link. The token identifies the share; a link with
 * a password additionally needs that password to have been entered in this
 * browser session. Shared by the public list API and the public image
 * routes so the rule lives in one place.
 */
class PublicShareAccess {
	public function __construct(
		private ShareService $shareService,
		private ISession $session,
	) {
	}

	public static function sessionKey(string $token): string {
		return 'shopping_list_public_' . $token;
	}

	/**
	 * @throws NotFoundException unknown or expired token
	 * @throws PasswordRequiredException protected link not yet unlocked in this session
	 */
	public function resolve(string $token): ListShare {
		$share = $this->shareService->findValidShare($token);
		if ($share->getPasswordHash() !== null && !$this->session->get(self::sessionKey($token))) {
			throw new PasswordRequiredException('Password required');
		}
		return $share;
	}

	/** @throws NoPermissionException */
	public function assertWrite(ListShare $share): void {
		if ($share->getPermission() < 1) {
			throw new NoPermissionException('Read-only access');
		}
	}

	/** Remember in this session that the link's password was entered. */
	public function grant(string $token): void {
		$this->session->set(self::sessionKey($token), true);
	}
}
