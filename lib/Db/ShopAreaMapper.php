<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<ShopArea>
 */
class ShopAreaMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shoppinglist_shop_areas', ShopArea::class);
	}

	public function find(int $id): ShopArea {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * Get areas for a list: global defaults (list_id IS NULL) + list-specific.
	 *
	 * @return ShopArea[]
	 */
	public function findByList(int $listId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->orX(
				$qb->expr()->isNull('list_id'),
				$qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT))
			))
			->orderBy('sort_order', 'ASC');
		return $this->findEntities($qb);
	}

	/**
	 * @return ShopArea[]
	 */
	public function findGlobalDefaults(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->isNull('list_id'))
			->orderBy('sort_order', 'ASC');
		return $this->findEntities($qb);
	}
}
