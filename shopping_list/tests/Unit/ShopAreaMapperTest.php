<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShopAreaMapper;
use OCP\DB\IResult;
use OCP\DB\QueryBuilder\IExpressionBuilder;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use PHPUnit\Framework\TestCase;

class ShopAreaMapperTest extends TestCase {
	/**
	 * Areas that share a sort order must still come back in a fixed order,
	 * otherwise PostgreSQL hands them back in whatever order the rows sit on
	 * disk and they swap places after an unrelated edit. Same tie-break as
	 * the Android app's local query.
	 */
	public function testAreasWithTheSameSortOrderComeBackOldestFirst(): void {
		$result = $this->createMock(IResult::class);
		$result->method('fetch')->willReturn(false);

		$qb = $this->createMock(IQueryBuilder::class);
		$qb->method('expr')->willReturn($this->createMock(IExpressionBuilder::class));
		$qb->method('select')->willReturnSelf();
		$qb->method('from')->willReturnSelf();
		$qb->method('where')->willReturnSelf();
		$qb->expects(self::once())->method('orderBy')->with('sort_order', 'ASC')->willReturnSelf();
		$qb->expects(self::once())->method('addOrderBy')->with('id', 'ASC')->willReturnSelf();
		$qb->method('executeQuery')->willReturn($result);

		$db = $this->createMock(IDBConnection::class);
		$db->method('getQueryBuilder')->willReturn($qb);

		self::assertSame([], (new ShopAreaMapper($db))->findByList(1));
	}
}
