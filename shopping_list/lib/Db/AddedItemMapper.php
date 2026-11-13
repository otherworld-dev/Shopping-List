<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<AddedItem>
 */
class AddedItemMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shopping_list_added', AddedItem::class);
	}

	public function add(int $listId, string $userId, string $actor, string $itemName): AddedItem {
		$row = new AddedItem();
		$row->setListId($listId);
		$row->setUserId($userId);
		$row->setActor(mb_substr($actor, 0, 64));
		$row->setItemName(mb_substr($itemName, 0, 255));
		$row->setNotified(false);
		return $this->insert($row);
	}

	/**
	 * @return AddedItem[] oldest first
	 */
	public function findByList(int $listId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->orderBy('id', 'ASC');
		return $this->findEntities($qb);
	}

	/** @param int[] $ids */
	public function markNotified(array $ids): void {
		foreach (array_chunk($ids, 1000) as $chunk) {
			$qb = $this->db->getQueryBuilder();
			$qb->update($this->getTableName())
				->set('notified', $qb->createNamedParameter(true, IQueryBuilder::PARAM_BOOL))
				->where($qb->expr()->in('id', $qb->createNamedParameter($chunk, IQueryBuilder::PARAM_INT_ARRAY)))
				->executeStatement();
		}
	}

	/** @param int[] $ids */
	public function deleteByIds(array $ids): void {
		foreach (array_chunk($ids, 1000) as $chunk) {
			$qb = $this->db->getQueryBuilder();
			$qb->delete($this->getTableName())
				->where($qb->expr()->in('id', $qb->createNamedParameter($chunk, IQueryBuilder::PARAM_INT_ARRAY)))
				->executeStatement();
		}
	}

	public function deleteByList(int $listId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}

	public function deleteByUser(string $userId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->executeStatement();
	}
}
