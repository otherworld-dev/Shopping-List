<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Tag>
 */
class TagMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'shoppinglist_tags', Tag::class);
	}

	public function find(int $id): Tag {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		return $this->findEntity($qb);
	}

	/**
	 * @return Tag[]
	 */
	public function findByUser(string $userId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->orderBy('name', 'ASC');
		return $this->findEntities($qb);
	}

	public function findByNameAndUser(string $name, string $userId): ?Tag {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('name', $qb->createNamedParameter($name)))
			->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));
		try {
			return $this->findEntity($qb);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			return null;
		}
	}

	public function findOrCreate(string $name, string $userId): Tag {
		$existing = $this->findByNameAndUser($name, $userId);
		if ($existing !== null) {
			return $existing;
		}
		$tag = new Tag();
		$tag->setName($name);
		$tag->setUserId($userId);
		return $this->insert($tag);
	}
}
