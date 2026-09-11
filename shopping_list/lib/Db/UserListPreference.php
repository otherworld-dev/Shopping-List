<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * One user's own settings for one list (pinning, so far). Never shared with
 * the other people on the list.
 *
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
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('isPinned', 'boolean');
	}

	public function jsonSerialize(): array {
		return [
			'userId' => $this->userId,
			'listId' => $this->listId,
			'isPinned' => (bool)$this->isPinned,
		];
	}
}
