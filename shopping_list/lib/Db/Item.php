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
 * @method ?string getCheckedByName()
 * @method void setCheckedByName(?string $checkedByName)
 * @method ?string getAddedBy()
 * @method void setAddedBy(?string $addedBy)
 * @method ?string getAddedByName()
 * @method void setAddedByName(?string $addedByName)
 * @method int getSortOrder()
 * @method void setSortOrder(int $sortOrder)
 * @method ?string getImageKey()
 * @method void setImageKey(?string $imageKey)
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
	/** Display or guest name of whoever ticked it, captured at the time */
	protected $checkedByName;
	/** User id of a signed-in adder; null for a guest or an item from before this was recorded */
	protected $addedBy;
	/** Display or guest name of whoever added it, captured at the time */
	protected $addedByName;
	protected $sortOrder;
	/** Random 16-hex handle for the item's photo in appdata; rotates on replace, null when there is none */
	protected $imageKey;
	protected $createdAt;
	protected $updatedAt;

	/** @var array Transient tags loaded by service */
	private array $tags = [];

	/** Set for a public link that hides members' names; only changes the JSON */
	private bool $accountNamesHidden = false;

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

	/** Leave account users' names and ids out of this item's JSON; guests' names stay. */
	public function hideAccountNames(): void {
		$this->accountNamesHidden = true;
	}

	public function jsonSerialize(): array {
		$hideAdder = $this->accountNamesHidden && $this->addedBy !== null;
		$hideChecker = $this->accountNamesHidden && $this->checkedBy !== null;
		return [
			'id' => $this->id,
			'listId' => $this->listId,
			'name' => $this->name,
			'quantity' => $this->quantity,
			'unit' => $this->unit,
			'shopAreaId' => $this->shopAreaId,
			'checked' => $this->checked,
			'checkedBy' => $hideChecker ? null : $this->checkedBy,
			'checkedByName' => $hideChecker ? null : $this->checkedByName,
			'addedBy' => $hideAdder ? null : $this->addedBy,
			'addedByName' => $hideAdder ? null : $this->addedByName,
			'sortOrder' => $this->sortOrder,
			'imageKey' => $this->imageKey,
			'tags' => $this->tags,
			'createdAt' => $this->createdAt?->format(\DateTimeInterface::ATOM),
			'updatedAt' => $this->updatedAt?->format(\DateTimeInterface::ATOM),
		];
	}
}
