<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * What a public link sends for an item is held to the same rules as adding
 * one: a real name of at most 255 characters, and only the list's own shop
 * areas.
 */
class PublicListControllerInputTest extends TestCase {
	private ItemMapper&MockObject $items;
	private ShopAreaService&MockObject $areas;

	protected function setUp(): void {
		$this->items = $this->createMock(ItemMapper::class);
		$this->items->method('insert')->willReturnArgument(0);
		$this->items->method('update')->willReturnArgument(0);
		$this->areas = $this->createMock(ShopAreaService::class);
		$this->areas->method('find')->willReturnCallback(function (int $id): ShopArea {
			// Area 30 is this list's, 77 belongs to someone else's list
			if ($id !== 30 && $id !== 77) {
				throw new NotFoundException('Shop area not found');
			}
			$area = new ShopArea();
			$area->setId($id);
			$area->setListId($id === 30 ? 5 : 9);
			return $area;
		});
		$milk = new Item();
		$milk->setId(12);
		$milk->setListId(5);
		$milk->setName('Milk');
		$this->items->method('find')->willReturn($milk);
	}

	/** @param array<string, mixed> $params what the link sent */
	private function controller(array $params): PublicListController {
		$request = $this->createMock(IRequest::class);
		$request->method('getParams')->willReturn($params);
		$request->method('getParam')->willReturnCallback(fn (string $key, mixed $default = null) => $params[$key] ?? $default);
		$share = new ListShare();
		$share->setListId(5);
		$share->setPermission(1);
		$access = $this->createMock(PublicShareAccess::class);
		$access->method('resolve')->willReturn($share);
		return new PublicListController(
			'shopping_list',
			$request,
			$this->createMock(ShareService::class),
			$this->createMock(ShoppingListMapper::class),
			$this->items,
			$this->createMock(ShopAreaMapper::class),
			$this->areas,
			$access,
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
		);
	}

	/** @return array<string, array{mixed}> */
	public static function badNames(): array {
		return [
			'too long' => [str_repeat('a', 256)],
			'only spaces' => ['   '],
			'not text' => [['Milk']],
		];
	}

	#[DataProvider('badNames')]
	public function testARenameThatCouldNotBeAddedIsRefused(mixed $name): void {
		$this->items->expects(self::never())->method('update');

		$response = $this->controller(['name' => $name])->updateItem('tok', 12);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		self::assertSame(['message' => 'Invalid name'], $response->getData());
	}

	public function testARenameIsTrimmedLikeANewItem(): void {
		$this->items->expects(self::once())->method('update')
			->with(self::callback(fn (Item $item) => $item->getName() === 'Oat milk'));

		$this->controller(['name' => '  Oat milk '])->updateItem('tok', 12);
	}

	public function testMovingAnItemToAnotherListsAreaIsRefused(): void {
		$this->items->expects(self::never())->method('update');

		$response = $this->controller(['shopAreaId' => 77])->updateItem('tok', 12);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		self::assertSame(['message' => 'Invalid shop area'], $response->getData());
	}

	public function testMovingAnItemToAnAreaThatDoesNotExistIsRefused(): void {
		$this->items->expects(self::never())->method('update');

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller(['shopAreaId' => 404])->updateItem('tok', 12)->getStatus());
	}

	public function testMovingAnItemToOneOfTheListsOwnAreasWorks(): void {
		$this->items->expects(self::once())->method('update')
			->with(self::callback(fn (Item $item) => $item->getShopAreaId() === 30));

		self::assertSame(Http::STATUS_OK, $this->controller(['shopAreaId' => 30])->updateItem('tok', 12)->getStatus());
	}

	public function testTakingAnItemOutOfItsAreaStillWorks(): void {
		$this->items->expects(self::once())->method('update')
			->with(self::callback(fn (Item $item) => $item->getShopAreaId() === null));

		self::assertSame(Http::STATUS_OK, $this->controller(['shopAreaId' => null])->updateItem('tok', 12)->getStatus());
	}

	public function testAddingAnItemToAnotherListsAreaIsRefused(): void {
		$this->items->expects(self::never())->method('insert');

		$response = $this->controller(['name' => 'Cheese', 'shopAreaId' => 77])->createItem('tok');

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		self::assertSame(['message' => 'Invalid shop area'], $response->getData());
	}

	public function testAddingAnItemToOneOfTheListsOwnAreasWorks(): void {
		$this->items->expects(self::once())->method('insert')
			->with(self::callback(fn (Item $item) => $item->getShopAreaId() === 30));

		self::assertSame(Http::STATUS_CREATED, $this->controller(['name' => 'Cheese', 'shopAreaId' => 30])->createItem('tok')->getStatus());
	}
}
