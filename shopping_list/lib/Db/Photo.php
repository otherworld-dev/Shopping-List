<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use OCP\AppFramework\Db\Entity;

/**
 * A remembered photo: the image one user took for an item name. Items carry
 * the image key of the photo they show; this row is what lets a later item
 * with the same name, in any list that user can edit, show it again after
 * the first item is gone. One row per user and name, replaced on re-upload.
 *
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method string getNameKey()
 * @method void setNameKey(string $nameKey)
 * @method string getImageKey()
 * @method void setImageKey(string $imageKey)
 * @method \DateTime getUpdatedAt()
 * @method void setUpdatedAt(\DateTime $updatedAt)
 */
class Photo extends Entity {
	protected $userId;
	protected $nameKey;
	protected $imageKey;
	protected $updatedAt;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('updatedAt', 'datetime');
	}
}
