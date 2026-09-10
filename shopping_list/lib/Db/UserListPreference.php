<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method bool getIsPinned()
 * @method void setIsPinned(bool $isPinned)
 */
class UserListPreference extends Entity implements JsonSerializable {
	protected $userId;
	protected $listId;
	protected $isPinned;

	public function __construct() {
		$this->addType('listId', 'integer');
		$this->addType('isPinned', 'boolean');
	}

	public function jsonSerialize(): array {
		return [
			'userId' => $this->userId,
			'listId' => $this->listId,
			'isPinned' => $this->isPinned,
		];
	}
}
