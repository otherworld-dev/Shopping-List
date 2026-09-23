<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ItemImageService;
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
	private const KEY = 'abcdefabcdefabcd';

	private ItemMapper&MockObject $mapper;
	private ListService&MockObject $listService;
	private PushService&MockObject $push;
	private ItemImageCleanup&MockObject $cleanup;
	private ItemImageService&MockObject $images;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->listService = $this->createMock(ListService::class);
		$this->push = $this->createMock(PushService::class);
		$this->cleanup = $this->createMock(ItemImageCleanup::class);
		$this->images = $this->createMock(ItemImageService::class);
		$db = $this->createMock(IDBConnection::class);
		$db->method('getQueryBuilder')->willReturnCallback(fn () => $this->queryBuilder());
		$this->service = new ItemService(
			$this->mapper,
			$this->listService,
			$this->createMock(ShopAreaService::class),
			$this->push,
			$db,
			$this->cleanup,
			$this->images,
		);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(99); // the database hands out the id
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
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

	private function item(int $id = 42, ?string $imageKey = null, bool $checked = false, string $name = 'Milk'): Item {
		$item = new Item();
		$item->setId($id);
		$item->setListId(5);
		$item->setName($name);
		$item->setImageKey($imageKey);
		$item->setChecked($checked);
		return $item;
	}

	public function testDeleteRemovesTagsAndRowThenReleasesThePhotoAndNotifies(): void {
		$item = $this->item(42, self::KEY);
		$this->mapper->method('find')->with(42)->willReturn($item);
		$this->listService->expects(self::once())->method('assertWriteAccess')->with(5, 'alice');
		$this->mapper->expects(self::once())->method('delete')->with($item);
		$this->cleanup->expects(self::once())->method('release')->with([self::KEY]);
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'deleted', 'alice');

		$this->service->delete(42, 'alice');
	}

	public function testDeleteWithoutWriteAccessTouchesNothing(): void {
		$this->mapper->method('find')->willReturn($this->item());
		$this->listService->method('assertWriteAccess')->willThrowException(new NoPermissionException('No write access'));
		$this->mapper->expects(self::never())->method('delete');
		$this->cleanup->expects(self::never())->method('release');

		$this->expectException(NoPermissionException::class);
		$this->service->delete(42, 'bob');
	}

	public function testDeleteEntityNotifiesEveryoneWhenTheExcludeIdIsEmpty(): void {
		$this->listService->expects(self::never())->method('assertWriteAccess');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'deleted', '');

		$this->service->deleteEntity($this->item(), '');
	}

	public function testClearCheckedReleasesThePhotosOfTheClearedItems(): void {
		$this->mapper->method('findAllByList')->with(5)->willReturn([
			$this->item(7, self::KEY, true),
			$this->item(8, '2222222222222222', false),
			$this->item(9, null, true),
		]);
		$this->mapper->method('deleteChecked')->with(5)->willReturn([7, 9]);
		$this->cleanup->expects(self::once())->method('release')->with([self::KEY]);
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 0, 'cleared', 'alice');

		$this->service->clearChecked(5, 'alice');
	}

	public function testCreateGivesTheItemThePhotoRememberedForItsName(): void {
		$this->images->method('rememberedKey')->with(5, 'Cheese')->willReturn(self::KEY);

		$item = $this->service->create(5, 'Cheese', null, null, null, 'alice');

		self::assertSame(self::KEY, $item->getImageKey());
	}

	public function testRenameTakesThePhotoRememberedForTheNewName(): void {
		$this->mapper->method('find')->willReturn($this->item(42, '2222222222222222', false, 'Chese'));
		$this->images->method('rememberedKey')->with(5, 'Cheese')->willReturn(self::KEY);

		$item = $this->service->update(42, ['name' => 'Cheese'], 'alice');

		self::assertSame(self::KEY, $item->getImageKey());
	}

	public function testRenameToANameWithoutAPhotoKeepsTheCurrentOne(): void {
		$this->mapper->method('find')->willReturn($this->item(42, '2222222222222222', false, 'Chese'));
		$this->images->method('rememberedKey')->willReturn(null);

		$item = $this->service->update(42, ['name' => 'Cheese'], 'alice');

		self::assertSame('2222222222222222', $item->getImageKey());
	}

	public function testAnUpdateThatKeepsTheNameDoesNotLookForAPhoto(): void {
		$this->mapper->method('find')->willReturn($this->item(42, null, false, 'Cheese'));
		$this->images->expects(self::never())->method('rememberedKey');

		$this->service->update(42, ['name' => 'Cheese', 'quantity' => '2'], 'alice');
	}

	public function testMovingAnItemWithoutAPhotoPicksUpTheTargetListsPhoto(): void {
		$this->mapper->method('find')->willReturn($this->item(42, null, false, 'Cheese'));
		$this->images->method('rememberedKey')->with(6, 'Cheese')->willReturn(self::KEY);

		$item = $this->service->move(42, 6, 'alice');

		self::assertSame(self::KEY, $item->getImageKey());
	}

	public function testMovingAnItemWithAPhotoKeepsIt(): void {
		$this->mapper->method('find')->willReturn($this->item(42, '2222222222222222', false, 'Cheese'));
		$this->images->expects(self::never())->method('rememberedKey');

		$item = $this->service->move(42, 6, 'alice');

		self::assertSame('2222222222222222', $item->getImageKey());
	}
}
