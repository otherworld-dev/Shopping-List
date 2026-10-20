<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ItemController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\TextAddResult;
use OCA\Shopping_List\Service\TextInputService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Adding by a line of text alongside the name-and-fields add the apps use today. */
class ItemControllerTextTest extends TestCase {
	private ItemService&MockObject $service;
	private TextInputService&MockObject $text;
	private array $params = [];

	private function controller(string $via = ''): ItemController {
		$request = $this->createMock(IRequest::class);
		$request->method('getHeader')->willReturnCallback(fn (string $name) => $name === 'X-Shopping-List-Via' ? $via : '');
		$request->method('getParams')->willReturnCallback(fn () => $this->params);
		$this->service = $this->createMock(ItemService::class);
		$this->text = $this->createMock(TextInputService::class);
		return new ItemController('shopping_list', $request, $this->service, $this->text, 'ben');
	}

	private static function item(): Item {
		$item = new Item();
		$item->setId(7);
		$item->setName('Milk');
		return $item;
	}

	public function testTextReturnsOutcome(): void {
		$controller = $this->controller();
		$this->text->method('addFromText')->willReturnOnConsecutiveCalls(
			new TextAddResult(self::item(), TextAddResult::CREATED),
			new TextAddResult(self::item(), TextAddResult::MERGED),
		);

		$created = $controller->create(1, null, text: 'milk');
		self::assertSame(Http::STATUS_CREATED, $created->getStatus());
		self::assertSame('created', $created->getData()['outcome']);
		self::assertSame('Milk', $created->getData()['name']);

		$merged = $controller->create(1, null, text: 'milk');
		self::assertSame(Http::STATUS_OK, $merged->getStatus());
		self::assertSame('merged', $merged->getData()['outcome']);
	}

	public function testNameStillWorksAsBefore(): void {
		$controller = $this->controller();
		$this->service->method('create')->willReturn(self::item());
		$this->text->expects(self::never())->method('addFromText');
		$response = $controller->create(1, 'Milk');
		self::assertSame(Http::STATUS_CREATED, $response->getStatus());
		self::assertInstanceOf(Item::class, $response->getData());
	}

	public function testNeitherIs400(): void {
		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller()->create(1)->getStatus());
	}

	public function testBothIs400(): void {
		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller()->create(1, 'Milk', text: 'milk')->getStatus());
	}

	public function testALineWithNoNameIs400(): void {
		$controller = $this->controller();
		$this->text->method('addFromText')->willThrowException(new \InvalidArgumentException('No item name'));
		self::assertSame(Http::STATUS_BAD_REQUEST, $controller->create(1, null, text: '2')->getStatus());
	}

	public function testUpdateFromText(): void {
		$controller = $this->controller();
		$this->params = ['text' => '3 pints Milk'];
		$this->text->expects(self::once())->method('updateFromText')->with(7, '3 pints Milk', 'ben')->willReturn(self::item());
		$this->service->expects(self::never())->method('update');
		self::assertSame(Http::STATUS_OK, $controller->update(1, 7)->getStatus());
	}

	public function testUpdateAmountOnly(): void {
		$controller = $this->controller();
		$this->params = ['amountText' => 'three pints'];
		$this->text->expects(self::once())->method('updateAmount')->with(7, 'three pints', 'ben')->willReturn(self::item());
		self::assertSame(Http::STATUS_OK, $controller->update(1, 7)->getStatus());
	}

	public function testUpdateWithBothIs400(): void {
		$controller = $this->controller();
		$this->params = ['text' => 'Milk', 'amountText' => '2'];
		$this->text->expects(self::never())->method('updateFromText');
		self::assertSame(Http::STATUS_BAD_REQUEST, $controller->update(1, 7)->getStatus());
	}

	public function testUnreadableAmountIs400(): void {
		$controller = $this->controller();
		$this->params = ['amountText' => 'lots'];
		$this->text->method('updateAmount')->willThrowException(new \InvalidArgumentException('No amount'));
		self::assertSame(Http::STATUS_BAD_REQUEST, $controller->update(1, 7)->getStatus());
	}

	public function testPlainUpdateUnchanged(): void {
		$controller = $this->controller();
		$this->params = ['name' => 'Bread', 'imageKey' => 'forged'];
		$this->service->expects(self::once())->method('update')->with(7, ['name' => 'Bread'], 'ben')->willReturn(self::item());
		self::assertSame(Http::STATUS_OK, $controller->update(1, 7)->getStatus());
	}

	public function testViaHeaderIsPassedOn(): void {
		$controller = $this->controller('Home Assistant');
		$this->text->expects(self::once())->method('addFromText')->with(1, 'milk', 'ben', 'Home Assistant')
			->willReturn(new TextAddResult(self::item(), TextAddResult::CREATED));
		$controller->create(1, null, text: 'milk');
	}
}
