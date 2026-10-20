<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IDBConnection;
use OCP\IL10N;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Which area an item's name belongs in by keyword alone, without the list's default. */
class ShopAreaServiceDetectAreaTest extends TestCase {
	private ShopAreaMapper&MockObject $areas;
	private ShopAreaService $service;

	protected function setUp(): void {
		$this->areas = $this->createMock(ShopAreaMapper::class);
		$lists = $this->createMock(ShoppingListMapper::class);
		$list = new ShoppingList();
		$list->setId(1);
		$list->setDefaultAreaId(9);
		$lists->method('find')->willReturn($list);
		$this->service = new ShopAreaService(
			$this->areas,
			$this->createMock(IDBConnection::class),
			$this->createMock(IL10N::class),
			$lists,
		);
		$this->areas->method('findByList')->with(1)->willReturn([
			$this->area(3, 'Meat', ['ham']),
			$this->area(4, 'Toiletries', ['shampoo']),
			$this->area(5, 'Dairy', ['milk', 'creme']),
			$this->area(9, 'Other', []),
		]);
	}

	private function area(int $id, string $name, array $keywords): ShopArea {
		$area = new ShopArea();
		$area->setId($id);
		$area->setListId(1);
		$area->setName($name);
		$area->setKeywordsArray($keywords);
		return $area;
	}

	public function testLongestKeywordWins(): void {
		self::assertSame(4, $this->service->detectArea(1, 'Shampoo'));
	}

	public function testFoldsAccents(): void {
		self::assertSame(5, $this->service->detectArea(1, 'Crème fraîche'));
	}

	public function testNoMatchIsNullEvenWithADefault(): void {
		self::assertNull($this->service->detectArea(1, 'Batteries'));
	}
}
