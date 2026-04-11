<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Migration: Make shop areas list-scoped instead of user-scoped.
 *
 * 1. Add list_id column (nullable initially)
 * 2. For each area, duplicate it for every list owned by that user
 * 3. Update item references to point to the new per-list area copies
 * 4. Drop user_id column and old index, add list_id index
 */
class Version1001Date20260411000000 extends SimpleMigrationStep {
	public function __construct(
		private IDBConnection $db,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('shopping_list_areas');

		// Step 1: Add list_id column (nullable for now — populated in postSchemaChange)
		if (!$table->hasColumn('list_id')) {
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => false,
				'unsigned' => true,
			]);
		}

		return $schema;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		// Step 2: For each user's areas, duplicate them for each list that user owns.
		// Then update item shop_area_id references to point to the correct per-list copy.

		// Build a map of user_id => [list_ids]
		$qb = $this->db->getQueryBuilder();
		$qb->select('id', 'user_id')->from('shopping_list_lists');
		$result = $qb->executeQuery();
		$listsByUser = [];
		while ($row = $result->fetch()) {
			$listsByUser[$row['user_id']][] = (int)$row['id'];
		}
		$result->closeCursor();

		// Get all existing areas
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')->from('shopping_list_areas')->where($qb->expr()->isNull('list_id'));
		$result = $qb->executeQuery();
		$areas = $result->fetchAll();
		$result->closeCursor();

		$this->db->beginTransaction();
		try {
			foreach ($areas as $area) {
				$userId = $area['user_id'];
				$oldAreaId = (int)$area['id'];
				$userLists = $listsByUser[$userId] ?? [];

				if (count($userLists) === 0) {
					// User has no lists — delete orphaned area
					$qb = $this->db->getQueryBuilder();
					$qb->delete('shopping_list_areas')
						->where($qb->expr()->eq('id', $qb->createNamedParameter($oldAreaId, IQueryBuilder::PARAM_INT)))
						->executeStatement();
					continue;
				}

				// Assign the original area to the first list
				$firstListId = $userLists[0];
				$qb = $this->db->getQueryBuilder();
				$qb->update('shopping_list_areas')
					->set('list_id', $qb->createNamedParameter($firstListId, IQueryBuilder::PARAM_INT))
					->where($qb->expr()->eq('id', $qb->createNamedParameter($oldAreaId, IQueryBuilder::PARAM_INT)))
					->executeStatement();

				// For additional lists, insert copies and remap item references
				for ($i = 1; $i < count($userLists); $i++) {
					$listId = $userLists[$i];

					// Insert a copy
					$qb = $this->db->getQueryBuilder();
					$qb->insert('shopping_list_areas')
						->values([
							'user_id' => $qb->createNamedParameter($area['user_id']),
							'list_id' => $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT),
							'name' => $qb->createNamedParameter($area['name']),
							'sort_order' => $qb->createNamedParameter((int)$area['sort_order'], IQueryBuilder::PARAM_INT),
							'color' => $qb->createNamedParameter($area['color']),
							'keywords' => $qb->createNamedParameter($area['keywords']),
						])
						->executeStatement();

					$newAreaId = (int)$this->db->lastInsertId('shopping_list_areas');

					// Update items in this list that referenced the old area
					$qb = $this->db->getQueryBuilder();
					$qb->update('shopping_list_items')
						->set('shop_area_id', $qb->createNamedParameter($newAreaId, IQueryBuilder::PARAM_INT))
						->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
						->andWhere($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($oldAreaId, IQueryBuilder::PARAM_INT)))
						->executeStatement();
				}
			}
			$this->db->commit();
		} catch (\Throwable $e) {
			$this->db->rollBack();
			throw $e;
		}
	}
}
