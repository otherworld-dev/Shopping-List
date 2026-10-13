<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\QueryBuilder\IExpressionBuilder;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\IL10N;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** A list's default area: read for new items, used by a move, and dropped with its area. */
class ShopAreaServiceDefaultAreaTest extends TestCase {
	private ShopAreaMapper&MockObject $areas;
	private ShoppingListMapper&MockObject $lists;
	private ShopAreaService $service;

	protected function setUp(): void {
		$this->areas = $this->createMock(ShopAreaMapper::class);
		$this->lists = $this->createMock(ShoppingListMapper::class);
		$db = $this->createMock(IDBConnection::class);
		$db->method('getQueryBuilder')->willReturnCallback(fn () => $this->queryBuilder());
		$this->service = new ShopAreaService(
			$this->areas,
			$db,
			$this->createMock(IL10N::class),
			$this->lists,
		);
	}

	/** Deleting an area also clears it from the list's items, in one statement. */
	private function queryBuilder(): IQueryBuilder {
		$expr = $this->createMock(IExpressionBuilder::class);
		$expr->method('eq')->willReturn('shop_area_id = :p');
		$qb = $this->createMock(IQueryBuilder::class);
		$qb->method('expr')->willReturn($expr);
		$qb->method('createNamedParameter')->willReturn(':p');
		$qb->method('update')->willReturnSelf();
		$qb->method('set')->willReturnSelf();
		$qb->method('where')->willReturnSelf();
		$qb->method('andWhere')->willReturnSelf();
		$qb->method('executeStatement')->willReturn(1);
		return $qb;
	}

	private function listWithDefault(?int $areaId): ShoppingList {
		$list = new ShoppingList();
		$list->setId(1);
		$list->setDefaultAreaId($areaId);
		$this->lists->method('find')->with(1)->willReturn($list);
		return $list;
	}

	private function area(int $id, string $name, array $keywords = []): ShopArea {
		$area = new ShopArea();
		$area->setId($id);
		$area->setListId(1);
		$area->setName($name);
		$area->setKeywordsArray($keywords);
		return $area;
	}

	public function testTheDefaultAreaIsTheLists(): void {
		$this->listWithDefault(12);
		self::assertSame(12, $this->service->defaultAreaFor(1));
	}

	public function testAListWithNoDefaultHasNone(): void {
		$this->listWithDefault(null);
		self::assertNull($this->service->defaultAreaFor(1));
	}

	public function testAListThatIsGoneHasNone(): void {
		$this->lists->method('find')->willThrowException(new DoesNotExistException('gone'));
		self::assertNull($this->service->defaultAreaFor(1));
	}

	public function testDeletingTheDefaultAreaLeavesTheListWithNone(): void {
		$list = $this->listWithDefault(12);
		$this->areas->method('find')->with(12)->willReturn($this->area(12, 'Other'));
		$this->lists->expects(self::once())->method('update')->with($list);

		$this->service->delete(12, 1);

		self::assertNull($list->getDefaultAreaId());
	}

	public function testDeletingAnotherAreaKeepsTheDefault(): void {
		$list = $this->listWithDefault(12);
		$this->areas->method('find')->with(5)->willReturn($this->area(5, 'Dairy'));
		$this->lists->expects(self::never())->method('update');

		$this->service->delete(5, 1);

		self::assertSame(12, $list->getDefaultAreaId());
	}

	public function testAMovedItemThatMatchesNothingGoesToTheDefaultArea(): void {
		$this->listWithDefault(12);
		$this->areas->method('findByList')->with(1)->willReturn([
			$this->area(5, 'Dairy', ['milk']),
			$this->area(12, 'Other'),
		]);
		self::assertSame(12, $this->service->findAreaForMove(1, 'Garden', 'Batteries'));
	}

	public function testAKeywordStillBeatsTheDefaultOnAMove(): void {
		$this->listWithDefault(12);
		$this->areas->method('findByList')->with(1)->willReturn([
			$this->area(5, 'Dairy', ['milk']),
			$this->area(12, 'Other'),
		]);
		self::assertSame(5, $this->service->findAreaForMove(1, null, 'Oat milk'));
	}
}
