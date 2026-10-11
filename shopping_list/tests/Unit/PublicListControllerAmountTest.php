<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\AmountMemory;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Guests on a public link get and set the list's remembered amounts too. */
class PublicListControllerAmountTest extends TestCase {
	private IRequest&MockObject $request;
	private AmountMemory&MockObject $amounts;
	private PublicListController $controller;

	protected function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->amounts = $this->createMock(AmountMemory::class);
		$items = $this->createMock(ItemMapper::class);
		$items->method('insert')->willReturnArgument(0);
		$items->method('update')->willReturnArgument(0);
		$item = new Item();
		$item->setId(42);
		$item->setListId(5);
		$item->setName('Rice');
		$items->method('find')->willReturn($item);
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
			$this->createMock(ShopAreaService::class),
			$access,
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
			$this->amounts,
		);
	}

	private function params(?string $quantity, ?bool $explicit): void {
		$this->request->method('getParam')->willReturnMap([
			['name', '', 'Rice'],
			['quantity', null, $quantity],
			['quantityExplicit', null, $explicit],
		]);
	}

	public function testANameOnItsOwnGetsItsRememberedAmount(): void {
		$this->params(null, null);
		$this->amounts->method('recall')->with(5, 'Rice')->willReturn('500 g');
		$this->amounts->expects(self::never())->method('remember');

		$data = $this->controller->createItem('token')->getData();

		self::assertInstanceOf(Item::class, $data);
		self::assertSame('500 g', $data->getQuantity());
	}

	public function testATypedAmountIsRemembered(): void {
		$this->params('1 kg', true);
		$this->amounts->expects(self::never())->method('recall');
		$this->amounts->expects(self::once())->method('remember')->with(5, 'Rice', '1 kg');

		self::assertSame('1 kg', $this->controller->createItem('token')->getData()->getQuantity());
	}

	public function testAnAmountWithoutTheFlagIsNotRemembered(): void {
		$this->params('1', null);
		$this->amounts->expects(self::never())->method('remember');

		self::assertSame('1', $this->controller->createItem('token')->getData()->getQuantity());
	}

	public function testAGuestEditingTheAmountRemembersIt(): void {
		$this->request->method('getParams')->willReturn(['quantity' => '1 kg', 'quantityExplicit' => true]);
		$this->amounts->expects(self::once())->method('remember')->with(5, 'Rice', '1 kg');

		self::assertSame('1 kg', $this->controller->updateItem('token', 42)->getData()->getQuantity());
	}

	public function testAGuestEditWithoutTheFlagIsNotRemembered(): void {
		$this->request->method('getParams')->willReturn(['quantity' => '1000 g']);
		$this->amounts->expects(self::never())->method('remember');

		$this->controller->updateItem('token', 42);
	}
}
