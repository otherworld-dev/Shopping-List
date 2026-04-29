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
 * @method ?string getToken()
 * @method void setToken(?string $token)
 * @method ?string getPasswordHash()
 * @method void setPasswordHash(?string $hash)
 * @method ?string getExpiresAt()
 * @method void setExpiresAt(?string $expiresAt)
 */
class ListShare extends Entity implements JsonSerializable {
	protected $listId;
	protected $sharedWith;
	protected $sharedWithType;
	protected $permission;
	protected $sharedBy;
	protected $token;
	protected $passwordHash;
	protected $expiresAt;

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
		$data = [
			'id' => $this->id,
			'listId' => $this->listId,
			'sharedWith' => $this->sharedWith,
			'sharedWithType' => $this->sharedWithType,
			'sharedWithDisplayName' => $this->sharedWithDisplayName,
			'permission' => $this->permission,
			'sharedBy' => $this->sharedBy,
		];

		// Include link-share fields for type 3 (link)
		if ($this->sharedWithType === 3) {
			$data['token'] = $this->token;
			$data['hasPassword'] = $this->passwordHash !== null;
			$data['expiresAt'] = $this->expiresAt;
		}

		return $data;
	}
}
