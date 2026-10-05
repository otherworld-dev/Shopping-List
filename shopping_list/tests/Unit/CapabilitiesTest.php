<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Capabilities;
use OCA\Shopping_List\Service\ImageProcessor;
use OCP\App\IAppManager;
use OCP\Capabilities\IPublicCapability;
use OCP\IUserSession;
use PHPUnit\Framework\TestCase;

class CapabilitiesTest extends TestCase {
	private function capabilities(bool $loggedIn): Capabilities {
		$appManager = $this->createMock(IAppManager::class);
		$appManager->method('getAppVersion')->with('shopping_list')->willReturn('1.9.0');
		$session = $this->createMock(IUserSession::class);
		$session->method('isLoggedIn')->willReturn($loggedIn);
		return new Capabilities($appManager, $session);
	}

	public function testAdvertisesTheImageFeatureAndItsLimits(): void {
		$caps = $this->capabilities(true)->getCapabilities()['shopping_list'];

		self::assertSame('1.9.0', $caps['version']);
		self::assertContains('item-images', $caps['features']);
		self::assertContains('list-order', $caps['features']);
		self::assertContains('invite-codes', $caps['features']);
		self::assertContains('guest-names', $caps['features']);
		self::assertSame(1280, $caps['itemImages']['maxSide']);
		self::assertSame(160, $caps['itemImages']['thumbSide']);
		self::assertGreaterThan(0, $caps['itemImages']['maxUploadBytes']);
		self::assertLessThanOrEqual(ImageProcessor::MAX_UPLOAD_BYTES, $caps['itemImages']['maxUploadBytes']);
	}

	/** A guest joining by invite code has no account, so the app checks the features before login */
	public function testGuestsSeeOnlyTheFeatures(): void {
		$capabilities = $this->capabilities(false);

		self::assertInstanceOf(IPublicCapability::class, $capabilities);
		self::assertSame(
			['shopping_list' => ['features' => ['item-images', 'list-order', 'invite-codes', 'guest-names']]],
			$capabilities->getCapabilities(),
		);
	}
}
