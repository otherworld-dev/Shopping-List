<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Capabilities;
use OCA\Shopping_List\Service\ImageProcessor;
use OCP\App\IAppManager;
use PHPUnit\Framework\TestCase;

class CapabilitiesTest extends TestCase {
	public function testAdvertisesTheImageFeatureAndItsLimits(): void {
		$appManager = $this->createMock(IAppManager::class);
		$appManager->method('getAppVersion')->with('shopping_list')->willReturn('1.9.0');

		$caps = (new Capabilities($appManager))->getCapabilities()['shopping_list'];

		self::assertSame('1.9.0', $caps['version']);
		self::assertContains('item-images', $caps['features']);
		self::assertSame(1280, $caps['itemImages']['maxSide']);
		self::assertSame(160, $caps['itemImages']['thumbSide']);
		self::assertGreaterThan(0, $caps['itemImages']['maxUploadBytes']);
		self::assertLessThanOrEqual(ImageProcessor::MAX_UPLOAD_BYTES, $caps['itemImages']['maxUploadBytes']);
	}
}
