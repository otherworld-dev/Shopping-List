<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Service;

use OCA\ShoppingList\Db\ShopArea;
use OCA\ShoppingList\Db\ShopAreaMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;

class ShopAreaService {
	public function __construct(
		private ShopAreaMapper $mapper,
		private ListService $listService,
		private IDBConnection $db,
	) {
	}

	/**
	 * @return ShopArea[]
	 */
	public function findByList(int $listId, string $userId): array {
		$this->listService->assertAccess($listId, $userId);
		return $this->mapper->findByList($listId);
	}

	public function create(int $listId, string $name, ?string $color, string $userId): ShopArea {
		$this->listService->assertWriteAccess($listId, $userId);

		$area = new ShopArea();
		$area->setListId($listId);
		$area->setName($name);
		$area->setColor($color);
		$area->setSortOrder(0);

		return $this->mapper->insert($area);
	}

	public function update(int $id, ?string $name, ?string $color, ?int $sortOrder, string $userId): ShopArea {
		try {
			$area = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		// Global areas can't be edited via list context
		if ($area->getListId() === null) {
			throw new NoPermissionException('Cannot edit global shop areas');
		}

		$this->listService->assertWriteAccess($area->getListId(), $userId);

		if ($name !== null) {
			$area->setName($name);
		}
		if ($color !== null) {
			$area->setColor($color);
		}
		if ($sortOrder !== null) {
			$area->setSortOrder($sortOrder);
		}

		return $this->mapper->update($area);
	}

	public function delete(int $id, string $userId): void {
		try {
			$area = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getListId() === null) {
			throw new NoPermissionException('Cannot delete global shop areas');
		}

		$this->listService->assertWriteAccess($area->getListId(), $userId);

		// Nullify shop_area_id on affected items
		$qb = $this->db->getQueryBuilder();
		$qb->update('shoppinglist_items')
			->set('shop_area_id', $qb->createNamedParameter(null))
			->where($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($area);
	}
}
