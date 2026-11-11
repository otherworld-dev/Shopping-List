<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCA\Shopping_List\Service\UserSettingsService;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Choosing the area a list's new items go to when no keyword places them. */
class ListServiceDefaultAreaTest extends TestCase {
	private ShoppingListMapper&MockObject $lists;
	private ShopAreaService&MockObject $areas;
	private PushService&MockObject $push;
	private ListService $service;
	private ShoppingList $list;

	protected function setUp(): void {
		$this->lists = $this->createMock(ShoppingListMapper::class);
		$this->areas = $this->createMock(ShopAreaService::class);
		$this->push = $this->createMock(PushService::class);
		$this->lists->method('findSharedWithGroups')->willReturn([]);
		$this->lists->method('update')->willReturnArgument(0);
		$this->service = new ListService(
			$this->lists,
			$this->areas,
			$this->createMock(IGroupManager::class),
			$this->createMock(IUserManager::class),
			$this->createMock(IDBConnection::class),
			$this->push,
			$this->createMock(UserListPreferenceMapper::class),
			$this->createMock(ItemImageCleanup::class),
			$this->createMock(UserSettingsService::class),
			$this->createMock(ItemMapper::class),
		);

		$this->list = new ShoppingList();
		$this->list->setId(1);
		$this->list->setUserId('alice');
		$this->list->setTitle('Groceries');
		$this->lists->method('find')->with(1)->willReturn($this->list);
	}

	private function areaOfList(int $id, int $listId): void {
		$area = new ShopArea();
		$area->setId($id);
		$area->setListId($listId);
		$this->areas->method('find')->with($id)->willReturn($area);
	}

	/** @param array<int, int> $shares list id => permission, for the user asking */
	private function sharedWith(array $shares): void {
		$this->lists->method('findSharedWithUser')->willReturn($shares);
	}

	public function testTheOwnerSetsOneOfTheListsAreas(): void {
		$this->sharedWith([]);
		$this->areaOfList(12, 1);
		$this->lists->expects(self::once())->method('update')->with($this->list);
		$this->push->expects(self::once())->method('notifyListUpdate')->with(1, 'alice');

		$list = $this->service->setDefaultArea(1, 12, 'alice');

		self::assertSame(12, $list->getDefaultAreaId());
		self::assertSame(12, $list->jsonSerialize()['defaultShopAreaId']);
		self::assertTrue($list->getIsOwner());
	}

	public function testSomeoneWhoCanEditTheListCanSetIt(): void {
		$this->sharedWith([1 => 1]);
		$this->areaOfList(12, 1);

		$list = $this->service->setDefaultArea(1, 12, 'ben');

		self::assertSame(12, $list->getDefaultAreaId());
		self::assertFalse($list->getIsOwner());
	}

	public function testNullClearsIt(): void {
		$this->sharedWith([]);
		$this->list->setDefaultAreaId(12);
		$this->areas->expects(self::never())->method('find');
		$this->lists->expects(self::once())->method('update');

		self::assertNull($this->service->setDefaultArea(1, null, 'alice')->getDefaultAreaId());
	}

	public function testAnAreaOfAnotherListIsRefusedAndNothingIsSaved(): void {
		$this->sharedWith([]);
		$this->areaOfList(40, 2);
		$this->lists->expects(self::never())->method('update');
		$this->push->expects(self::never())->method('notifyListUpdate');

		$this->expectException(\InvalidArgumentException::class);
		$this->service->setDefaultArea(1, 40, 'alice');
	}

	public function testAnAreaThatDoesNotExistIsRefused(): void {
		$this->sharedWith([]);
		$this->areas->method('find')->willThrowException(new NotFoundException('Shop area not found'));
		$this->lists->expects(self::never())->method('update');

		$this->expectException(\InvalidArgumentException::class);
		$this->service->setDefaultArea(1, 99, 'alice');
	}

	public function testRenamingTheListKeepsItsDefaultArea(): void {
		// Clients from before this setting only ever send a title.
		$this->sharedWith([]);
		$this->list->setDefaultAreaId(12);

		$list = $this->service->update(1, 'Weekly shop', 'alice');

		self::assertSame('Weekly shop', $list->getTitle());
		self::assertSame(12, $list->getDefaultAreaId());
	}

	public function testSomeoneWhoCanOnlyViewTheListCannotSetIt(): void {
		$this->sharedWith([1 => 0]);
		$this->lists->expects(self::never())->method('update');

		$this->expectException(NoPermissionException::class);
		$this->service->setDefaultArea(1, 12, 'ben');
	}
}
