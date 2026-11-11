<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IDBConnection;
use OCP\IL10N;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Where a new shop area lands in its list's order. */
class ShopAreaServiceOrderTest extends TestCase {
	private ShopAreaMapper&MockObject $areas;
	private ShopAreaService $service;

	protected function setUp(): void {
		$this->areas = $this->createMock(ShopAreaMapper::class);
		$this->service = new ShopAreaService(
			$this->areas,
			$this->createMock(IDBConnection::class),
			$this->createMock(IL10N::class),
			$this->createMock(ShoppingListMapper::class),
		);
	}

	private function area(int $id, int $sortOrder): ShopArea {
		$area = new ShopArea();
		$area->setId($id);
		$area->setListId(1);
		$area->setName('Area ' . $id);
		$area->setSortOrder($sortOrder);
		return $area;
	}

	/** @return ShopArea the area handed to insert() */
	private function createAndCapture(): ShopArea {
		$inserted = null;
		$this->areas->expects(self::once())->method('insert')
			->willReturnCallback(function (ShopArea $area) use (&$inserted) {
				$inserted = $area;
				return $area;
			});
		$this->service->create(1, 'Garden', null, null);
		return $inserted;
	}

	public function testANewAreaGoesAfterTheLastOne(): void {
		// Deleted areas leave gaps, so it is one past the highest, not the count
		$this->areas->method('findByList')->with(1)
			->willReturn([$this->area(1, 0), $this->area(4, 3), $this->area(12, 11)]);

		self::assertSame(12, $this->createAndCapture()->getSortOrder());
	}

	public function testTheFirstAreaOfAnEmptyListIsNumberedZero(): void {
		$this->areas->method('findByList')->with(1)->willReturn([]);

		self::assertSame(0, $this->createAndCapture()->getSortOrder());
	}
}
