<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;

class ShopAreaService {
	public function __construct(
		private ShopAreaMapper $mapper,
		private ListService $listService,
		private IDBConnection $db,
	) {
	}

	private const DEFAULTS = [
		['Produce', 0, '#4CAF50'],
		['Dairy', 1, '#2196F3'],
		['Bakery', 2, '#FF9800'],
		['Meat & Seafood', 3, '#F44336'],
		['Frozen', 4, '#00BCD4'],
		['Beverages', 5, '#9C27B0'],
		['Snacks', 6, '#FF5722'],
		['Household', 7, '#607D8B'],
		['Personal Care', 8, '#E91E63'],
		['Other', 9, '#9E9E9E'],
	];

	/**
	 * Ensure global default shop areas exist. Idempotent.
	 */
	public function seedDefaults(): void {
		$existing = $this->mapper->findGlobalDefaults();
		if (count($existing) > 0) {
			return;
		}

		foreach (self::DEFAULTS as [$name, $sortOrder, $color]) {
			$area = new ShopArea();
			$area->setListId(null);
			$area->setName($name);
			$area->setSortOrder($sortOrder);
			$area->setColor($color);
			$this->mapper->insert($area);
		}
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
		$qb->update('shopping_list_items')
			->set('shop_area_id', $qb->createNamedParameter(null))
			->where($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($area);
	}
}
