<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\HintException;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\Security\Events\ValidatePasswordPolicyEvent;

class ShareService {
	/** Tries at an unused invite code before giving up; even one clash is a one-in-billions event */
	private const CODE_ATTEMPTS = 5;

	public function __construct(
		private ListShareMapper $shareMapper,
		private ShoppingListMapper $listMapper,
		private ListService $listService,
		private IUserManager $userManager,
		private IGroupManager $groupManager,
		private PushService $pushService,
		private IEventDispatcher $eventDispatcher,
	) {
	}

	/**
	 * @return ListShare[]
	 */
	public function getShares(int $listId, string $userId): array {
		$this->listService->assertAccess($listId, $userId);
		$shares = $this->shareMapper->findByList($listId);

		// Enrich with display names
		foreach ($shares as $share) {
			if ($share->getSharedWithType() === 0) {
				$user = $this->userManager->get($share->getSharedWith());
				$share->setSharedWithDisplayName($user?->getDisplayName() ?? $share->getSharedWith());
			} elseif ($share->getSharedWithType() === 1) {
				$group = $this->groupManager->get($share->getSharedWith());
				$share->setSharedWithDisplayName($group?->getDisplayName() ?? $share->getSharedWith());
			} elseif ($share->getSharedWithType() === 3 && $share->getCode() === null) {
				// Links made before invite codes get theirs the first time the dialog opens
				$share->setCode($this->newInviteCode());
				$this->shareMapper->update($share);
			}
		}

		return $shares;
	}

	public function share(
		int $listId,
		string $sharedWith,
		int $type,
		int $permission,
		string $userId,
	): ListShare {
		$this->listService->assertOwner($listId, $userId);

		// Validate target exists
		if ($type === 0) {
			if ($this->userManager->get($sharedWith) === null) {
				throw new NotFoundException('User not found');
			}
			if ($sharedWith === $userId) {
				throw new \InvalidArgumentException('Cannot share with yourself');
			}
		} elseif ($type === 1) {
			if ($this->groupManager->get($sharedWith) === null) {
				throw new NotFoundException('Group not found');
			}
		}

		// Check if share already exists
		$existing = $this->shareMapper->findExisting($listId, $sharedWith, $type);
		if ($existing !== null) {
			// Update permission
			$existing->setPermission($permission);
			return $this->shareMapper->update($existing);
		}

		$share = new ListShare();
		$share->setListId($listId);
		$share->setSharedWith($sharedWith);
		$share->setSharedWithType($type);
		$share->setPermission($permission);
		$share->setSharedBy($userId);

		$share = $this->shareMapper->insert($share);

		// Set display name
		if ($type === 0) {
			$user = $this->userManager->get($sharedWith);
			$share->setSharedWithDisplayName($user?->getDisplayName() ?? $sharedWith);
			$this->pushService->notifyShareUpdate($listId, $sharedWith, 'shared');
		} else {
			$group = $this->groupManager->get($sharedWith);
			$share->setSharedWithDisplayName($group?->getDisplayName() ?? $sharedWith);
		}

		return $share;
	}

	public function updatePermission(int $shareId, int $permission, string $userId): ListShare {
		try {
			$share = $this->shareMapper->find($shareId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Share not found');
		}

		$this->listService->assertOwner($share->getListId(), $userId);

		$share->setPermission($permission);
		$share = $this->shareMapper->update($share);
		if ($share->getSharedWithType() === 0) {
			$this->pushService->notifyShareUpdate($share->getListId(), $share->getSharedWith(), 'permission_changed');
		}
		return $share;
	}

	public function unshare(int $shareId, string $userId): void {
		try {
			$share = $this->shareMapper->find($shareId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Share not found');
		}

		$list = $this->listMapper->find($share->getListId());

		// Owner can remove any share, recipient can remove their own
		if ($list->getUserId() !== $userId && $share->getSharedWith() !== $userId) {
			throw new NoPermissionException('Cannot remove this share');
		}

		$this->shareMapper->delete($share);
		if ($share->getSharedWithType() === 0) {
			$this->pushService->notifyShareUpdate($share->getListId(), $share->getSharedWith(), 'unshared');
		}
	}

	// --- Public link share methods ---

	public function createLinkShare(
		int $listId,
		int $permission,
		?string $password,
		?string $expiresAt,
		string $userId,
	): ListShare {
		$this->listService->assertOwner($listId, $userId);

		// Check if link share already exists — one per list
		$existing = $this->shareMapper->findLinkShareByList($listId);
		if ($existing !== null) {
			$existing->setPermission($permission);
			if ($password !== null) {
				$existing->setPasswordHash($this->hashLinkPassword($password));
			}
			$existing->setExpiresAt($expiresAt);
			if ($existing->getCode() === null) {
				$existing->setCode($this->newInviteCode());
			}
			return $this->shareMapper->update($existing);
		}

		$share = new ListShare();
		$share->setListId($listId);
		$share->setSharedWith('__public_link__');
		$share->setSharedWithType(3);
		$share->setPermission($permission);
		$share->setSharedBy($userId);
		$share->setToken(bin2hex(random_bytes(32)));
		$share->setCode($this->newInviteCode());
		if ($password !== null) {
			$share->setPasswordHash($this->hashLinkPassword($password));
		}
		$share->setExpiresAt($expiresAt);

		return $this->shareMapper->insert($share);
	}

	public function updateLinkShare(
		int $shareId,
		?int $permission,
		?string $password,
		bool $removePassword,
		?string $expiresAt,
		bool $removeExpiry,
		string $userId,
		?bool $showNames = null,
	): ListShare {
		try {
			$share = $this->shareMapper->find($shareId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Share not found');
		}

		$this->listService->assertOwner($share->getListId(), $userId);

		if ($share->getSharedWithType() !== 3) {
			throw new NotFoundException('Not a link share');
		}

		if ($permission !== null) {
			$share->setPermission($permission);
		}
		if ($removePassword) {
			$share->setPasswordHash(null);
		} elseif ($password !== null) {
			$share->setPasswordHash($this->hashLinkPassword($password));
		}
		if ($removeExpiry) {
			$share->setExpiresAt(null);
		} elseif ($expiresAt !== null) {
			$share->setExpiresAt($expiresAt);
		}
		if ($showNames !== null) {
			$share->setShowNames($showNames);
		}

		return $this->shareMapper->update($share);
	}

	public function deleteLinkShare(int $shareId, string $userId): void {
		try {
			$share = $this->shareMapper->find($shareId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Share not found');
		}

		$this->listService->assertOwner($share->getListId(), $userId);

		if ($share->getSharedWithType() !== 3) {
			throw new NotFoundException('Not a link share');
		}

		$this->shareMapper->delete($share);
	}

	/**
	 * A link password, hashed once it passes the server's password policy,
	 * the same check Nextcloud's own share links go through. Without the
	 * password_policy app nothing is checked beyond it not being empty.
	 *
	 * @throws \InvalidArgumentException with the policy's hint, ready to show
	 */
	private function hashLinkPassword(string $password): string {
		if ($password === '') {
			throw new \InvalidArgumentException('The password cannot be empty');
		}
		try {
			$this->eventDispatcher->dispatchTyped(new ValidatePasswordPolicyEvent($password));
		} catch (HintException $e) {
			throw new \InvalidArgumentException($e->getHint(), 0, $e);
		}
		return password_hash($password, PASSWORD_BCRYPT);
	}

	private function newInviteCode(): string {
		for ($i = 0; $i < self::CODE_ATTEMPTS; $i++) {
			$code = InviteCode::generate();
			if ($this->shareMapper->findByCode($code) === null) {
				return $code;
			}
		}
		throw new \RuntimeException('Could not find an unused invite code');
	}

	/**
	 * The link share an invite code belongs to, with the same expiry rule as
	 * its token. Malformed input is turned away before any query.
	 *
	 * @throws NotFoundException malformed, unknown or expired code
	 */
	public function findShareByCode(string $input): ListShare {
		$code = InviteCode::normalise($input);
		$share = $code === null ? null : $this->shareMapper->findByCode($code);
		if ($share === null || $share->getToken() === null) {
			throw new NotFoundException('Share not found');
		}
		return $this->findValidShare($share->getToken());
	}

	/**
	 * Validate a public access token. Returns the share if valid.
	 *
	 * @throws NotFoundException if token not found or expired
	 * @throws PasswordRequiredException if password-protected and no password given
	 * @throws NoPermissionException if password is wrong
	 */
	public function validatePublicAccess(string $token, ?string $password = null): ListShare {
		$share = $this->findValidShare($token);

		// Check password
		if ($share->getPasswordHash() !== null) {
			if ($password === null) {
				throw new PasswordRequiredException('Password required');
			}
			if (!password_verify($password, $share->getPasswordHash())) {
				throw new NoPermissionException('Invalid password');
			}
		}

		return $share;
	}

	/**
	 * Find a share by token and verify it hasn't expired. Does NOT check password.
	 *
	 * @throws NotFoundException if token not found or expired
	 */
	public function findValidShare(string $token): ListShare {
		$share = $this->shareMapper->findByToken($token);
		if ($share === null) {
			throw new NotFoundException('Share not found');
		}

		if ($share->getExpiresAt() !== null) {
			$expires = new \DateTime($share->getExpiresAt());
			if ($expires < new \DateTime()) {
				throw new NotFoundException('Share has expired');
			}
		}

		return $share;
	}
}
