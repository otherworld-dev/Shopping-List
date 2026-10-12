<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\AmountMemory;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Guests on a public link send no area, so their new items get the list's default too. */
class PublicListControllerDefaultAreaTest extends TestCase {
	private IRequest&MockObject $request;
	private ShopAreaService&MockObject $areas;
	private PublicListController $controller;

	protected function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->areas = $this->createMock(ShopAreaService::class);
		$items = $this->createMock(ItemMapper::class);
		$items->method('insert')->willReturnArgument(0);
		$access = $this->createMock(PublicShareAccess::class);
		$share = new ListShare();
		$share->setListId(5);
		$access->method('resolve')->willReturn($share);
		$this->controller = new PublicListController(
			'shopping_list',
			$this->request,
			$this->createMock(ShareService::class),
			$this->createMock(ShoppingListMapper::class),
			$items,
			$this->createMock(ShopAreaMapper::class),
			$this->areas,
			$access,
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
			$this->createMock(AmountMemory::class),
		);
	}

	private function params(mixed $shopAreaId): void {
		$this->request->method('getParam')->willReturnMap([
			['name', '', 'Batteries'],
			['shopAreaId', null, $shopAreaId],
		]);
	}

	public function testAGuestsItemGetsTheListsDefaultArea(): void {
		$this->params(null);
		$this->areas->method('defaultAreaFor')->with(5)->willReturn(12);

		self::assertSame(12, $this->controller->createItem('token')->getData()->getShopAreaId());
	}

	public function testAListWithNoDefaultLeavesItUncategorised(): void {
		$this->params(null);
		$this->areas->method('defaultAreaFor')->willReturn(null);

		self::assertNull($this->controller->createItem('token')->getData()->getShopAreaId());
	}

	public function testAnAreaSentThroughTheLinkBeatsTheDefault(): void {
		$this->params(7);
		$area = new ShopArea();
		$area->setId(7);
		$area->setListId(5);
		$this->areas->method('find')->with(7)->willReturn($area);
		$this->areas->expects(self::never())->method('defaultAreaFor');

		self::assertSame(7, $this->controller->createItem('token')->getData()->getShopAreaId());
	}
}
