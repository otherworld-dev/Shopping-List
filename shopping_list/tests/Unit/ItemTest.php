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

	public function testAttributionIsSerialised(): void {
		$item = new Item();
		$item->setAddedBy('ben');
		$item->setAddedByName('Ben');
		$item->setCheckedByName('Anna');

		$json = $item->jsonSerialize();
		self::assertSame('ben', $json['addedBy']);
		self::assertSame('Ben', $json['addedByName']);
		self::assertNull($json['checkedBy']);
		self::assertSame('Anna', $json['checkedByName']);
	}

	public function testHidingAccountNamesKeepsGuestNames(): void {
		$item = new Item();
		$item->setAddedBy('ben');
		$item->setAddedByName('Ben');
		$item->setCheckedBy(null);
		$item->setCheckedByName('Anna');
		$item->hideAccountNames();

		$json = $item->jsonSerialize();
		self::assertNull($json['addedBy']);
		self::assertNull($json['addedByName']);
		self::assertNull($json['checkedBy']);
		self::assertSame('Anna', $json['checkedByName']);
		// Only the response is masked, never the stored values
		self::assertSame('Ben', $item->getAddedByName());
	}

	public function testHidingAccountNamesHidesAnAccountTick(): void {
		$item = new Item();
		$item->setAddedByName('Anna');
		$item->setCheckedBy('ben');
		$item->setCheckedByName('Ben');
		$item->hideAccountNames();

		$json = $item->jsonSerialize();
		self::assertSame('Anna', $json['addedByName']);
		self::assertNull($json['checkedBy']);
		self::assertNull($json['checkedByName']);
	}
}
