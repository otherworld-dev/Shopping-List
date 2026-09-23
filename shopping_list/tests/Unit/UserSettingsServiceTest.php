<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\UserSettingsService;
use OCP\IConfig;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class UserSettingsServiceTest extends TestCase {
	private IConfig&MockObject $config;
	private UserSettingsService $settings;

	protected function setUp(): void {
		$this->config = $this->createMock(IConfig::class);
		$this->settings = new UserSettingsService($this->config);
	}

	public function testImagesAreOffUntilTheUserTurnsThemOn(): void {
		$this->config->method('getUserValue')->with('alice', 'shopping_list', 'show_images', '0')->willReturn('0');

		self::assertFalse($this->settings->showImages('alice'));
		self::assertSame(['showImages' => false], $this->settings->forUser('alice'));
	}

	public function testOnlyTheStoredOneCountsAsOn(): void {
		$this->config->method('getUserValue')->willReturnOnConsecutiveCalls('1', 'yes', '');

		self::assertTrue($this->settings->showImages('alice'));
		self::assertFalse($this->settings->showImages('alice'));
		self::assertFalse($this->settings->showImages('alice'));
	}

	public function testSettingWritesOneOrZero(): void {
		$this->config->expects(self::exactly(2))->method('setUserValue')
			->with('alice', 'shopping_list', 'show_images', self::callback(fn (string $v) => in_array($v, ['1', '0'], true)));

		$this->settings->setShowImages('alice', true);
		$this->settings->setShowImages('alice', false);
	}
}
