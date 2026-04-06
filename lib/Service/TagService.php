<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Service;

use OCA\ShoppingList\Db\Tag;
use OCA\ShoppingList\Db\TagMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;

class TagService {
	public function __construct(
		private TagMapper $mapper,
		private IDBConnection $db,
	) {
	}

	/**
	 * @return Tag[]
	 */
	public function findAll(string $userId): array {
		return $this->mapper->findByUser($userId);
	}

	public function create(string $name, string $userId): Tag {
		return $this->mapper->findOrCreate($name, $userId);
	}

	public function delete(int $id, string $userId): void {
		try {
			$tag = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Tag not found');
		}

		if ($tag->getUserId() !== $userId) {
			throw new NoPermissionException('Cannot delete this tag');
		}

		// Remove item_tag links
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shoppinglist_item_tags')
			->where($qb->expr()->eq('tag_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($tag);
	}
}
