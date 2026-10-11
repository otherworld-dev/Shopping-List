<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShoppingList;
use PHPUnit\Framework\TestCase;

class HarnessTest extends TestCase {
	public function testAppAndOcpClassesLoadAndEntitySettersWork(): void {
		$list = new ShoppingList();
		$list->setId(7);
		$list->setTitle('Weekly shop');

		self::assertSame(7, $list->getId());
		self::assertSame('Weekly shop', $list->getTitle());
	}
}
