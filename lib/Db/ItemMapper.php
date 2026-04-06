<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Item>
 */
class ItemMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shoppinglist_items', Item::class);
	}

	/**
	 * @throws DoesNotExistException
	 * @throws MultipleObjectsReturnedException
	 */
	public function find(int $id): Item {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * @return Item[]
	 */
	public function findAllByList(int $listId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->orderBy('checked', 'ASC')
			->addOrderBy('sort_order', 'ASC')
			->addOrderBy('created_at', 'DESC');
		return $this->findEntities($qb);
	}

	public function uncheckAll(int $listId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('checked', $qb->createNamedParameter(false, IQueryBuilder::PARAM_BOOL))
			->set('checked_by', $qb->createNamedParameter(null))
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}

	/**
	 * Delete all checked items for a list.
	 *
	 * @return int[] IDs of deleted items (for item_tag cleanup)
	 */
	public function deleteChecked(int $listId): array {
		// First get the IDs of checked items
		$qb = $this->db->getQueryBuilder();
		$qb->select('id')
			->from($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('checked', $qb->createNamedParameter(true, IQueryBuilder::PARAM_BOOL)));
		$result = $qb->executeQuery();
		$ids = [];
		while ($row = $result->fetch()) {
			$ids[] = (int)$row['id'];
		}
		$result->closeCursor();

		if (!empty($ids)) {
			$qb = $this->db->getQueryBuilder();
			$qb->delete($this->getTableName())
				->where($qb->expr()->in('id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)))
				->executeStatement();
		}

		return $ids;
	}

	public function updateSortOrder(int $id, int $sortOrder): void {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('sort_order', $qb->createNamedParameter($sortOrder, IQueryBuilder::PARAM_INT))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}
}
