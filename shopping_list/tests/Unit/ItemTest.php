<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use PHPUnit\Framework\TestCase;

class ItemTest extends TestCase {
	public function testImageKeyIsNullUntilSetAndIsSerialised(): void {
		$item = new Item();
		$item->setId(3);
		$item->setListId(1);
		$item->setName('Milk');

		self::assertNull($item->getImageKey());
		self::assertArrayHasKey('imageKey', $item->jsonSerialize());
		self::assertNull($item->jsonSerialize()['imageKey']);

		$item->setImageKey('0123456789abcdef');
		self::assertSame('0123456789abcdef', $item->getImageKey());
		self::assertSame('0123456789abcdef', $item->jsonSerialize()['imageKey']);
	}
}
