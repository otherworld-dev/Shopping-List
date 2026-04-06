<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method int getItemId()
 * @method void setItemId(int $itemId)
 * @method int getTagId()
 * @method void setTagId(int $tagId)
 */
class ItemTag extends Entity {
	protected int $itemId = 0;
	protected int $tagId = 0;

	public function __construct() {
		$this->addType('itemId', 'integer');
		$this->addType('tagId', 'integer');
	}
}
