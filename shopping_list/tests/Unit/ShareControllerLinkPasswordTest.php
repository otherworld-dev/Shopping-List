<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ShareController;
use OCA\Shopping_List\Service\ShareService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/** A password the policy refuses comes back as a 400 carrying the policy's own hint, for the Share dialog to show. */
class ShareControllerLinkPasswordTest extends TestCase {
	private function controller(ShareService $service): ShareController {
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturnMap([
			['permission', 0, 1],
			['password', null, '1234'],
			['expiresAt', null, null],
		]);
		$request->method('getParams')->willReturn(['password' => '1234']);
		return new ShareController('shopping_list', $request, $service, 'alice');
	}

	public function testANewLinkWithARefusedPasswordIsABadRequest(): void {
		$service = $this->createMock(ShareService::class);
		$service->method('createLinkShare')->willThrowException(new \InvalidArgumentException('Password needs to be at least 10 characters long.'));

		$response = $this->controller($service)->createLink(5);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		self::assertSame(['message' => 'Password needs to be at least 10 characters long.'], $response->getData());
	}

	public function testChangingToARefusedPasswordIsABadRequest(): void {
		$service = $this->createMock(ShareService::class);
		$service->method('updateLinkShare')->willThrowException(new \InvalidArgumentException('Password needs to be at least 10 characters long.'));

		$response = $this->controller($service)->updateLink(3);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		self::assertSame(['message' => 'Password needs to be at least 10 characters long.'], $response->getData());
	}
}
