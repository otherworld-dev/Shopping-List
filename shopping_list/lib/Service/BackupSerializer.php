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

	/**
	 * Validate a decoded backup payload and normalise it for BackupService.
	 * Nothing is written by this method; a bad file fails here, before the
	 * import touches the database.
	 *
	 * @throws BackupFormatException
	 */
	public function parse(array $payload): array {
		$version = $payload['version'] ?? null;
		if ($version !== self::VERSION) {
			// Refused rather than guessed at, because a later format could
			// mean anything and a wrong guess writes wrong data.
			throw new BackupFormatException(
				'Unsupported backup version: ' . var_export($version, true),
			);
		}

		$rawLists = $payload['lists'] ?? [];
		if (!is_array($rawLists)) {
			throw new BackupFormatException('The lists entry is not a list');
		}

		$lists = [];
		foreach ($rawLists as $index => $rawList) {
			$lists[] = $this->parseList($rawList, (int)$index);
		}
		return $lists;
	}

	/**
	 * @throws BackupFormatException
	 */
	private function parseList(mixed $raw, int $index): array {
		if (!is_array($raw)) {
			throw new BackupFormatException("List at position {$index} is not an object");
		}
		$title = $raw['title'] ?? null;
		if (!is_string($title) || trim($title) === '') {
			throw new BackupFormatException("List at position {$index} has no title");
		}

		$areas = [];
		foreach ($this->arrayAt($raw, 'areas') as $areaIndex => $rawArea) {
			$areas[] = $this->parseArea($rawArea, $index, (int)$areaIndex);
		}

		$items = [];
		foreach ($this->arrayAt($raw, 'items') as $itemIndex => $rawItem) {
			$items[] = $this->parseItem($rawItem, $index, (int)$itemIndex);
		}

		return [
			'title' => trim($title),
			'createdAt' => $this->stringOrNull($raw, 'createdAt'),
			'updatedAt' => $this->stringOrNull($raw, 'updatedAt'),
			'pinned' => ($raw['pinned'] ?? false) === true,
			'areas' => $areas,
			'items' => $items,
		];
	}

	/**
	 * @throws BackupFormatException
	 */
	private function parseArea(mixed $raw, int $listIndex, int $areaIndex): array {
		if (!is_array($raw)) {
			throw new BackupFormatException("Area {$areaIndex} in list {$listIndex} is not an object");
		}
		$name = $raw['name'] ?? null;
		if (!is_string($name) || trim($name) === '') {
			throw new BackupFormatException("Area {$areaIndex} in list {$listIndex} has no name");
		}

		$keywords = [];
		foreach ($this->arrayAt($raw, 'keywords') as $keyword) {
			if (is_string($keyword) && trim($keyword) !== '') {
				$keywords[] = trim($keyword);
			}
		}

		return [
			'name' => trim($name),
			'nameKey' => $this->stringOrNull($raw, 'nameKey'),
			'color' => $this->stringOrNull($raw, 'color'),
			'sortOrder' => (int)($raw['sortOrder'] ?? 0),
			'keywords' => $keywords,
		];
	}

	/**
	 * @throws BackupFormatException
	 */
	private function parseItem(mixed $raw, int $listIndex, int $itemIndex): array {
		if (!is_array($raw)) {
			throw new BackupFormatException("Item {$itemIndex} in list {$listIndex} is not an object");
		}
		$name = $raw['name'] ?? null;
		if (!is_string($name) || trim($name) === '') {
			throw new BackupFormatException("Item {$itemIndex} in list {$listIndex} has no name");
		}

		$tags = [];
		foreach ($this->arrayAt($raw, 'tags') as $tag) {
			if (is_string($tag) && trim($tag) !== '') {
				$tags[] = trim($tag);
			}
		}

		return [
			'name' => trim($name),
			'quantity' => $this->stringOrNull($raw, 'quantity'),
			'unit' => $this->stringOrNull($raw, 'unit'),
			'area' => $this->stringOrNull($raw, 'area'),
			'checked' => ($raw['checked'] ?? false) === true,
			'sortOrder' => (int)($raw['sortOrder'] ?? 0),
			'createdAt' => $this->stringOrNull($raw, 'createdAt'),
			'updatedAt' => $this->stringOrNull($raw, 'updatedAt'),
			'tags' => $tags,
		];
	}

	private function arrayAt(array $raw, string $key): array {
		$value = $raw[$key] ?? [];
		return is_array($value) ? $value : [];
	}

	private function stringOrNull(array $raw, string $key): ?string {
		$value = $raw[$key] ?? null;
		return is_string($value) && $value !== '' ? $value : null;
	}
}
