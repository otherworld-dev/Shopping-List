<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method string getName()
 * @method void setName(string $name)
 * @method string getUserId()
 * @method void setUserId(string $userId)
 */
class Tag extends Entity implements JsonSerializable {
	protected $name;
	protected $userId;

	public function __construct() {
		$this->addType('id', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'name' => $this->name,
		];
	}
}
