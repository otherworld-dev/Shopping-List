<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method string getName()
 * @method void setName(string $name)
 * @method int getSortOrder()
 * @method void setSortOrder(int $sortOrder)
 * @method ?string getColor()
 * @method void setColor(?string $color)
 * @method ?string getKeywords()
 * @method void setKeywords(?string $keywords)
 * @method ?string getNameKey()
 * @method void setNameKey(?string $nameKey)
 */
class ShopArea extends Entity implements JsonSerializable {
	protected $listId;
	protected $name;
	protected $sortOrder;
	protected $color;
	protected $keywords;
	// Stable English key for default areas (e.g. "Produce"), so the name can be
	// translated live per viewer. Null once a user renames the area (custom name).
	protected $nameKey;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('sortOrder', 'integer');
	}

	/** @return string[] */
	public function getKeywordsArray(): array {
		if ($this->keywords === null || $this->keywords === '') {
			return [];
		}
		return json_decode($this->keywords, true) ?? [];
	}

	/** @param string[] $keywords */
	public function setKeywordsArray(array $keywords): void {
		$this->setKeywords(json_encode(array_values($keywords)));
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'listId' => $this->listId,
			'name' => $this->name,
			'sortOrder' => $this->sortOrder,
			'color' => $this->color,
			'keywords' => $this->getKeywordsArray(),
			'nameKey' => $this->nameKey,
		];
	}
}
