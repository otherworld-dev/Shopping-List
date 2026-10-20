<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ItemController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\TextInputService;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** The X-Shopping-List-Via header names the app a change came through. */
class ItemControllerViaTest extends TestCase {
	private ItemService&MockObject $service;

	private function controller(string $header): ItemController {
		$request = $this->createMock(IRequest::class);
		$request->method('getHeader')->willReturnCallback(fn (string $name) => $name === 'X-Shopping-List-Via' ? $header : '');
		$this->service = $this->createMock(ItemService::class);
		return new ItemController('shopping_list', $request, $this->service, $this->createMock(TextInputService::class), 'ben');
	}

	public function testAddingPassesTheCleanedLabel(): void {
		$controller = $this->controller('  Home Assistant ');
		$this->service->expects(self::once())->method('create')
			->with(1, 'Milk', null, null, null, 'ben', false, false, false, 'Home Assistant')
			->willReturn(new Item());
		$controller->create(1, 'Milk');
	}

	public function testTickingPassesTheLabel(): void {
		$controller = $this->controller('Kitchen');
		$this->service->expects(self::once())->method('check')->with(7, true, 'ben', 'Kitchen')->willReturn(new Item());
		$controller->check(1, 7, true);
	}

	public function testNoHeaderMeansNoLabel(): void {
		$controller = $this->controller('');
		$this->service->expects(self::once())->method('check')->with(7, true, 'ben', null)->willReturn(new Item());
		$controller->check(1, 7, true);
	}
}
