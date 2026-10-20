<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCA\Shopping_List\Service\TextAddResult;
use OCA\Shopping_List\Service\TextInputService;
use OCP\IL10N;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Adding an item from one line of text, the way the web app's add box does it. */
class TextInputServiceAddTest extends TestCase {
	private ItemService&MockObject $items;
	private ItemMapper&MockObject $mapper;
	private ShopAreaService&MockObject $areas;
	private string $language = 'en';
	/** @var Item[] */
	private array $onList = [];

	private function service(): TextInputService {
		$this->items = $this->createMock(ItemService::class);
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('findAllByList')->willReturnCallback(fn () => $this->onList);
		$this->areas = $this->createMock(ShopAreaService::class);
		$l = $this->createMock(IL10N::class);
		$l->method('getLanguageCode')->willReturnCallback(fn () => $this->language);
		return new TextInputService($this->items, $this->mapper, $this->createMock(ListService::class), $this->areas, $l);
	}

	private function onList(string $name, ?string $quantity, bool $checked): Item {
		$item = new Item();
		$item->setId(7);
		$item->setListId(1);
		$item->setName($name);
		$item->setQuantity($quantity);
		$item->setChecked($checked);
		$this->onList[] = $item;
		return $item;
	}

	public function testParsesSpokenAmountAndArea(): void {
		$service = $this->service();
		$this->areas->method('detectArea')->with(1, 'Milk')->willReturn(5);
		$this->items->expects(self::once())->method('create')
			->with(1, 'Milk', '2 pints', null, 5, 'ben', false, false, true, 'Home Assistant')
			->willReturn(new Item());
		$result = $service->addFromText(1, 'two pints of milk', 'ben', 'Home Assistant');
		self::assertSame(TextAddResult::CREATED, $result->outcome);
	}

	public function testNoKeywordLeavesTheAreaToTheDefault(): void {
		$service = $this->service();
		$this->areas->method('detectArea')->willReturn(null);
		$this->items->expects(self::once())->method('create')
			->with(1, 'Batteries', null, null, null, 'ben', false, false, false, null)
			->willReturn(new Item());
		$service->addFromText(1, 'batteries', 'ben', null);
	}

	public function testTopsUpAnOpenItem(): void {
		$service = $this->service();
		$this->onList('Milk', '1', false);
		$this->items->expects(self::never())->method('create');
		$this->items->expects(self::once())->method('update')->with(7, ['quantity' => '2'], 'ben')->willReturn(new Item());
		self::assertSame(TextAddResult::MERGED, $service->addFromText(1, 'milk', 'ben', null)->outcome);
	}

	public function testPluralisesWhenTheAmountPassesOne(): void {
		$service = $this->service();
		$this->onList('Apple', '1', false);
		$this->items->expects(self::once())->method('update')->with(7, ['quantity' => '2', 'name' => 'Apples'], 'ben')->willReturn(new Item());
		$service->addFromText(1, 'apple', 'ben', null);
	}

	public function testBringsBackATickedItem(): void {
		$service = $this->service();
		$this->onList('Milk', '2 pints', true);
		$this->items->expects(self::never())->method('update');
		$this->items->expects(self::once())->method('check')->with(7, false, 'ben')->willReturn(new Item());
		self::assertSame(TextAddResult::RESTORED, $service->addFromText(1, 'milk', 'ben', null)->outcome);
	}

	public function testTypedAmountReplacesOnRestore(): void {
		$service = $this->service();
		$this->onList('Milk', '2 pints', true);
		$this->items->expects(self::once())->method('update')->with(7, ['quantity' => '3 pints', 'quantityExplicit' => true], 'ben');
		$this->items->expects(self::once())->method('check')->with(7, false, 'ben')->willReturn(new Item());
		$service->addFromText(1, '3 pints milk', 'ben', null);
	}

	public function testTickedLineNeverMerges(): void {
		$service = $this->service();
		$this->onList('Milk', '1', false);
		$this->items->expects(self::never())->method('update');
		$this->items->expects(self::once())->method('create')
			->with(1, 'Milk', null, null, null, 'ben', false, true, false, null)
			->willReturn(new Item());
		$service->addFromText(1, '[x] Milk', 'ben', null);
	}

	public function testUsesTheUsersLanguage(): void {
		$service = $this->service();
		$this->language = 'de';
		$this->items->expects(self::once())->method('create')
			->with(1, 'Mehl', '0.5 kg', null, null, 'ben', false, false, true, null)
			->willReturn(new Item());
		$service->addFromText(1, '0,5 kg Mehl', 'ben', null);
	}

	public function testSpokenNumbersFollowTheUsersLanguage(): void {
		$service = $this->service();
		$this->language = 'bg';
		$this->items->expects(self::once())->method('create')
			->with(1, 'Two apples', null, null, null, 'ben', false, false, false, null)
			->willReturn(new Item());
		$service->addFromText(1, 'two apples', 'ben', null);
	}

	public static function noName(): array {
		return [['2'], ['2 pints'], ['[x]'], ['   '], [''], ['[x] 2'], ['- 2 pints'], ['1. 3 pints'], ['* 2']];
	}

	#[DataProvider('noName')]
	public function testALineWithNoNameIsRefused(string $text): void {
		$service = $this->service();
		$this->items->expects(self::never())->method('create');
		$this->expectException(\InvalidArgumentException::class);
		$service->addFromText(1, $text, 'ben', null);
	}
}
