<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * One user's own settings for one list (pinning and position). Never shared
 * with the other people on the list.
 *
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method bool getIsPinned()
 * @method void setIsPinned(bool $isPinned)
 * @method ?int getPosition()
 * @method void setPosition(?int $position)
 */
class UserListPreference extends Entity implements JsonSerializable {
	protected $userId;
	protected $listId;
	protected $isPinned;
	protected $position;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('isPinned', 'boolean');
		$this->addType('position', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'userId' => $this->userId,
			'listId' => $this->listId,
			'isPinned' => (bool)$this->isPinned,
			'position' => $this->position,
		];
	}
}
