<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ItemMapper;
use OCP\DB\QueryBuilder\IExpressionBuilder;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use PHPUnit\Framework\TestCase;

class ItemMapperTest extends TestCase {
	/** Unticking everything forgets who ticked each item, and the app they used. */
	public function testUncheckAllForgetsWhoTickedAndThroughWhat(): void {
		$set = [];
		$qb = $this->createMock(IQueryBuilder::class);
		$qb->method('expr')->willReturn($this->createMock(IExpressionBuilder::class));
		$qb->method('createNamedParameter')->willReturnCallback(fn ($v) => $v === null ? 'NULL' : ':p');
		$qb->method('update')->willReturnSelf();
		$qb->method('set')->willReturnCallback(function (string $column, $value) use (&$set, $qb) {
			$set[$column] = $value;
			return $qb;
		});
		$qb->method('where')->willReturnSelf();
		$qb->method('executeStatement')->willReturn(3);

		$db = $this->createMock(IDBConnection::class);
		$db->method('getQueryBuilder')->willReturn($qb);

		(new ItemMapper($db))->uncheckAll(1);

		self::assertSame('NULL', $set['checked_by'] ?? null);
		self::assertSame('NULL', $set['checked_by_name'] ?? null);
		self::assertSame('NULL', $set['checked_via'] ?? null);
	}
}
