<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\AmountMemory;
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

/** The app an item was added or ticked through, kept beside the account that did it. */
class ItemServiceViaTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(7);
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
		$users = $this->createMock(IUserManager::class);
		$users->method('getDisplayName')->willReturn('Ben Jones');
		$this->service = new ItemService(
			$this->mapper,
			$this->createMock(ListService::class),
			$this->createMock(ShopAreaService::class),
			$this->createMock(PushService::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(ItemImageCleanup::class),
			$this->createMock(ItemImageService::class),
			$users,
			$this->createMock(AmountMemory::class),
		);
	}

	private function existing(bool $checked, ?string $via = null): Item {
		$item = new Item();
		$item->setId(7);
		$item->setListId(1);
		$item->setName('Milk');
		$item->setChecked($checked);
		$item->setCheckedVia($via);
		$this->mapper->method('find')->willReturn($item);
		return $item;
	}

	public function testAddingWithAViaRecordsIt(): void {
		$item = $this->service->create(1, 'Milk', null, null, null, 'ben', false, false, false, 'Home Assistant');
		self::assertSame('Home Assistant', $item->getAddedVia());
		self::assertSame('ben', $item->getAddedBy());
		self::assertSame('Ben Jones', $item->getAddedByName());
		self::assertNull($item->getCheckedVia());
	}

	public function testAddingWithoutAViaLeavesItNull(): void {
		self::assertNull($this->service->create(1, 'Milk', null, null, null, 'ben')->getAddedVia());
	}

	public function testAddingATickedLineRecordsTheViaForTheTickToo(): void {
		$item = $this->service->create(1, 'Milk', null, null, null, 'ben', false, true, false, 'Home Assistant');
		self::assertSame('Home Assistant', $item->getCheckedVia());
	}

	public function testTickingWithAViaRecordsIt(): void {
		$this->existing(false);
		self::assertSame('Home Assistant', $this->service->check(7, true, 'ben', 'Home Assistant')->getCheckedVia());
	}

	public function testTickingWithoutAViaLeavesItNull(): void {
		$this->existing(false, 'Home Assistant');
		self::assertNull($this->service->check(7, true, 'ben')->getCheckedVia());
	}

	public function testUntickingClearsTheVia(): void {
		$this->existing(true, 'Home Assistant');
		self::assertNull($this->service->check(7, false, 'ben', 'Home Assistant')->getCheckedVia());
	}

	public function testMovingClearsTheVia(): void {
		$this->existing(true, 'Home Assistant');
		self::assertNull($this->service->move(7, 2, 'ben')->getCheckedVia());
	}
}
