<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IGroupManager;
use OCP\IUserManager;

class ShareService {
	public function __construct(
		private ListShareMapper $shareMapper,
		private ShoppingListMapper $listMapper,
		private ListService $listService,
		private IUserManager $userManager,
		private IGroupManager $groupManager,
		private PushService $pushService,
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
			}
			// type 3 (link) — no display name enrichment needed
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
				$existing->setPasswordHash(password_hash($password, PASSWORD_BCRYPT));
			}
			$existing->setExpiresAt($expiresAt);
			return $this->shareMapper->update($existing);
		}

		$share = new ListShare();
		$share->setListId($listId);
		$share->setSharedWith('__public_link__');
		$share->setSharedWithType(3);
		$share->setPermission($permission);
		$share->setSharedBy($userId);
		$share->setToken(bin2hex(random_bytes(32)));
		if ($password !== null) {
			$share->setPasswordHash(password_hash($password, PASSWORD_BCRYPT));
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
			$share->setPasswordHash(password_hash($password, PASSWORD_BCRYPT));
		}
		if ($removeExpiry) {
			$share->setExpiresAt(null);
		} elseif ($expiresAt !== null) {
			$share->setExpiresAt($expiresAt);
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
