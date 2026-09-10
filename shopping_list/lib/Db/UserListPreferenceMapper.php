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
		} catch (\Exception $e) {
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
				// Retry insert (should succeed now)
				return $this->insert($pref);
			}

			$existing = UserListPreference::fromRow($row);
			$existing->setIsPinned($isPinned);
			return $this->update($existing);
		}
	}
}
