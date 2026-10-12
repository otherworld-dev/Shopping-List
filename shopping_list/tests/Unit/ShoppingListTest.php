<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShoppingList;
use PHPUnit\Framework\TestCase;

/** The list as the clients get it. */
class ShoppingListTest extends TestCase {
	public function testAListWithNoDefaultAreaSaysSo(): void {
		$list = new ShoppingList();
		self::assertArrayHasKey('defaultShopAreaId', $list->jsonSerialize());
		self::assertNull($list->jsonSerialize()['defaultShopAreaId']);
	}

	public function testAListCarriesItsDefaultArea(): void {
		$list = new ShoppingList();
		$list->setDefaultAreaId(12);
		self::assertSame(12, $list->jsonSerialize()['defaultShopAreaId']);
	}
}
