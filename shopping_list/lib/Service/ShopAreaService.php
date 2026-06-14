<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use OCP\IL10N;

class ShopAreaService {
	public function __construct(
		private ShopAreaMapper $mapper,
		private IDBConnection $db,
		private IL10N $l,
	) {
	}

	// [stable English name, sortOrder, color]. Keyword sets live in
	// resources/keywords/<lang>.json (translatable via Crowdin) and are loaded
	// at seed time by loadKeywordDefaults(), keyed by the English name below.
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
		['General', 9, '#795548'],
		['Pets', 10, '#8D6E63'],
		['Other', 11, '#9E9E9E'],
	];

	/**
	 * Load per-area keyword defaults for a language, keyed by stable English
	 * area name. Each area's value is a comma/newline-joined string (one
	 * free-form list the translator edits in Crowdin). Falls back to English.
	 *
	 * @return array<string, string[]>
	 */
	private function loadKeywordDefaults(string $lang): array {
		$parsed = $this->readKeywordFile($lang);
		// A missing OR malformed non-English pack degrades to English keywords
		// rather than seeding a list with no keywords at all.
		if ($parsed === null && $lang !== 'en') {
			$parsed = $this->readKeywordFile('en');
		}
		return $parsed ?? [];
	}

	/**
	 * Read and normalize one keyword pack, or null if missing/unreadable/malformed.
	 *
	 * @return array<string, string[]>|null
	 */
	private function readKeywordFile(string $lang): ?array {
		$file = __DIR__ . '/../../resources/keywords/' . $lang . '.json';
		if (!is_file($file)) {
			return null;
		}
		$raw = file_get_contents($file);
		if ($raw === false) {
			return null;
		}
		$data = json_decode($raw, true);
		if (!is_array($data)) {
			return null;
		}

		$result = [];
		foreach ($data as $areaKey => $joined) {
			if (!is_string($joined)) {
				continue;
			}
			$tokens = preg_split('/[,\n]/', $joined) ?: [];
			$seen = [];
			foreach ($tokens as $token) {
				$kw = mb_strtolower(trim($token));
				if ($kw !== '') {
					$seen[$kw] = true;
				}
			}
			$result[$areaKey] = array_keys($seen);
		}
		return $result;
	}

	/**
	 * Seed default areas for a list. Only creates if list has zero areas.
	 */
	public function seedDefaults(int $listId): void {
		if ($this->mapper->countByList($listId) > 0) {
			return;
		}

		$lang = strtok($this->l->getLanguageCode(), '_-');
		if ($lang === false || $lang === '') {
			$lang = 'en';
		}
		$keywordsByArea = $this->loadKeywordDefaults($lang);

		$translatedNames = [
			'Produce' => $this->l->t('Produce'),
			'Dairy' => $this->l->t('Dairy'),
			'Bakery' => $this->l->t('Bakery'),
			'Meat & Seafood' => $this->l->t('Meat & Seafood'),
			'Frozen' => $this->l->t('Frozen'),
			'Beverages' => $this->l->t('Beverages'),
			'Snacks' => $this->l->t('Snacks'),
			'Household' => $this->l->t('Household'),
			'Personal Care' => $this->l->t('Personal Care'),
			'General' => $this->l->t('General'),
			'Pets' => $this->l->t('Pets'),
			'Other' => $this->l->t('Other'),
		];

		foreach (self::DEFAULTS as [$name, $sortOrder, $color]) {
			$area = new ShopArea();
			$area->setListId($listId);
			$area->setName($translatedNames[$name] ?? $name);
			$area->setSortOrder($sortOrder);
			$area->setColor($color);
			$area->setKeywordsArray($keywordsByArea[$name] ?? []);
			$this->mapper->insert($area);
		}
	}

	/**
	 * Get all areas for a list.
	 *
	 * @return ShopArea[]
	 */
	public function findAll(int $listId): array {
		return $this->mapper->findByList($listId);
	}

	public function find(int $id): ShopArea {
		try {
			return $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}
	}

	public function create(int $listId, string $name, ?string $color, ?array $keywords): ShopArea {
		$area = new ShopArea();
		$area->setListId($listId);
		$area->setName($name);
		$area->setColor($color);
		$area->setSortOrder(0);
		if ($keywords !== null) {
			$area->setKeywordsArray($keywords);
		}

		return $this->mapper->insert($area);
	}

	public function update(int $id, int $listId, ?string $name, ?string $color, ?int $sortOrder, ?array $keywords): ShopArea {
		try {
			$area = $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getListId() !== $listId) {
			throw new NoPermissionException('Area does not belong to this list');
		}

		if ($name !== null) {
			$area->setName($name);
		}
		if ($color !== null) {
			$area->setColor($color);
		}
		if ($sortOrder !== null) {
			$area->setSortOrder($sortOrder);
		}
		if ($keywords !== null) {
			$area->setKeywordsArray($keywords);
		}

		return $this->mapper->update($area);
	}

	/**
	 * Learn a keyword from an explicit user area assignment.
	 * Adds the normalized item name to the target area and removes it from other areas in the same list.
	 */
	public function learnKeyword(int $listId, int $areaId, string $itemName): void {
		$keyword = mb_strtolower(trim($itemName));
		if ($keyword === '') {
			return;
		}

		$areas = $this->mapper->findByList($listId);
		foreach ($areas as $area) {
			$keywords = $area->getKeywordsArray();
			if ($area->getId() === $areaId) {
				// Add to target area if not already present
				if (!in_array($keyword, $keywords, true)) {
					$keywords[] = $keyword;
					$area->setKeywordsArray($keywords);
					$this->mapper->update($area);
				}
			} else {
				// Remove from other areas
				$filtered = array_filter($keywords, fn($k) => $k !== $keyword);
				if (count($filtered) !== count($keywords)) {
					$area->setKeywordsArray(array_values($filtered));
					$this->mapper->update($area);
				}
			}
		}
	}

	public function delete(int $id, int $listId): void {
		try {
			$area = $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getListId() !== $listId) {
			throw new NoPermissionException('Area does not belong to this list');
		}

		// Nullify shop_area_id on affected items within this list
		$qb = $this->db->getQueryBuilder();
		$qb->update('shopping_list_items')
			->set('shop_area_id', $qb->createNamedParameter(null, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_NULL))
			->where($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($id, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT)))
			->executeStatement();

		$this->mapper->delete($area);
	}
}
