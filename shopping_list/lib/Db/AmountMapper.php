<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Amount>
 */
class AmountMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shopping_list_amounts', Amount::class);
	}

	/** The amount remembered for this name in this list, if any. */
	public function findForList(int $listId, string $nameKey): ?Amount {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('list_id', $qb->createNamedParameter($listId)))
			->andWhere($qb->expr()->eq('name_key', $qb->createNamedParameter($nameKey)));
		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException) {
			return null;
		}
	}
}
