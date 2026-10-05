<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\UserSettingsService;
use OCP\IConfig;
use PHPUnit\Framework\Attributes\DataProvider;
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
		$this->config->method('getUserValue')->willReturnMap([
			['alice', 'shopping_list', 'show_images', '0', '0'],
			['alice', 'shopping_list', 'list_sort', 'updated', 'updated'],
			['alice', 'shopping_list', 'show_own_name', '0', '0'],
			['alice', 'shopping_list', 'whats_new_seen', '', ''],
		]);

		self::assertFalse($this->settings->showImages('alice'));
		self::assertSame(['showImages' => false, 'listSort' => 'updated', 'showOwnName' => false, 'whatsNewSeen' => ''], $this->settings->forUser('alice'));
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

	public function testListSortIsRecentlyUpdatedUntilChosen(): void {
		$this->config->method('getUserValue')->with('alice', 'shopping_list', 'list_sort', 'updated')->willReturn('updated');

		self::assertSame('updated', $this->settings->listSort('alice'));
	}

	public function testAStoredListSortThatIsNotAModeReadsAsRecentlyUpdated(): void {
		$this->config->method('getUserValue')->willReturn('price');

		self::assertSame('updated', $this->settings->listSort('alice'));
	}

	public function testSettingTheListSortStoresTheMode(): void {
		$this->config->expects(self::once())->method('setUserValue')->with('alice', 'shopping_list', 'list_sort', 'custom');

		$this->settings->setListSort('alice', 'custom');
	}

	public function testAnUnknownListSortIsRefused(): void {
		$this->config->expects(self::never())->method('setUserValue');
		$this->expectException(\InvalidArgumentException::class);

		$this->settings->setListSort('alice', 'price');
	}

	public function testYourOwnNameIsHiddenUntilYouAskForIt(): void {
		$this->config->method('getUserValue')->willReturnMap([
			['alice', 'shopping_list', 'show_own_name', '0', '0'],
			['bob', 'shopping_list', 'show_own_name', '0', '1'],
		]);

		self::assertFalse($this->settings->showOwnName('alice'));
		self::assertTrue($this->settings->showOwnName('bob'));
	}

	public function testShowingYourOwnNameWritesOneOrZero(): void {
		$this->config->expects(self::exactly(2))->method('setUserValue')
			->with('alice', 'shopping_list', 'show_own_name', self::callback(fn (string $v) => in_array($v, ['1', '0'], true)));

		$this->settings->setShowOwnName('alice', true);
		$this->settings->setShowOwnName('alice', false);
	}

	public function testNoReleaseNotesAreSeenUntilTheyAreShown(): void {
		$this->config->method('getUserValue')->willReturnMap([
			['alice', 'shopping_list', 'whats_new_seen', '', ''],
			['bob', 'shopping_list', 'whats_new_seen', '', '1.9.0'],
		]);

		self::assertSame('', $this->settings->whatsNewSeen('alice'));
		self::assertSame('1.9.0', $this->settings->whatsNewSeen('bob'));
	}

	public function testSavingTheSeenVersionStoresIt(): void {
		$this->config->expects(self::exactly(3))->method('setUserValue')
			->with('alice', 'shopping_list', 'whats_new_seen', self::callback(fn (string $v) => in_array($v, ['1.10.0', '1.7.1.1', '2.0.0-beta.1'], true)));

		$this->settings->setWhatsNewSeen('alice', '1.10.0');
		$this->settings->setWhatsNewSeen('alice', '1.7.1.1');
		$this->settings->setWhatsNewSeen('alice', '2.0.0-beta.1');
	}

	/** @return array<string, array{string}> */
	public static function notVersions(): array {
		return [
			'empty' => [''],
			'a word' => ['latest'],
			'a v in front' => ['v1.10.0'],
			'a gap' => ['1..0'],
			'too many parts' => ['1.2.3.4.5'],
			'markup' => ['1.0<script>'],
			'far too long' => [str_repeat('1', 40)],
		];
	}

	#[DataProvider('notVersions')]
	public function testAnythingButAVersionIsRefused(string $value): void {
		$this->config->expects(self::never())->method('setUserValue');
		$this->expectException(\InvalidArgumentException::class);

		$this->settings->setWhatsNewSeen('alice', $value);
	}
}
