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
	 * Create or update the user's row for this list. A list moving in or out
	 * of the pinned section loses its position, so it lands on top of its new
	 * section in the Custom order.
	 */
	public function setPinned(string $userId, int $listId, bool $isPinned): UserListPreference {
		$pref = $this->findOrCreate($userId, $listId);
		$pref->setIsPinned($isPinned);
		$pref->setPosition(null);
		return $this->update($pref);
	}

	/**
	 * Give the user's lists positions 0, 1, 2... in the order given. One
	 * transaction, so a failure leaves the old order untouched.
	 *
	 * @param int[] $listIds
	 */
	public function setPositions(string $userId, array $listIds): void {
		$this->db->beginTransaction();
		try {
			foreach (array_values($listIds) as $index => $listId) {
				$pref = $this->findOrCreate($userId, (int)$listId);
				$pref->setPosition($index);
				$this->update($pref);
			}
			$this->db->commit();
		} catch (\Throwable $e) {
			$this->db->rollBack();
			throw $e;
		}
	}

	private function findOrCreate(string $userId, int $listId): UserListPreference {
		try {
			return $this->find($userId, $listId);
		} catch (DoesNotExistException) {
			$pref = new UserListPreference();
			$pref->setUserId($userId);
			$pref->setListId($listId);
			$pref->setIsPinned(false);
			try {
				return $this->insert($pref);
			} catch (Exception $e) {
				if ($e->getReason() !== Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
					throw $e;
				}
				// Another request created the row since the lookup
				return $this->find($userId, $listId);
			}
		}
	}

	public function deleteByUser(string $userId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->executeStatement();
	}

	public function deleteByList(int $listId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}
}
