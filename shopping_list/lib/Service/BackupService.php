<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ItemTagMapper;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\TagMapper;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCP\AppFramework\Db\TTransactional;
use OCP\IDBConnection;

/**
 * Reads and writes a user's shopping lists as a backup payload. The format
 * itself lives in BackupSerializer; this class only moves rows.
 *
 * Import deliberately uses the mappers rather than ListService and
 * ItemService. ListService::create seeds twelve default areas, which would
 * land on top of the ones in the file, and ItemService::create forces the
 * sort order to zero, stamps checkedBy and fires a push notification.
 */
class BackupService {
	use TTransactional;

	public function __construct(
		private ShoppingListMapper $listMapper,
		private ShopAreaMapper $areaMapper,
		private ItemMapper $itemMapper,
		private ItemTagMapper $itemTagMapper,
		private TagMapper $tagMapper,
		private UserListPreferenceMapper $preferenceMapper,
		private BackupSerializer $serializer,
		private IDBConnection $db,
	) {
	}

	public function export(string $userId): array {
		$lists = $this->listMapper->findAllByUser($userId);

		$preferences = $this->preferenceMapper->findAllByUser($userId);
		$pinnedByListId = [];
		foreach ($preferences as $listId => $preference) {
			$pinnedByListId[$listId] = $preference->getIsPinned() === true;
		}

		$tagNamesById = [];
		foreach ($this->tagMapper->findByUser($userId) as $tag) {
			$tagNamesById[$tag->getId()] = $tag->getName();
		}

		$areasByListId = [];
		$itemsByListId = [];
		$tagNamesByItemId = [];

		foreach ($lists as $list) {
			$listId = $list->getId();
			$areasByListId[$listId] = $this->areaMapper->findByList($listId);
			$items = $this->itemMapper->findAllByList($listId);
			$itemsByListId[$listId] = $items;

			$itemIds = array_map(static fn (Item $item): int => $item->getId(), $items);
			if ($itemIds === []) {
				continue;
			}

			// One query for the whole list rather than one per item.
			foreach ($this->itemTagMapper->findTagIdsByItems($itemIds) as $itemId => $tagIds) {
				$names = [];
				foreach ($tagIds as $tagId) {
					if (isset($tagNamesById[$tagId])) {
						$names[] = $tagNamesById[$tagId];
					}
				}
				$tagNamesByItemId[$itemId] = $names;
			}
		}

		return $this->serializer->serialize(
			$lists,
			$areasByListId,
			$itemsByListId,
			$tagNamesByItemId,
			$pinnedByListId,
			new DateTime(),
		);
	}

	/**
	 * Always creates new lists. Nothing already in the account is updated or
	 * deleted, so a restore cannot lose anything, and restoring twice simply
	 * gives two copies.
	 *
	 * @return array{lists: int, areas: int, items: int}
	 * @throws BackupFormatException
	 */
	public function import(string $userId, array $payload): array {
		return $this->atomic(function () use ($userId, $payload): array {
			$lists = $this->serializer->parse($payload);

			$counts = ['lists' => 0, 'areas' => 0, 'items' => 0];

			foreach ($lists as $parsed) {
				$list = $this->insertList($userId, $parsed);
				$counts['lists']++;

				$areaIdsByName = [];
				foreach ($parsed['areas'] as $parsedArea) {
					$area = $this->insertArea($list->getId(), $parsedArea);
					$counts['areas']++;
					// First match wins if a list somehow holds two areas with
					// the same name; the user already sees two identical rows.
					$areaIdsByName[$parsedArea['name']] ??= $area->getId();
				}

				foreach ($parsed['items'] as $parsedItem) {
					$this->insertItem($userId, $list->getId(), $parsedItem, $areaIdsByName);
					$counts['items']++;
				}

				if ($parsed['pinned']) {
					$this->preferenceMapper->setPinned($userId, $list->getId(), true);
				}
			}

			return $counts;
		}, $this->db);
	}

	private function insertList(string $userId, array $parsed): ShoppingList {
		$list = new ShoppingList();
		$list->setUserId($userId);
		$list->setTitle($parsed['title']);
		$list->setCreatedAt($this->date($parsed['createdAt']));
		$list->setUpdatedAt($this->date($parsed['updatedAt']));
		return $this->listMapper->insert($list);
	}

	private function insertArea(int $listId, array $parsed): ShopArea {
		$area = new ShopArea();
		$area->setListId($listId);
		$area->setName($parsed['name']);
		// Carried across unchanged so a default area restored from a file is
		// still translated for whoever views it.
		$area->setNameKey($parsed['nameKey']);
		$area->setColor($parsed['color']);
		$area->setSortOrder($parsed['sortOrder']);
		$area->setKeywordsArray($parsed['keywords']);
		return $this->areaMapper->insert($area);
	}

	/**
	 * @param array<string, int> $areaIdsByName
	 */
	private function insertItem(string $userId, int $listId, array $parsed, array $areaIdsByName): Item {
		$item = new Item();
		$item->setListId($listId);
		$item->setName($parsed['name']);
		$item->setQuantity($parsed['quantity'] ?? '1');
		$item->setUnit($parsed['unit']);
		$item->setShopAreaId($parsed['area'] !== null ? ($areaIdsByName[$parsed['area']] ?? null) : null);
		$item->setChecked($parsed['checked']);
		// The file carries no checkedBy, and with shares not exported the
		// restored list is private, so there is nobody to credit.
		$item->setCheckedBy(null);
		$item->setSortOrder($parsed['sortOrder']);
		$item->setCreatedAt($this->date($parsed['createdAt']));
		$item->setUpdatedAt($this->date($parsed['updatedAt']));
		$item = $this->itemMapper->insert($item);

		if ($parsed['tags'] !== []) {
			$tagIds = [];
			foreach ($parsed['tags'] as $name) {
				// Folds into the importing user's existing tags rather than
				// duplicating them.
				$tagIds[] = $this->tagMapper->findOrCreate($name, $userId)->getId();
			}
			$this->itemTagMapper->setTagsForItem($item->getId(), $tagIds);
		}

		return $item;
	}

	private function date(?string $value): DateTime {
		if ($value === null) {
			return new DateTime();
		}
		try {
			return new DateTime($value);
		} catch (\Exception) {
			return new DateTime();
		}
	}
}
