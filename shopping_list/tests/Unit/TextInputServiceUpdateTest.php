<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCA\Shopping_List\Service\TextInputService;
use OCP\IL10N;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Changing an item from a line of text, or changing only its amount. */
class TextInputServiceUpdateTest extends TestCase {
	private ItemService&MockObject $items;
	private TextInputService $service;

	protected function setUp(): void {
		$this->items = $this->createMock(ItemService::class);
		$l = $this->createMock(IL10N::class);
		$l->method('getLanguageCode')->willReturn('en');
		$this->service = new TextInputService(
			$this->items,
			$this->createMock(ItemMapper::class),
			$this->createMock(ListService::class),
			$this->createMock(ShopAreaService::class),
			$l,
		);
	}

	public function testTextSetsNameAndAmount(): void {
		$this->items->expects(self::once())->method('update')
			->with(7, ['name' => 'Milk', 'quantity' => '3 pints', 'quantityExplicit' => true], 'ben')
			->willReturn(new Item());
		$this->service->updateFromText(7, '3 pints Milk', 'ben');
	}

	public function testTextReadsSpokenNumbers(): void {
		$this->items->expects(self::once())->method('update')
			->with(7, ['name' => 'Milk', 'quantity' => '3 pints', 'quantityExplicit' => true], 'ben')
			->willReturn(new Item());
		$this->service->updateFromText(7, 'three pints of milk', 'ben');
	}

	public function testTextWithoutAmountClearsIt(): void {
		$this->items->expects(self::once())->method('update')
			->with(7, ['name' => 'Bread', 'quantity' => null], 'ben')
			->willReturn(new Item());
		$this->service->updateFromText(7, 'Bread', 'ben');
	}

	public function testTextWithNoNameIsRefused(): void {
		$this->items->expects(self::never())->method('update');
		$this->expectException(\InvalidArgumentException::class);
		$this->service->updateFromText(7, '2 pints', 'ben');
	}

	public function testAmountOnlyNeverRenames(): void {
		$this->items->expects(self::once())->method('update')
			->with(7, ['quantity' => '3 pints', 'quantityExplicit' => true], 'ben')
			->willReturn(new Item());
		$this->service->updateAmount(7, 'three pints', 'ben');
	}

	public function testABareNumberWordIsAnAmount(): void {
		$this->items->expects(self::exactly(3))->method('update')
			->willReturnCallback(function (int $id, array $fields) {
				static $expected = ['6', '12', '0.5'];
				self::assertSame(['quantity' => array_shift($expected), 'quantityExplicit' => true], $fields);
				return new Item();
			});
		$this->service->updateAmount(7, 'six', 'ben');
		$this->service->updateAmount(7, 'a dozen', 'ben');
		$this->service->updateAmount(7, 'half', 'ben');
	}

	public function testHalfAPound(): void {
		$this->items->expects(self::once())->method('update')
			->with(7, ['quantity' => '0.5 pound', 'quantityExplicit' => true], 'ben')
			->willReturn(new Item());
		$this->service->updateAmount(7, 'half a pound', 'ben');
	}

	public function testUnreadableAmountIsRefused(): void {
		$this->items->expects(self::never())->method('update');
		foreach (['lots', '3 pints milk', ''] as $amount) {
			try {
				$this->service->updateAmount(7, $amount, 'ben');
				self::fail('Expected "' . $amount . '" to be refused');
			} catch (\InvalidArgumentException) {
				// expected
			}
		}
	}
}
