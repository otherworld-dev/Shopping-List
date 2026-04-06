<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Service;

use OCA\ShoppingList\Db\ListShare;
use OCA\ShoppingList\Db\ListShareMapper;
use OCA\ShoppingList\Db\ShoppingListMapper;
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
			} else {
				$group = $this->groupManager->get($share->getSharedWith());
				$share->setSharedWithDisplayName($group?->getDisplayName() ?? $share->getSharedWith());
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
}
