<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Items added or renamed through a public link pick up a remembered photo too. */
class PublicListControllerPhotoTest extends TestCase {
	private const KEY = 'abcdefabcdefabcd';

	private IRequest&MockObject $request;
	private ItemMapper&MockObject $items;
	private ItemImageService&MockObject $images;
	private PublicListController $controller;

	protected function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->items = $this->createMock(ItemMapper::class);
		$this->images = $this->createMock(ItemImageService::class);
		$access = $this->createMock(PublicShareAccess::class);
		$share = new ListShare();
		$share->setListId(5);
		$access->method('resolve')->willReturn($share);
		$this->controller = new PublicListController(
			'shopping_list',
			$this->request,
			$this->createMock(ShareService::class),
			$this->createMock(ShoppingListMapper::class),
			$this->items,
			$this->createMock(ShopAreaMapper::class),
			$this->createMock(ShopAreaService::class),
			$access,
			$this->createMock(ItemService::class),
			$this->images,
		);
		$this->items->method('insert')->willReturnArgument(0);
		$this->items->method('update')->willReturnArgument(0);
	}

	public function testAnItemAddedThroughTheLinkGetsTheRememberedPhoto(): void {
		$this->request->method('getParam')->willReturnMap([
			['name', '', 'Cheese'],
			['shopAreaId', null, null],
			['quantity', null, null],
			['unit', null, null],
		]);
		$this->images->method('rememberedKey')->with(5, 'Cheese')->willReturn(self::KEY);

		$data = $this->controller->createItem('token')->getData();

		self::assertInstanceOf(Item::class, $data);
		self::assertSame(self::KEY, $data->getImageKey());
	}

	public function testAnItemRenamedThroughTheLinkGetsTheNewNamesPhoto(): void {
		$item = new Item();
		$item->setId(42);
		$item->setListId(5);
		$item->setName('Chese');
		$this->items->method('find')->willReturn($item);
		$this->request->method('getParams')->willReturn(['name' => 'Cheese']);
		$this->images->method('rememberedKey')->with(5, 'Cheese')->willReturn(self::KEY);

		$data = $this->controller->updateItem('token', 42)->getData();

		self::assertSame(self::KEY, $data->getImageKey());
	}
}
