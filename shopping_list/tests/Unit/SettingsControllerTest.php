<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\SettingsController;
use OCA\Shopping_List\Service\UserSettingsService;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class SettingsControllerTest extends TestCase {
	private UserSettingsService&MockObject $settings;
	private SettingsController $controller;

	protected function setUp(): void {
		$this->settings = $this->createMock(UserSettingsService::class);
		$this->settings->method('forUser')->willReturn(['showImages' => false, 'listSort' => 'alpha']);
		$this->controller = new SettingsController('shopping_list', $this->createMock(IRequest::class), $this->settings, 'alice');
	}

	public function testSavesTheListSortAndAnswersWithEverySetting(): void {
		$this->settings->expects(self::once())->method('setListSort')->with('alice', 'alpha');
		$this->settings->expects(self::never())->method('setShowImages');

		$response = $this->controller->update(null, 'alpha');

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame(['showImages' => false, 'listSort' => 'alpha'], $response->getData());
	}

	public function testAnUnknownListSortIsABadRequest(): void {
		$this->settings->method('setListSort')->willThrowException(new \InvalidArgumentException('Unknown list sort'));

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller->update(null, 'price')->getStatus());
	}
}
