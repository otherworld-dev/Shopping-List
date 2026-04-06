<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method string getSharedWith()
 * @method void setSharedWith(string $sharedWith)
 * @method int getSharedWithType()
 * @method void setSharedWithType(int $sharedWithType)
 * @method int getPermission()
 * @method void setPermission(int $permission)
 * @method string getSharedBy()
 * @method void setSharedBy(string $sharedBy)
 */
class ListShare extends Entity implements JsonSerializable {
	protected $listId;
	protected $sharedWith;
	protected $sharedWithType;
	protected $permission;
	protected $sharedBy;

	/** @var string Transient display name */
	private string $sharedWithDisplayName = '';

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('sharedWithType', 'integer');
		$this->addType('permission', 'integer');
	}

	public function setSharedWithDisplayName(string $name): void {
		$this->sharedWithDisplayName = $name;
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'listId' => $this->listId,
			'sharedWith' => $this->sharedWith,
			'sharedWithType' => $this->sharedWithType,
			'sharedWithDisplayName' => $this->sharedWithDisplayName,
			'permission' => $this->permission,
			'sharedBy' => $this->sharedBy,
		];
	}
}
