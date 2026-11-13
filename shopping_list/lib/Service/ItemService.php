<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\Parsing\ItemMerge;
use OCA\Shopping_List\Service\Parsing\ParsingPack;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\IUserManager;

class ItemService {
	public function __construct(
		private ItemMapper $mapper,
		private ListService $listService,
		private ShopAreaService $shopAreaService,
		private PushService $pushService,
		private IDBConnection $db,
		private ItemImageCleanup $imageCleanup,
		private ItemImageService $images,
		private IUserManager $userManager,
		private AmountMemory $amounts,
		private IL10N $l,
	) {
	}

	/** The name to show for a user's change, as it is now; the uid when they have none. */
	private function nameOf(string $userId): string {
		return mb_substr($this->userManager->getDisplayName($userId) ?? $userId, 0, 64);
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
		bool $checked = false,
		bool $quantityExplicit = false,
		?string $via = null,
	): Item {
		$this->listService->assertWriteAccess($listId, $userId);

		$item = new Item();
		$item->setListId($listId);
		$item->setName($name);
		// A name added on its own gets the amount it had last time in this list.
		$item->setQuantity($quantity ?? $this->amounts->recall($listId, $name) ?? '1');
		$item->setUnit($unit);
		// A client sends no area when no keyword matched, and the list's default
		// area is for exactly those items.
		$item->setShopAreaId($shopAreaId ?? $this->shopAreaService->defaultAreaFor($listId));
		// A pasted "[x] Milk" line arrives as already bought, so it lands in the
		// checked-off section straight away instead of among the open items.
		$item->setChecked($checked);
		$item->setCheckedBy($checked ? $userId : null);
		$item->setCheckedByName($checked ? $this->nameOf($userId) : null);
		$item->setAddedBy($userId);
		$item->setAddedByName($this->nameOf($userId));
		$item->setAddedVia($via);
		$item->setCheckedVia($checked ? $via : null);
		$item->setSortOrder(0);
		// A name that had a photo before gets it back, in any list.
		$item->setImageKey($this->images->rememberedKey($listId, $name));
		$now = new DateTime();
		$item->setCreatedAt($now);
		$item->setUpdatedAt($now);

		$item = $this->mapper->insert($item);

		if ($quantityExplicit && $quantity !== null) {
			$this->amounts->remember($listId, $name, $quantity);
		}
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
			$renamed = ItemImageService::nameKey($fields['name']) !== ItemImageService::nameKey($item->getName());
			$item->setName($fields['name']);
			if ($renamed) {
				// Take the new name's photo if it has one; otherwise keep the current one.
				$remembered = $this->images->rememberedKey($item->getListId(), $fields['name']);
				if ($remembered !== null) {
					$item->setImageKey($remembered);
				}
			}
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

		// Remember an amount the user typed, not one a duplicate merge added up
		if (!empty($fields['quantityExplicit']) && array_key_exists('quantity', $fields)) {
			$quantity = $fields['quantity'];
			$this->amounts->remember($item->getListId(), $item->getName(), $quantity === null ? null : (string)$quantity);
		}

		// Learn area assignment from explicit user choice
		$areaExplicit = !empty($fields['areaExplicit']);
		if ($areaExplicit && array_key_exists('shopAreaId', $fields) && $fields['shopAreaId'] !== null) {
			$itemName = $fields['name'] ?? $item->getName();
			$this->shopAreaService->learnKeyword($item->getListId(), (int)$fields['shopAreaId'], $itemName);
		}

		$this->pushService->notifyItemUpdate($item->getListId(), $id, 'updated', $userId);
		return $item;
	}

	/**
	 * Move an item to another list. Requires write access to both lists.
	 * The shop area is re-resolved in the target list (same-name area, else
	 * keyword detection, else that list's default area, which is uncategorized
	 * when it has none) and the item is reset to unchecked.
	 */
	public function move(int $id, int $targetListId, string $userId): Item {
		try {
			$item = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$sourceListId = $item->getListId();
		$this->listService->assertWriteAccess($sourceListId, $userId);
		$this->listService->assertWriteAccess($targetListId, $userId);

		if ($targetListId === $sourceListId) {
			return $item;
		}

		$sourceAreaName = null;
		if ($item->getShopAreaId() !== null) {
			try {
				$sourceAreaName = $this->shopAreaService->find($item->getShopAreaId())->getName();
			} catch (NotFoundException) {
				// area gone — fall back to keyword detection
			}
		}

		$item->setListId($targetListId);
		$item->setShopAreaId($this->shopAreaService->findAreaForMove($targetListId, $sourceAreaName, $item->getName()));
		if ($item->getImageKey() === null) {
			$item->setImageKey($this->images->rememberedKey($targetListId, $item->getName()));
		}
		$item->setChecked(false);
		$item->setCheckedBy(null);
		$item->setCheckedByName(null);
		$item->setCheckedVia(null);
		$item->setSortOrder(0);
		$item->setUpdatedAt(new DateTime());

		$item = $this->mapper->update($item);

		// Notify both lists so the item leaves the source and appears in the target
		$this->pushService->notifyItemUpdate($sourceListId, $id, 'deleted', $userId);
		$this->pushService->notifyItemUpdate($targetListId, $id, 'created', $userId);
		return $item;
	}

	/**
	 * Copy an item to another list, leaving the original as it is. Requires
	 * write access to both lists. The copy lands as if the user had added it
	 * by hand there: an open item of the same name takes the amount on top,
	 * a ticked-off one comes back with this amount, otherwise a new item is
	 * added with the area resolved as for a move and the same photo.
	 */
	public function copy(int $id, int $targetListId, string $userId, ?string $via = null): Item {
		try {
			$source = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$sourceListId = $source->getListId();
		$this->listService->assertWriteAccess($sourceListId, $userId);
		$this->listService->assertWriteAccess($targetListId, $userId);

		if ($targetListId === $sourceListId) {
			return $source;
		}

		$name = $source->getName();
		$merge = new ItemMerge(ParsingPack::forLanguage($this->l->getLanguageCode()));
		$onTarget = $this->mapper->findAllByList($targetListId);

		$open = $merge->findOpenMatch($onTarget, $name);
		if ($open !== null) {
			// Same rule as the add box: the amounts add up, and a name going
			// from one to more than one is pluralised. The total isn't typed,
			// so it is not remembered.
			$merged = $merge->mergeQuantities($open->getQuantity(), $source->getQuantity() ?? '1');
			$fields = ['quantity' => $merged];
			$before = self::leadingNumber($open->getQuantity());
			$after = self::leadingNumber($merged);
			if ($before !== null && $after !== null && $before <= 1 && $after > 1) {
				$plural = $merge->pluralizeName($open->getName());
				if ($plural !== $open->getName()) {
					$fields['name'] = $plural;
				}
			}
			return $this->update($open->getId(), $fields, $userId);
		}

		// Ticked off already: bring that one back with this amount rather
		// than add another beside it.
		$ticked = $merge->findCheckedMatch($onTarget, $name);
		if ($ticked !== null) {
			if ($source->getQuantity() !== null) {
				$ticked->setQuantity($source->getQuantity());
			}
			$ticked->setChecked(false);
			$ticked->setCheckedBy(null);
			$ticked->setCheckedByName(null);
			$ticked->setCheckedVia(null);
			$ticked->setUpdatedAt(new DateTime());
			$ticked = $this->mapper->update($ticked);
			$this->pushService->notifyItemUpdate($targetListId, $ticked->getId(), 'updated', $userId);
			return $ticked;
		}

		$sourceAreaName = null;
		if ($source->getShopAreaId() !== null) {
			try {
				$sourceAreaName = $this->shopAreaService->find($source->getShopAreaId())->getName();
			} catch (NotFoundException) {
				// area gone — fall back to keyword detection
			}
		}

		$item = new Item();
		$item->setListId($targetListId);
		$item->setName($name);
		$item->setQuantity($source->getQuantity());
		$item->setUnit($source->getUnit());
		$item->setShopAreaId($this->shopAreaService->findAreaForMove($targetListId, $sourceAreaName, $name));
		$item->setChecked(false);
		$item->setAddedBy($userId);
		$item->setAddedByName($this->nameOf($userId));
		$item->setAddedVia($via);
		$item->setSortOrder(0);
		// Photos are shared by key and only deleted once nothing shows them,
		// so the copy can show the same one.
		$item->setImageKey($source->getImageKey() ?? $this->images->rememberedKey($targetListId, $name));
		$now = new DateTime();
		$item->setCreatedAt($now);
		$item->setUpdatedAt($now);

		$item = $this->mapper->insert($item);

		$this->pushService->notifyItemUpdate($targetListId, $item->getId(), 'created', $userId);
		return $item;
	}

	/** The number an amount starts with, as parseFloat reads it in the web app */
	private static function leadingNumber(?string $quantity): ?float {
		return preg_match('/^\s*(\d+(?:\.\d+)?)/', $quantity ?? '', $m) ? (float)$m[1] : null;
	}

	public function check(int $id, bool $checked, string $userId, ?string $via = null): Item {
		try {
			$item = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}

		$this->listService->assertWriteAccess($item->getListId(), $userId);

		$item->setChecked($checked);
		$item->setCheckedBy($checked ? $userId : null);
		$item->setCheckedByName($checked ? $this->nameOf($userId) : null);
		$item->setCheckedVia($checked ? $via : null);
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

		$this->listService->assertWriteAccess($item->getListId(), $userId);
		$this->deleteEntity($item, $userId);
	}

	/**
	 * Remove an item the caller has already checked access to: its tag rows,
	 * the row itself, its photo's files if nothing else uses them (a photo
	 * stays remembered for its name), then a push to the others on the list.
	 * The public link controller uses this too, with an empty exclude id so
	 * everyone is told.
	 */
	public function deleteEntity(Item $item, string $excludeUserId): void {
		$id = $item->getId();
		$listId = $item->getListId();

		// Delete item tags
		$qb = $this->db->getQueryBuilder();
		$qb->delete('shopping_list_itags')
			->where($qb->expr()->eq('item_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($item);
		// After the row, not before: an orphan file is harmless, a key with no file is not.
		if ($item->getImageKey() !== null) {
			$this->imageCleanup->release([$item->getImageKey()]);
		}
		$this->pushService->notifyItemUpdate($listId, $id, 'deleted', $excludeUserId);
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

		$imageKeys = [];
		foreach ($this->mapper->findAllByList($listId) as $item) {
			$imageKeys[$item->getId()] = $item->getImageKey();
		}
		$deletedIds = $this->mapper->deleteChecked($listId);

		// Clean up item_tags for deleted items
		if (!empty($deletedIds)) {
			$qb = $this->db->getQueryBuilder();
			$qb->delete('shopping_list_itags')
				->where($qb->expr()->in('item_id', $qb->createNamedParameter($deletedIds, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT_ARRAY)))
				->executeStatement();
		}
		// The photos stay remembered for their names; only unused files go.
		$this->imageCleanup->release(array_values(array_filter(
			array_map(fn (int $id) => $imageKeys[$id] ?? null, $deletedIds),
		)));
		$this->pushService->notifyItemUpdate($listId, 0, 'cleared', $userId);
	}

	public function uncheckAll(int $listId, string $userId): void {
		$this->listService->assertWriteAccess($listId, $userId);
		$this->mapper->uncheckAll($listId);
		$this->pushService->notifyItemUpdate($listId, 0, 'unchecked', $userId);
	}
}
