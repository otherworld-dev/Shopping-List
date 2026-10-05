<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/** A change through a link to an item the owner has deleted is a 404, not a server error. */
class PublicListControllerMissingItemTest extends TestCase {
	private PublicListController $controller;

	protected function setUp(): void {
		$request = $this->createMock(IRequest::class);
		$request->method('getParams')->willReturn(['name' => 'Cheese']);
		$items = $this->createMock(ItemMapper::class);
		$items->method('find')->willThrowException(new DoesNotExistException('Did expect one result but found none'));
		$access = $this->createMock(PublicShareAccess::class);
		$share = new ListShare();
		$share->setListId(5);
		$access->method('resolve')->willReturn($share);
		$this->controller = new PublicListController(
			'shopping_list',
			$request,
			$this->createMock(ShareService::class),
			$this->createMock(ShoppingListMapper::class),
			$items,
			$this->createMock(ShopAreaMapper::class),
			$this->createMock(ShopAreaService::class),
			$access,
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
		);
	}

	private static function assertNotFound(DataResponse $response): void {
		self::assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
		self::assertSame(['message' => 'Not found'], $response->getData());
	}

	public function testUpdatingADeletedItemIsNotFound(): void {
		self::assertNotFound($this->controller->updateItem('token', 999999));
	}

	public function testTickingADeletedItemIsNotFound(): void {
		self::assertNotFound($this->controller->checkItem('token', 999999, true));
	}

	public function testDeletingADeletedItemIsNotFound(): void {
		self::assertNotFound($this->controller->deleteItem('token', 999999));
	}
}
