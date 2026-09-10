<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<UserListPreference>
 */
class UserListPreferenceMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shopping_list_user_prefs', UserListPreference::class);
	}

	/**
	 * Find all preferences for a user, keyed by list_id.
	 *
	 * @return array<int, UserListPreference>
	 */
	public function findAllByUser(string $userId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));

		$result = $qb->executeQuery();
		$prefs = [];
		while ($row = $result->fetch()) {
			$entity = UserListPreference::fromRow($row);
			$prefs[$entity->getListId()] = $entity;
		}
		$result->closeCursor();

		return $prefs;
	}

	/**
	 * Insert or update a preference.
	 */
	public function upsert(string $userId, int $listId, bool $isPinned): UserListPreference {
		// Try insert first (optimistic path - preference doesn't exist yet)
		$pref = new UserListPreference();
		$pref->setUserId($userId);
		$pref->setListId($listId);
		$pref->setIsPinned($isPinned);

		try {
			return $this->insert($pref);
		} catch (\OCP\DB\Exception $e) {
			// Duplicate key - preference already exists, update it instead
			$qb = $this->db->getQueryBuilder();
			$qb->select('*')
				->from($this->getTableName())
				->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
				->andWhere($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));

			$result = $qb->executeQuery();
			$row = $result->fetch();
			$result->closeCursor();

			if ($row === false) {
				// Edge case: row was deleted between insert attempt and select
				// Try insert again (should succeed, but handle duplicate if another thread beat us)
				try {
					return $this->insert($pref);
				} catch (\OCP\DB\Exception $retryException) {
					// Another thread inserted concurrently - fetch and update
					$qb2 = $this->db->getQueryBuilder();
					$qb2->select('*')
						->from($this->getTableName())
						->where($qb2->expr()->eq('user_id', $qb2->createNamedParameter($userId)))
						->andWhere($qb2->expr()->eq('list_id', $qb2->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));

					$result2 = $qb2->executeQuery();
					$row2 = $result2->fetch();
					$result2->closeCursor();

					if ($row2 === false) {
						// Should never happen - throw original exception
						throw $retryException;
					}

					$existing = UserListPreference::fromRow($row2);
					$existing->setIsPinned($isPinned);

					// Manual UPDATE using composite key (can't use parent update() - no id field)
					$updateQb = $this->db->getQueryBuilder();
					$updateQb->update($this->getTableName())
						->set('is_pinned', $updateQb->createNamedParameter($isPinned, IQueryBuilder::PARAM_BOOL))
						->where($updateQb->expr()->eq('user_id', $updateQb->createNamedParameter($userId)))
						->andWhere($updateQb->expr()->eq('list_id', $updateQb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));
					$updateQb->executeStatement();

					return $existing;
				}
			}

			$existing = UserListPreference::fromRow($row);
			$existing->setIsPinned($isPinned);

			// Manual UPDATE using composite key (can't use parent update() - no id field)
			$updateQb = $this->db->getQueryBuilder();
			$updateQb->update($this->getTableName())
				->set('is_pinned', $updateQb->createNamedParameter($isPinned, IQueryBuilder::PARAM_BOOL))
				->where($updateQb->expr()->eq('user_id', $updateQb->createNamedParameter($userId)))
				->andWhere($updateQb->expr()->eq('list_id', $updateQb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));
			$updateQb->executeStatement();

			return $existing;
		}
	}
}
