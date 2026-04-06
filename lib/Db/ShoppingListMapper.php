<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<ShoppingList>
 */
class ShoppingListMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shoppinglist_lists', ShoppingList::class);
	}

	/**
	 * @throws DoesNotExistException
	 * @throws MultipleObjectsReturnedException
	 */
	public function find(int $id): ShoppingList {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * @return ShoppingList[]
	 */
	public function findAllByUser(string $userId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->orderBy('updated_at', 'DESC');
		return $this->findEntities($qb);
	}

	/**
	 * Find list IDs shared directly with a user.
	 *
	 * @return array<int, int> list_id => permission
	 */
	public function findSharedWithUser(string $userId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('list_id', 'permission')
			->from('shoppinglist_shares')
			->where($qb->expr()->eq('shared_with', $qb->createNamedParameter($userId)))
			->andWhere($qb->expr()->eq('shared_with_type', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
		$result = $qb->executeQuery();
		$shares = [];
		while ($row = $result->fetch()) {
			$shares[(int)$row['list_id']] = (int)$row['permission'];
		}
		$result->closeCursor();
		return $shares;
	}

	/**
	 * Find list IDs shared with any of the given groups.
	 *
	 * @param string[] $groupIds
	 * @return array<int, int> list_id => permission (max)
	 */
	public function findSharedWithGroups(array $groupIds): array {
		if (empty($groupIds)) {
			return [];
		}
		$qb = $this->db->getQueryBuilder();
		$qb->select('list_id', 'permission')
			->from('shoppinglist_shares')
			->where($qb->expr()->in('shared_with', $qb->createNamedParameter($groupIds, IQueryBuilder::PARAM_STR_ARRAY)))
			->andWhere($qb->expr()->eq('shared_with_type', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)));
		$result = $qb->executeQuery();
		$shares = [];
		while ($row = $result->fetch()) {
			$listId = (int)$row['list_id'];
			$perm = (int)$row['permission'];
			// Keep highest permission if shared via multiple groups
			if (!isset($shares[$listId]) || $perm > $shares[$listId]) {
				$shares[$listId] = $perm;
			}
		}
		$result->closeCursor();
		return $shares;
	}

	/**
	 * @return ShoppingList[]
	 */
	public function findByIds(array $ids): array {
		if (empty($ids)) {
			return [];
		}
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->in('id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)))
			->orderBy('updated_at', 'DESC');
		return $this->findEntities($qb);
	}
}
