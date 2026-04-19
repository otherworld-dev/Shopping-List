<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;

class ItemService {
	public function __construct(
		private ItemMapper $mapper,
		private ListService $listService,
		private ShopAreaService $shopAreaService,
		private PushService $pushService,
		private IDBConnection $db,
	) {
	}

	/**
	 * @return Item[]
	 */
	public function findAll(int $listId, string $userId): array {
		$this->listService->assertAccess($listId, $userId);
		return $this->mapper->findAllByList($listId);
	}

	public function create(
		int $listId,
		string $name,
		?string $quantity,
		?string $unit,
		?int $shopAreaId,
		string $userId,
		bool $areaExplicit = false,
	): Item {
		$this->listService->assertWriteAccess($listId, $userId);

		$item = new Item();
		$item->setListId($listId);
		$item->setName($name);
		$item->setQuantity($quantity ?? '1');
		$item->setUnit($unit);
		$item->setShopAreaId($shopAreaId);
		$item->setChecked(false);
		$item->setSortOrder(0);
		$now = new DateTime();
		$item->setCreatedAt($now);
		$item->setUpdatedAt($now);

		$item = $this->mapper->insert($item);

		if ($areaExplicit && $shopAreaId !== null) {
			$this->shopAreaService->learnKeyword($listId, $shopAreaId, $name);
		}

		$this->pushService->notifyItemUpdate($listId, $item->getId(), 'created', $userId);
		return $item;
	}

	public function update(int $id, array $fields, string $userId): Item {
		try {
			$item = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$this->listService->assertWriteAccess($item->getListId(), $userId);

		if (isset($fields['name'])) {
			$item->setName($fields['name']);
		}
		if (array_key_exists('quantity', $fields)) {
			$item->setQuantity($fields['quantity']);
		}
		if (array_key_exists('unit', $fields)) {
			$item->setUnit($fields['unit']);
		}
		if (array_key_exists('shopAreaId', $fields)) {
			$item->setShopAreaId($fields['shopAreaId']);
		}
		if (isset($fields['sortOrder'])) {
			$item->setSortOrder($fields['sortOrder']);
		}
		$item->setUpdatedAt(new DateTime());

		$item = $this->mapper->update($item);

		// Learn area assignment from explicit user choice
		$areaExplicit = !empty($fields['areaExplicit']);
		if ($areaExplicit && array_key_exists('shopAreaId', $fields) && $fields['shopAreaId'] !== null) {
			$itemName = $fields['name'] ?? $item->getName();
			$this->shopAreaService->learnKeyword($item->getListId(), (int)$fields['shopAreaId'], $itemName);
		}

		$this->pushService->notifyItemUpdate($item->getListId(), $id, 'updated', $userId);
		return $item;
	}

	public function check(int $id, bool $checked, string $userId): Item {
		try {
			$item = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$this->listService->assertWriteAccess($item->getListId(), $userId);

		$item->setChecked($checked);
		$item->setCheckedBy($checked ? $userId : null);
		$item->setUpdatedAt(new DateTime());

		$item = $this->mapper->update($item);
		$this->pushService->notifyItemUpdate($item->getListId(), $id, $checked ? 'checked' : 'unchecked', $userId);
		return $item;
	}

	public function delete(int $id, string $userId): void {
		try {
			$item = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$listId = $item->getListId();
		$this->listService->assertWriteAccess($listId, $userId);

		// Delete item tags
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shopping_list_itags')
			->where($qb->expr()->eq('item_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($item);
		$this->pushService->notifyItemUpdate($listId, $id, 'deleted', $userId);
	}

	public function reorder(int $listId, array $sortedIds, string $userId): void {
		$this->listService->assertWriteAccess($listId, $userId);

		foreach ($sortedIds as $index => $id) {
			$this->mapper->updateSortOrder((int)$id, $index);
		}
		$this->pushService->notifyItemUpdate($listId, 0, 'reordered', $userId);
	}

	public function clearChecked(int $listId, string $userId): void {
		$this->listService->assertWriteAccess($listId, $userId);

		$deletedIds = $this->mapper->deleteChecked($listId);

		// Clean up item_tags for deleted items
		if (!empty($deletedIds)) {
			$qb = $this->db->getQueryBuilder();
			$qb->delete('shopping_list_itags')
				->where($qb->expr()->in('item_id', $qb->createNamedParameter($deletedIds, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT_ARRAY)))
				->executeStatement();
		}
		$this->pushService->notifyItemUpdate($listId, 0, 'cleared', $userId);
	}

	public function uncheckAll(int $listId, string $userId): void {
		$this->listService->assertWriteAccess($listId, $userId);
		$this->mapper->uncheckAll($listId);
		$this->pushService->notifyItemUpdate($listId, 0, 'unchecked', $userId);
	}
}
