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

/** A new item nobody gave an area goes to its list's default area. */
class ItemServiceDefaultAreaTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private ShopAreaService&MockObject $areas;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(7);
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
		$this->areas = $this->createMock(ShopAreaService::class);
		$this->service = new ItemService(
			$this->mapper,
			$this->createMock(ListService::class),
			$this->areas,
			$this->createMock(PushService::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(ItemImageCleanup::class),
			$this->createMock(ItemImageService::class),
			$this->createMock(IUserManager::class),
			$this->createMock(AmountMemory::class),
		);
	}

	public function testAnItemSentWithNoAreaGetsTheListsDefault(): void {
		$this->areas->method('defaultAreaFor')->with(1)->willReturn(12);
		// It wasn't the user's choice, so no keyword is learned from it.
		$this->areas->expects(self::never())->method('learnKeyword');

		self::assertSame(12, $this->service->create(1, 'Batteries', null, null, null, 'ben')->getShopAreaId());
	}

	public function testAListWithNoDefaultLeavesItUncategorised(): void {
		$this->areas->method('defaultAreaFor')->willReturn(null);

		self::assertNull($this->service->create(1, 'Batteries', null, null, null, 'ben')->getShopAreaId());
	}

	public function testAnAreaTheClientDetectedBeatsTheDefault(): void {
		$this->areas->expects(self::never())->method('defaultAreaFor');

		self::assertSame(5, $this->service->create(1, 'Milk', null, null, 5, 'ben')->getShopAreaId());
	}

	public function testAnAreaTheUserPickedBeatsTheDefaultAndIsLearned(): void {
		$this->areas->expects(self::never())->method('defaultAreaFor');
		$this->areas->expects(self::once())->method('learnKeyword')->with(1, 5, 'Batteries');

		self::assertSame(5, $this->service->create(1, 'Batteries', null, null, 5, 'ben', true)->getShopAreaId());
	}

	public function testClearingAnItemsAreaAfterwardsStaysCleared(): void {
		$item = new Item();
		$item->setId(7);
		$item->setListId(1);
		$item->setName('Batteries');
		$item->setShopAreaId(12);
		$this->mapper->method('find')->willReturn($item);
		$this->areas->expects(self::never())->method('defaultAreaFor');

		self::assertNull($this->service->update(7, ['shopAreaId' => null], 'ben')->getShopAreaId());
	}
}
