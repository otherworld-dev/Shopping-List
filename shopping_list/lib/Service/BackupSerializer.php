<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTimeInterface;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShoppingList;

/**
 * Owns the backup file format. This class is deliberately pure: no database,
 * no HTTP and no files, so the format can be tested on its own and the two
 * surfaces that use it cannot drift apart.
 *
 * Version 1 carries no database ids and no user ids. Everything is referenced
 * by name inside its own list, which is what lets an import always create new
 * rows with no remapping, and what stops a hand-edited file reaching another
 * user's data.
 */
class BackupSerializer {
	public const VERSION = 1;

	/**
	 * @param ShoppingList[] $lists
	 * @param array<int, ShopArea[]> $areasByListId
	 * @param array<int, Item[]> $itemsByListId
	 * @param array<int, string[]> $tagNamesByItemId
	 * @param array<int, bool> $pinnedByListId
	 */
	public function serialize(
		array $lists,
		array $areasByListId,
		array $itemsByListId,
		array $tagNamesByItemId,
		array $pinnedByListId,
		DateTimeInterface $exportedAt,
	): array {
		$exportedLists = [];

		foreach ($lists as $list) {
			$listId = $list->getId();
			$areas = array_values($areasByListId[$listId] ?? []);

			$areaNamesById = [];
			foreach ($areas as $area) {
				$areaNamesById[$area->getId()] = $area->getName();
			}

			$exportedLists[] = [
				'title' => $list->getTitle(),
				'createdAt' => $list->getCreatedAt()?->format(DateTimeInterface::ATOM),
				'updatedAt' => $list->getUpdatedAt()?->format(DateTimeInterface::ATOM),
				'pinned' => ($pinnedByListId[$listId] ?? false) === true,
				'areas' => array_map(
					fn (ShopArea $area): array => [
						'name' => $area->getName(),
						'nameKey' => $area->getNameKey(),
						'color' => $area->getColor(),
						'sortOrder' => $area->getSortOrder(),
						'keywords' => $area->getKeywordsArray(),
					],
					$areas,
				),
				'items' => array_map(
					fn (Item $item): array => [
						'name' => $item->getName(),
						'quantity' => $item->getQuantity(),
						'unit' => $item->getUnit(),
						'area' => $this->areaNameFor($item, $areaNamesById),
						'checked' => $item->getChecked() === true,
						'sortOrder' => $item->getSortOrder(),
						'createdAt' => $item->getCreatedAt()?->format(DateTimeInterface::ATOM),
						'updatedAt' => $item->getUpdatedAt()?->format(DateTimeInterface::ATOM),
						'tags' => array_values($tagNamesByItemId[$item->getId()] ?? []),
					],
					array_values($itemsByListId[$listId] ?? []),
				),
			];
		}

		return [
			'version' => self::VERSION,
			'exportedAt' => $exportedAt->format(DateTimeInterface::ATOM),
			'lists' => $exportedLists,
		];
	}

	/**
	 * @param array<int, string> $areaNamesById
	 */
	private function areaNameFor(Item $item, array $areaNamesById): ?string {
		$areaId = $item->getShopAreaId();
		if ($areaId === null) {
			return null;
		}
		return $areaNamesById[$areaId] ?? null;
	}
}
