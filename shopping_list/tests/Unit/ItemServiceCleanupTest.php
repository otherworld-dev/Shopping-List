<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ItemImageStorage;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\DB\QueryBuilder\IExpressionBuilder;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ItemServiceCleanupTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private ListService&MockObject $listService;
	private PushService&MockObject $push;
	private ItemImageStorage&MockObject $storage;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->listService = $this->createMock(ListService::class);
		$this->push = $this->createMock(PushService::class);
		$this->storage = $this->createMock(ItemImageStorage::class);
		$db = $this->createMock(IDBConnection::class);
		$db->method('getQueryBuilder')->willReturnCallback(fn () => $this->queryBuilder());
		$this->service = new ItemService(
			$this->mapper,
			$this->listService,
			$this->createMock(ShopAreaService::class),
			$this->push,
			$db,
			$this->storage,
		);
	}

	/** A query builder whose chained calls all succeed. Nothing here runs SQL. */
	private function queryBuilder(): IQueryBuilder {
		$expr = $this->createMock(IExpressionBuilder::class);
		$expr->method('eq')->willReturn('item_id = :p');
		$expr->method('in')->willReturn('item_id IN (:p)');
		$qb = $this->createMock(IQueryBuilder::class);
		$qb->method('expr')->willReturn($expr);
		$qb->method('createNamedParameter')->willReturn(':p');
		$qb->method('delete')->willReturnSelf();
		$qb->method('where')->willReturnSelf();
		$qb->method('executeStatement')->willReturn(1);
		return $qb;
	}

	private function item(): Item {
		$item = new Item();
		$item->setId(42);
		$item->setListId(5);
		$item->setName('Milk');
		return $item;
	}

	public function testDeleteRemovesTagsRowAndPhotoThenNotifies(): void {
		$item = $this->item();
		$this->mapper->method('find')->with(42)->willReturn($item);
		$this->listService->expects(self::once())->method('assertWriteAccess')->with(5, 'alice');
		$this->mapper->expects(self::once())->method('delete')->with($item);
		$this->storage->expects(self::once())->method('delete')->with(42);
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'deleted', 'alice');

		$this->service->delete(42, 'alice');
	}

	public function testDeleteWithoutWriteAccessTouchesNothing(): void {
		$this->mapper->method('find')->willReturn($this->item());
		$this->listService->method('assertWriteAccess')->willThrowException(new NoPermissionException('No write access'));
		$this->mapper->expects(self::never())->method('delete');
		$this->storage->expects(self::never())->method('delete');

		$this->expectException(NoPermissionException::class);
		$this->service->delete(42, 'bob');
	}

	public function testDeleteEntityNotifiesEveryoneWhenTheExcludeIdIsEmpty(): void {
		$this->listService->expects(self::never())->method('assertWriteAccess');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'deleted', '');
		$this->storage->expects(self::once())->method('delete')->with(42);

		$this->service->deleteEntity($this->item(), '');
	}

	public function testClearCheckedRemovesThePhotosOfTheDeletedItems(): void {
		$this->mapper->method('deleteChecked')->with(5)->willReturn([7, 8]);
		$this->storage->expects(self::once())->method('deleteMany')->with([7, 8]);
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 0, 'cleared', 'alice');

		$this->service->clearChecked(5, 'alice');
	}
}
