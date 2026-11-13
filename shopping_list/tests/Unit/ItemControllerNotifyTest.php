<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ItemController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Service\AddedItemNotifications;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\TextAddResult;
use OCA\Shopping_List\Service\TextInputService;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Which adds tell the others on the list. */
class ItemControllerNotifyTest extends TestCase {
	private ItemService&MockObject $service;
	private TextInputService&MockObject $text;
	private AddedItemNotifications&MockObject $added;
	private ItemController $controller;

	protected function setUp(): void {
		$request = $this->createMock(IRequest::class);
		$request->method('getHeader')->willReturn('');
		$this->service = $this->createMock(ItemService::class);
		$this->text = $this->createMock(TextInputService::class);
		$this->added = $this->createMock(AddedItemNotifications::class);
		$this->controller = new ItemController('shopping_list', $request, $this->service, $this->text, 'ben', $this->added);
	}

	private static function item(string $name, bool $checked = false): Item {
		$item = new Item();
		$item->setId(7);
		$item->setName($name);
		$item->setChecked($checked);
		return $item;
	}

	public function testAnAddIsPassedOn(): void {
		$this->service->method('create')->willReturn(self::item('Milk'));
		$this->added->expects(self::once())->method('itemAdded')->with(1, 'Milk', 'ben');

		$this->controller->create(1, 'Milk');
	}

	public function testALineAddedAsAlreadyBoughtIsNot(): void {
		$this->service->method('create')->willReturn(self::item('Milk', true));
		$this->added->expects(self::never())->method('itemAdded');

		$this->controller->create(1, 'Milk', null, null, null, false, true);
	}

	public function testAnAddThatFailsIsNot(): void {
		$this->service->method('create')->willThrowException(new NoPermissionException('No write access'));
		$this->added->expects(self::never())->method('itemAdded');

		$this->controller->create(1, 'Milk');
	}

	public function testANewItemFromTextIsPassedOn(): void {
		$this->text->method('addFromText')->willReturn(new TextAddResult(self::item('Eggs'), TextAddResult::CREATED));
		$this->added->expects(self::once())->method('itemAdded')->with(1, 'Eggs', 'ben');

		$this->controller->create(1, null, null, null, null, false, false, false, '6 eggs');
	}

	public function testTextThatOnlyAddsToAnItemAlreadyThereIsNot(): void {
		$this->text->method('addFromText')->willReturn(new TextAddResult(self::item('Eggs'), TextAddResult::MERGED));
		$this->added->expects(self::never())->method('itemAdded');

		$this->controller->create(1, null, null, null, null, false, false, false, '6 eggs');
	}

	public function testAnItemMovedInIsNewToTheTargetList(): void {
		$this->service->method('move')->willReturn(self::item('Milk'));
		$this->added->expects(self::once())->method('itemAdded')->with(2, 'Milk', 'ben');

		$this->controller->move(1, 7, 2);
	}

	public function testAMoveToTheSameListIsNot(): void {
		$this->service->method('move')->willReturn(self::item('Milk'));
		$this->added->expects(self::never())->method('itemAdded');

		$this->controller->move(1, 7, 1);
	}

	public function testANewCopyIsNewToTheTargetList(): void {
		$this->service->method('copy')->willReturn(new TextAddResult(self::item('Milk'), TextAddResult::CREATED));
		$this->added->expects(self::once())->method('itemAdded')->with(2, 'Milk', 'ben');

		$this->controller->copy(1, 7, 2);
	}

	public function testACopyThatTopsUpOrBringsBackAnItemIsNot(): void {
		$this->service->method('copy')->willReturnOnConsecutiveCalls(
			new TextAddResult(self::item('Milk'), TextAddResult::MERGED),
			new TextAddResult(self::item('Milk'), TextAddResult::RESTORED),
			new TextAddResult(self::item('Milk'), TextAddResult::UNCHANGED),
		);
		$this->added->expects(self::never())->method('itemAdded');

		$this->controller->copy(1, 7, 2);
		$this->controller->copy(1, 7, 2);
		$this->controller->copy(1, 7, 1);
	}
}
