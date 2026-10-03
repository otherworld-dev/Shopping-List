<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\BruteForceProtection;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/** Wrong passwords on a link are throttled by Nextcloud's brute-force protection. */
class PublicListControllerAuthTest extends TestCase {
	private function controller(ShareService $shares): PublicListController {
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturn('guess');
		$list = new ShoppingList();
		$list->setTitle('Groceries');
		$lists = $this->createMock(ShoppingListMapper::class);
		$lists->method('find')->willReturn($list);
		return new PublicListController(
			'shopping_list',
			$request,
			$shares,
			$lists,
			$this->createMock(ItemMapper::class),
			$this->createMock(ShopAreaMapper::class),
			$this->createMock(ShopAreaService::class),
			$this->createMock(PublicShareAccess::class),
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
		);
	}

	public function testAuthIsBruteForceProtected(): void {
		$attributes = (new \ReflectionMethod(PublicListController::class, 'auth'))
			->getAttributes(BruteForceProtection::class);
		self::assertCount(1, $attributes);
		self::assertSame('shopping_list_public_auth', $attributes[0]->getArguments()['action']);
	}

	public function testWrongPasswordIsThrottled(): void {
		$shares = $this->createMock(ShareService::class);
		$shares->method('validatePublicAccess')->willThrowException(new NoPermissionException('Invalid password'));

		$response = $this->controller($shares)->auth('abc123');

		self::assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
		self::assertSame(['message' => 'Invalid password'], $response->getData());
		self::assertTrue($response->isThrottled());
		self::assertSame(['token' => 'abc123'], $response->getThrottleMetadata());
	}

	public function testRightPasswordIsNotThrottled(): void {
		$share = new ListShare();
		$share->setListId(5);
		$share->setPermission(1);
		$shares = $this->createMock(ShareService::class);
		$shares->method('validatePublicAccess')->willReturn($share);

		$response = $this->controller($shares)->auth('abc123');

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertFalse($response->isThrottled());
	}
}
