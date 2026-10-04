<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IDBConnection;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ItemServiceAttributionTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private IUserManager&MockObject $users;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(7);
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
		$this->users = $this->createMock(IUserManager::class);
		$this->users->method('getDisplayName')->willReturnMap([['ben', 'Ben Jones'], ['ghost', null]]);
		$this->service = new ItemService(
			$this->mapper,
			$this->createMock(ListService::class),
			$this->createMock(ShopAreaService::class),
			$this->createMock(PushService::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(ItemImageCleanup::class),
			$this->createMock(ItemImageService::class),
			$this->users,
		);
	}

	private function existing(bool $checked, ?string $by = null, ?string $name = null): Item {
		$item = new Item();
		$item->setId(7);
		$item->setListId(1);
		$item->setName('Milk');
		$item->setChecked($checked);
		$item->setCheckedBy($by);
		$item->setCheckedByName($name);
		$this->mapper->method('find')->willReturn($item);
		return $item;
	}

	public function testAddingRecordsTheUser(): void {
		$item = $this->service->create(1, 'Milk', null, null, null, 'ben');
		self::assertSame('ben', $item->getAddedBy());
		self::assertSame('Ben Jones', $item->getAddedByName());
		self::assertNull($item->getCheckedByName());
	}

	public function testAPastedTickedLineRecordsTheTickToo(): void {
		$item = $this->service->create(1, 'Milk', null, null, null, 'ben', false, true);
		self::assertSame('ben', $item->getCheckedBy());
		self::assertSame('Ben Jones', $item->getCheckedByName());
	}

	public function testAUserWithoutADisplayNameShowsTheirId(): void {
		self::assertSame('ghost', $this->service->create(1, 'Milk', null, null, null, 'ghost')->getAddedByName());
	}

	public function testTickingRecordsTheUserAndUntickingForgetsThem(): void {
		$this->existing(false);
		$ticked = $this->service->check(7, true, 'ben');
		self::assertSame('ben', $ticked->getCheckedBy());
		self::assertSame('Ben Jones', $ticked->getCheckedByName());

		$unticked = $this->service->check(7, false, 'ben');
		self::assertNull($unticked->getCheckedBy());
		self::assertNull($unticked->getCheckedByName());
	}

	public function testTickingOverAGuestTickReplacesTheName(): void {
		$this->existing(true, null, 'Anna');
		$item = $this->service->check(7, true, 'ben');
		self::assertSame('Ben Jones', $item->getCheckedByName());
	}

	public function testMovingForgetsWhoTickedIt(): void {
		$this->existing(true, 'ben', 'Ben Jones');
		$item = $this->service->move(7, 2, 'ben');
		self::assertNull($item->getCheckedBy());
		self::assertNull($item->getCheckedByName());
	}
}
