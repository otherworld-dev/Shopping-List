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
		// Check if preference exists
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->andWhere($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));

		$result = $qb->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();

		if ($row !== false) {
			// Update existing
			$pref = UserListPreference::fromRow($row);
			$pref->setIsPinned($isPinned);
			return $this->update($pref);
		} else {
			// Insert new
			$pref = new UserListPreference();
			$pref->setUserId($userId);
			$pref->setListId($listId);
			$pref->setIsPinned($isPinned);
			return $this->insert($pref);
		}
	}
}
