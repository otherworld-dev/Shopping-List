<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<ItemTag>
 */
class ItemTagMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shopping_list_item_tags', ItemTag::class);
	}

	/**
	 * Get all tag IDs for a single item.
	 *
	 * @return int[]
	 */
	public function findTagIdsByItem(int $itemId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('tag_id')
			->from($this->getTableName())
			->where($qb->expr()->eq('item_id', $qb->createNamedParameter($itemId, IQueryBuilder::PARAM_INT)));
		$result = $qb->executeQuery();
		$ids = [];
		while ($row = $result->fetch()) {
			$ids[] = (int)$row['tag_id'];
		}
		$result->closeCursor();
		return $ids;
	}

	/**
	 * Batch load tag IDs for multiple items.
	 *
	 * @param int[] $itemIds
	 * @return array<int, int[]> itemId => [tagId, ...]
	 */
	public function findTagIdsByItems(array $itemIds): array {
		if (empty($itemIds)) {
			return [];
		}
		$qb = $this->db->getQueryBuilder();
		$qb->select('item_id', 'tag_id')
			->from($this->getTableName())
			->where($qb->expr()->in('item_id', $qb->createNamedParameter($itemIds, IQueryBuilder::PARAM_INT_ARRAY)));
		$result = $qb->executeQuery();
		$map = [];
		while ($row = $result->fetch()) {
			$itemId = (int)$row['item_id'];
			$map[$itemId][] = (int)$row['tag_id'];
		}
		$result->closeCursor();
		return $map;
	}

	public function setTagsForItem(int $itemId, array $tagIds): void {
		// Delete existing
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('item_id', $qb->createNamedParameter($itemId, IQueryBuilder::PARAM_INT)))
			->executeStatement();

		// Insert new
		foreach ($tagIds as $tagId) {
			$qb = $this->db->getQueryBuilder();
			$qb->insert($this->getTableName())
				->values([
					'item_id' => $qb->createNamedParameter($itemId, IQueryBuilder::PARAM_INT),
					'tag_id' => $qb->createNamedParameter($tagId, IQueryBuilder::PARAM_INT),
				])
				->executeStatement();
		}
	}
}
