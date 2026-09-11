<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<UserListPreference>
 */
class UserListPreferenceMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shopping_list_prefs', UserListPreference::class);
	}

	/**
	 * @throws DoesNotExistException
	 */
	public function find(string $userId, int $listId): UserListPreference {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->andWhere($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * @return array<int, UserListPreference> keyed by list id
	 */
	public function findAllByUser(string $userId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));

		$prefs = [];
		foreach ($this->findEntities($qb) as $pref) {
			$prefs[$pref->getListId()] = $pref;
		}
		return $prefs;
	}

	/**
	 * Create or update the user's row for this list.
	 */
	public function setPinned(string $userId, int $listId, bool $isPinned): UserListPreference {
		try {
			$pref = $this->find($userId, $listId);
		} catch (DoesNotExistException) {
			$pref = new UserListPreference();
			$pref->setUserId($userId);
			$pref->setListId($listId);
			$pref->setIsPinned($isPinned);
			try {
				return $this->insert($pref);
			} catch (Exception $e) {
				if ($e->getReason() !== Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
					throw $e;
				}
				// Another request created the row since the lookup
				$pref = $this->find($userId, $listId);
			}
		}

		$pref->setIsPinned($isPinned);
		return $this->update($pref);
	}

	public function deleteByList(int $listId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}
}
