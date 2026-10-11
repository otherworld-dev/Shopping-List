<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\Entity;

/**
 * A remembered amount: the quantity last typed for an item name in one
 * list. It belongs to the list, not to whoever typed it, so everyone
 * sharing the list gets the same "500 g Rice" back. One row per list and
 * name, replaced each time someone types a new amount.
 *
 * @method int getListId()
 * @method void setListId(int $listId)
 * @method string getNameKey()
 * @method void setNameKey(string $nameKey)
 * @method string getQuantity()
 * @method void setQuantity(string $quantity)
 * @method \DateTime getUpdatedAt()
 * @method void setUpdatedAt(\DateTime $updatedAt)
 */
class Amount extends Entity {
	protected $listId;
	protected $nameKey;
	protected $quantity;
	protected $updatedAt;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('listId', 'integer');
		$this->addType('updatedAt', 'datetime');
	}
}
