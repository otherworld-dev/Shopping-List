<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method ?int getListId()
 * @method void setListId(?int $listId)
 * @method string getName()
 * @method void setName(string $name)
 * @method int getSortOrder()
 * @method void setSortOrder(int $sortOrder)
 * @method ?string getColor()
 * @method void setColor(?string $color)
 */
class ShopArea extends Entity implements JsonSerializable {
	protected $listId;
	protected $name;
	protected $sortOrder;
	protected $color;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('sortOrder', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'listId' => $this->listId,
			'name' => $this->name,
			'sortOrder' => $this->sortOrder,
			'color' => $this->color,
		];
	}
}
