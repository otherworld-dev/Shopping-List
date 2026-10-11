<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\PhotoMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ItemImageStorage;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ItemImageCleanupTest extends TestCase {
	private ItemMapper&MockObject $items;
	private PhotoMapper&MockObject $photos;
	private ItemImageStorage&MockObject $storage;
	private ItemImageCleanup $cleanup;

	protected function setUp(): void {
		$this->items = $this->createMock(ItemMapper::class);
		$this->photos = $this->createMock(PhotoMapper::class);
		$this->storage = $this->createMock(ItemImageStorage::class);
		$this->cleanup = new ItemImageCleanup($this->items, $this->photos, $this->storage);
	}

	public function testReleaseDeletesTheFilesOfKeysNothingUsesAnyMore(): void {
		$this->items->method('hasImageKey')->willReturnMap([
			['aaaaaaaaaaaaaaaa', false],
			['bbbbbbbbbbbbbbbb', true],
			['cccccccccccccccc', false],
		]);
		$this->photos->method('hasImageKey')->willReturnMap([
			['aaaaaaaaaaaaaaaa', false],
			['bbbbbbbbbbbbbbbb', false],
			['cccccccccccccccc', true],
		]);
		$this->storage->expects(self::once())->method('deleteMany')->with(['aaaaaaaaaaaaaaaa']);

		$this->cleanup->release(['aaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbb', 'cccccccccccccccc']);
	}

	public function testReleaseChecksEachKeyOnceAndIgnoresEmptyOnes(): void {
		$this->items->expects(self::once())->method('hasImageKey')->with('aaaaaaaaaaaaaaaa')->willReturn(false);
		$this->photos->method('hasImageKey')->willReturn(false);
		$this->storage->expects(self::once())->method('deleteMany')->with(['aaaaaaaaaaaaaaaa']);

		$this->cleanup->release(['aaaaaaaaaaaaaaaa', null, '', 'aaaaaaaaaaaaaaaa']);
	}

	public function testReleaseOfNothingTouchesNothing(): void {
		$this->items->expects(self::never())->method('hasImageKey');
		$this->storage->expects(self::never())->method('deleteMany');

		$this->cleanup->release([]);
		$this->cleanup->release([null]);
	}
}
