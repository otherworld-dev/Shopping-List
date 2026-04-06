<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method string getName()
 * @method void setName(string $name)
 * @method ?string getQuantity()
 * @method void setQuantity(?string $quantity)
 * @method ?string getUnit()
 * @method void setUnit(?string $unit)
 * @method ?int getShopAreaId()
 * @method void setShopAreaId(?int $shopAreaId)
 * @method bool getChecked()
 * @method void setChecked(bool $checked)
 * @method ?string getCheckedBy()
 * @method void setCheckedBy(?string $checkedBy)
 * @method int getSortOrder()
 * @method void setSortOrder(int $sortOrder)
 * @method \DateTime getCreatedAt()
 * @method void setCreatedAt(\DateTime $createdAt)
 * @method \DateTime getUpdatedAt()
 * @method void setUpdatedAt(\DateTime $updatedAt)
 */
class Item extends Entity implements JsonSerializable {
	protected $listId;
	protected $name;
	protected $quantity;
	protected $unit;
	protected $shopAreaId;
	protected $checked;
	protected $checkedBy;
	protected $sortOrder;
	protected $createdAt;
	protected $updatedAt;

	/** @var array Transient tags loaded by service */
	private array $tags = [];

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('shopAreaId', 'integer');
		$this->addType('checked', 'boolean');
		$this->addType('sortOrder', 'integer');
		$this->addType('createdAt', 'datetime');
		$this->addType('updatedAt', 'datetime');
	}

	public function setTags(array $tags): void {
		$this->tags = $tags;
	}

	public function getTags(): array {
		return $this->tags;
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'listId' => $this->listId,
			'name' => $this->name,
			'quantity' => $this->quantity,
			'unit' => $this->unit,
			'shopAreaId' => $this->shopAreaId,
			'checked' => $this->checked,
			'checkedBy' => $this->checkedBy,
			'sortOrder' => $this->sortOrder,
			'tags' => $this->tags,
			'createdAt' => $this->createdAt?->format(\DateTimeInterface::ATOM),
			'updatedAt' => $this->updatedAt?->format(\DateTimeInterface::ATOM),
		];
	}
}
