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

/** An item added by name alone gets the amount it was last given in the list. */
class ItemServiceAmountTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private AmountMemory&MockObject $amounts;
	private ItemService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(7);
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
		$this->amounts = $this->createMock(AmountMemory::class);
		$this->service = new ItemService(
			$this->mapper,
			$this->createMock(ListService::class),
			$this->createMock(ShopAreaService::class),
			$this->createMock(PushService::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(ItemImageCleanup::class),
			$this->createMock(ItemImageService::class),
			$this->createMock(IUserManager::class),
			$this->amounts,
		);
	}

	private function existing(string $name, ?string $quantity): Item {
		$item = new Item();
		$item->setId(7);
		$item->setListId(1);
		$item->setName($name);
		$item->setQuantity($quantity);
		$this->mapper->method('find')->willReturn($item);
		return $item;
	}

	public function testANameOnItsOwnGetsItsRememberedAmount(): void {
		$this->amounts->method('recall')->with(1, 'Rice')->willReturn('500 g');
		$this->amounts->expects(self::never())->method('remember');
		$item = $this->service->create(1, 'Rice', null, null, null, 'ben');
		self::assertSame('500 g', $item->getQuantity());
	}

	public function testANameNeverGivenAnAmountGetsOne(): void {
		$this->amounts->method('recall')->willReturn(null);
		self::assertSame('1', $this->service->create(1, 'Rice', null, null, null, 'ben')->getQuantity());
	}

	public function testATypedAmountWinsAndIsRemembered(): void {
		$this->amounts->expects(self::never())->method('recall');
		$this->amounts->expects(self::once())->method('remember')->with(1, 'Rice', '1 kg');
		$item = $this->service->create(1, 'Rice', '1 kg', null, null, 'ben', false, false, true);
		self::assertSame('1 kg', $item->getQuantity());
	}

	public function testAnAmountTheClientFilledInItselfIsNotRemembered(): void {
		// Older clients, and the Android app today, send "1" for a bare name.
		$this->amounts->expects(self::never())->method('remember');
		self::assertSame('1', $this->service->create(1, 'Rice', '1', null, null, 'ben')->getQuantity());
	}

	public function testEditingTheAmountRemembersIt(): void {
		$this->existing('Rice', '1');
		$this->amounts->expects(self::once())->method('remember')->with(1, 'Rice', '500 g');
		$this->service->update(7, ['quantity' => '500 g', 'quantityExplicit' => true], 'ben');
	}

	public function testEditingTheNameAndAmountRemembersItUnderTheNewName(): void {
		$this->existing('Rice', '1');
		$this->amounts->expects(self::once())->method('remember')->with(1, 'Basmati', '500 g');
		$this->service->update(7, ['name' => 'Basmati', 'quantity' => '500 g', 'quantityExplicit' => true], 'ben');
	}

	public function testClearingTheAmountIsPassedOnSoItIsForgotten(): void {
		$this->existing('Rice', '500 g');
		$this->amounts->expects(self::once())->method('remember')->with(1, 'Rice', null);
		$this->service->update(7, ['quantity' => null, 'quantityExplicit' => true], 'ben');
	}

	public function testAMergedTotalIsNotRemembered(): void {
		$this->existing('Rice', '500 g');
		$this->amounts->expects(self::never())->method('remember');
		$this->service->update(7, ['quantity' => '1000 g'], 'ben');
	}
}
