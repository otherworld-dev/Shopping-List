<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\Entity;

/**
 * An item someone put on a list, waiting to be told to one of the other
 * people on it. $actor is the adder's name as it was then, empty for a
 * guest on a link who gave none.
 *
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method ?string getActor()
 * @method void setActor(?string $actor)
 * @method string getItemName()
 * @method void setItemName(string $itemName)
 * @method bool getNotified()
 * @method void setNotified(bool $notified)
 */
class AddedItem extends Entity {
	protected $listId;
	protected $userId;
	protected $actor;
	protected $itemName;
	protected $notified;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('notified', 'boolean');
	}
}
