<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method string getTitle()
 * @method void setTitle(string $title)
 * @method \DateTime getCreatedAt()
 * @method void setCreatedAt(\DateTime $createdAt)
 * @method \DateTime getUpdatedAt()
 * @method void setUpdatedAt(\DateTime $updatedAt)
 */
class ShoppingList extends Entity implements JsonSerializable {
	protected $userId;
	protected $title;
	protected $createdAt;
	protected $updatedAt;

	/** @var int Computed permission level for current user */
	private int $permission = 1;

	/** @var bool Whether the current user owns this list */
	private bool $isOwner = true;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('createdAt', 'datetime');
		$this->addType('updatedAt', 'datetime');
	}

	public function setPermission(int $permission): void {
		$this->permission = $permission;
	}

	public function getPermission(): int {
		return $this->permission;
	}

	public function setIsOwner(bool $isOwner): void {
		$this->isOwner = $isOwner;
	}

	public function getIsOwner(): bool {
		return $this->isOwner;
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'userId' => $this->userId,
			'title' => $this->title,
			'permission' => $this->permission,
			'isOwner' => $this->isOwner,
			'createdAt' => $this->createdAt?->format(\DateTimeInterface::ATOM),
			'updatedAt' => $this->updatedAt?->format(\DateTimeInterface::ATOM),
		];
	}
}
