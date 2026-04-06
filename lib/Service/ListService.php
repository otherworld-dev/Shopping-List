<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUserManager;

class ListService {
	public function __construct(
		private ShoppingListMapper $mapper,
		private IGroupManager $groupManager,
		private IUserManager $userManager,
		private IDBConnection $db,
		private PushService $pushService,
	) {
	}

	/**
	 * @return ShoppingList[]
	 */
	public function findAll(string $userId): array {
		$ownedLists = $this->mapper->findAllByUser($userId);
		foreach ($ownedLists as $list) {
			$list->setIsOwner(true);
			$list->setPermission(1);
		}

		$userShares = $this->mapper->findSharedWithUser($userId);

		$user = $this->userManager->get($userId);
		$userGroups = $user ? $this->groupManager->getUserGroupIds($user) : [];
		$groupShares = $this->mapper->findSharedWithGroups($userGroups);

		$sharedListPermissions = [];
		foreach ($groupShares as $listId => $perm) {
			$sharedListPermissions[$listId] = $perm;
		}
		foreach ($userShares as $listId => $perm) {
			if (!isset($sharedListPermissions[$listId]) || $perm > $sharedListPermissions[$listId]) {
				$sharedListPermissions[$listId] = $perm;
			}
		}

		$ownedIds = array_map(fn(ShoppingList $l) => $l->getId(), $ownedLists);
		$sharedListPermissions = array_diff_key($sharedListPermissions, array_flip($ownedIds));

		$sharedLists = $this->mapper->findByIds(array_keys($sharedListPermissions));
		foreach ($sharedLists as $list) {
			$list->setIsOwner(false);
			$list->setPermission($sharedListPermissions[$list->getId()] ?? 0);
		}

		return array_merge($ownedLists, $sharedLists);
	}

	/**
	 * @throws NotFoundException
	 */
	public function find(int $id, string $userId): ShoppingList {
		$this->assertAccess($id, $userId);
		$list = $this->mapper->find($id);
		$list->setIsOwner($list->getUserId() === $userId);
		if ($list->getIsOwner()) {
			$list->setPermission(1);
		} else {
			$list->setPermission($this->getPermission($id, $userId));
		}
		return $list;
	}

	public function create(string $title, string $userId): ShoppingList {
		$list = new ShoppingList();
		$list->setUserId($userId);
		$list->setTitle($title);
		$now = new DateTime();
		$list->setCreatedAt($now);
		$list->setUpdatedAt($now);
		$list = $this->mapper->insert($list);
		$list->setIsOwner(true);
		$list->setPermission(1);
		return $list;
	}

	/**
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function update(int $id, string $title, string $userId): ShoppingList {
		$this->assertWriteAccess($id, $userId);
		$list = $this->mapper->find($id);
		$list->setTitle($title);
		$list->setUpdatedAt(new DateTime());
		$list = $this->mapper->update($list);
		$list->setIsOwner($list->getUserId() === $userId);
		$list->setPermission($list->getIsOwner() ? 1 : $this->getPermission($id, $userId));
		$this->pushService->notifyListUpdate($id, $userId);
		return $list;
	}

	/**
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function delete(int $id, string $userId): void {
		$this->assertOwner($id, $userId);
		$this->pushService->notifyListUpdate($id, $userId);
		$list = $this->mapper->find($id);

		$this->cascadeDelete($id);

		$this->mapper->delete($list);
	}

	public function assertAccess(int $listId, string $userId): void {
		try {
			$list = $this->mapper->find($listId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('List not found');
		}

		if ($list->getUserId() === $userId) {
			return;
		}

		if ($this->getPermission($listId, $userId) >= 0) {
			return;
		}

		throw new NotFoundException('List not found');
	}

	public function assertWriteAccess(int $listId, string $userId): void {
		try {
			$list = $this->mapper->find($listId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('List not found');
		}

		if ($list->getUserId() === $userId) {
			return;
		}

		if ($this->getPermission($listId, $userId) >= 1) {
			return;
		}

		throw new NoPermissionException('No write access');
	}

	public function assertOwner(int $listId, string $userId): void {
		try {
			$list = $this->mapper->find($listId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('List not found');
		}

		if ($list->getUserId() !== $userId) {
			throw new NoPermissionException('Owner access required');
		}
	}

	private function getPermission(int $listId, string $userId): int {
		$userShares = $this->mapper->findSharedWithUser($userId);
		if (isset($userShares[$listId])) {
			return $userShares[$listId];
		}

		$user = $this->userManager->get($userId);
		$userGroups = $user ? $this->groupManager->getUserGroupIds($user) : [];
		$groupShares = $this->mapper->findSharedWithGroups($userGroups);
		if (isset($groupShares[$listId])) {
			return $groupShares[$listId];
		}

		return -1;
	}

	private function cascadeDelete(int $listId): void {
		// Delete item_tags for items in this list
		$qb = $this->db->getQueryBuilder();
		$subQuery = $this->db->getQueryBuilder();
		$subQuery->select('id')
			->from('shopping_list_items')
			->where($subQuery->expr()->eq('list_id', $subQuery->createNamedParameter($listId)));

		$qb->delete('shopping_list_item_tags')
			->where($qb->expr()->in('item_id', $qb->createFunction($subQuery->getSQL())))
			->executeStatement();

		// Delete items
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shopping_list_items')
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId)))
			->executeStatement();

		// Delete shares
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shopping_list_shares')
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId)))
			->executeStatement();

		// Delete list-specific shop areas
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shopping_list_shop_areas')
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId)))
			->executeStatement();
	}
}
