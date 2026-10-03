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
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\AnonRateLimit;
use OCP\AppFramework\Http\Attribute\BruteForceProtection;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/** An invite code resolves to its link's token; wrong guesses are throttled. */
class PublicListControllerCodeTest extends TestCase {
	private function controller(ShareService $shares): PublicListController {
		return new PublicListController(
			'shopping_list',
			$this->createMock(IRequest::class),
			$shares,
			$this->createMock(ShoppingListMapper::class),
			$this->createMock(ItemMapper::class),
			$this->createMock(ShopAreaMapper::class),
			$this->createMock(ShopAreaService::class),
			$this->createMock(PublicShareAccess::class),
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
		);
	}

	public function testResolveCodeIsBruteForceProtectedAndRateLimited(): void {
		$method = new \ReflectionMethod(PublicListController::class, 'resolveCode');
		$brute = $method->getAttributes(BruteForceProtection::class);
		self::assertCount(1, $brute);
		self::assertSame('shopping_list_public_code', $brute[0]->getArguments()['action']);
		$rate = $method->getAttributes(AnonRateLimit::class);
		self::assertCount(1, $rate);
		self::assertSame(['limit' => 10, 'period' => 60], $rate[0]->getArguments());
	}

	public function testAValidCodeGivesTheToken(): void {
		$share = new ListShare();
		$share->setToken('abc123');
		$shares = $this->createMock(ShareService::class);
		$shares->method('findShareByCode')->with('k7qm-3xpd')->willReturn($share);

		$response = $this->controller($shares)->resolveCode('k7qm-3xpd');

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame(['token' => 'abc123'], $response->getData());
		self::assertFalse($response->isThrottled());
	}

	public function testAWrongCodeIsNotFoundAndThrottled(): void {
		$shares = $this->createMock(ShareService::class);
		$shares->method('findShareByCode')->willThrowException(new NotFoundException('Share not found'));

		$response = $this->controller($shares)->resolveCode('K7QM3XPD');

		self::assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
		self::assertSame(['message' => 'Not found'], $response->getData());
		self::assertTrue($response->isThrottled());
		self::assertSame(['code' => 'K7QM3XPD'], $response->getThrottleMetadata());
	}

	public function testJunkKeepsTheThrottleMetadataShort(): void {
		$shares = $this->createMock(ShareService::class);
		$shares->method('findShareByCode')->willThrowException(new NotFoundException('Share not found'));

		$response = $this->controller($shares)->resolveCode(str_repeat('é', 500));

		self::assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
		self::assertLessThanOrEqual(16, mb_strlen($response->getThrottleMetadata()['code']));
	}
}
