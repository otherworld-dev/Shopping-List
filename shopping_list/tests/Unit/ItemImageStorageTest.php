<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\ItemImageStorage;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ItemImageStorageTest extends TestCase {
	private IAppData&MockObject $appData;
	private ItemImageStorage $storage;

	protected function setUp(): void {
		$this->appData = $this->createMock(IAppData::class);
		$factory = $this->createMock(IAppDataFactory::class);
		$factory->method('get')->with('shopping_list')->willReturn($this->appData);
		$this->storage = new ItemImageStorage($factory, $this->createMock(LoggerInterface::class));
	}

	public function testFileNamesAreKeyedByItemId(): void {
		self::assertSame('42.jpg', ItemImageStorage::fileName(42, false));
		self::assertSame('42.thumb.jpg', ItemImageStorage::fileName(42, true));
	}

	public function testStoreCreatesTheFolderOnFirstUseAndWritesBothFiles(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willThrowException(new NotFoundException());
		$this->appData->expects(self::once())->method('newFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturn(false);
		$folder->expects(self::exactly(2))->method('newFile')
			->with(
				self::callback(fn (string $name) => in_array($name, ['42.jpg', '42.thumb.jpg'], true)),
				self::callback(fn (string $bytes) => in_array($bytes, ['FULL', 'THUMB'], true)),
			)
			->willReturn($this->createMock(ISimpleFile::class));

		$this->storage->store(42, 'FULL', 'THUMB');
	}

	public function testStoreOverwritesExistingFilesInPlace(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturn(true);
		$full = $this->createMock(ISimpleFile::class);
		$thumb = $this->createMock(ISimpleFile::class);
		$folder->method('getFile')->willReturnMap([['42.jpg', $full], ['42.thumb.jpg', $thumb]]);
		$full->expects(self::once())->method('putContent')->with('FULL');
		$thumb->expects(self::once())->method('putContent')->with('THUMB');
		$folder->expects(self::never())->method('newFile');

		$this->storage->store(42, 'FULL', 'THUMB');
	}

	public function testGetReturnsTheRequestedFile(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$file = $this->createMock(ISimpleFile::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('getFile')->with('42.thumb.jpg')->willReturn($file);

		self::assertSame($file, $this->storage->get(42, true));
	}

	public function testGetWithNoFolderYetIsNotFoundAndCreatesNothing(): void {
		$this->appData->method('getFolder')->willThrowException(new NotFoundException());
		$this->appData->expects(self::never())->method('newFolder');

		$this->expectException(NotFoundException::class);
		$this->storage->get(42, false);
	}

	public function testDeleteManyRemovesOnlyTheFilesThatExist(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturnMap([
			['7.jpg', true], ['7.thumb.jpg', true],
			['8.jpg', false], ['8.thumb.jpg', false],
		]);
		$sevenFull = $this->createMock(ISimpleFile::class);
		$sevenThumb = $this->createMock(ISimpleFile::class);
		$folder->method('getFile')->willReturnMap([['7.jpg', $sevenFull], ['7.thumb.jpg', $sevenThumb]]);
		$sevenFull->expects(self::once())->method('delete');
		$sevenThumb->expects(self::once())->method('delete');

		$this->storage->deleteMany([7, 8]);
	}

	public function testDeleteManyWithNoFolderOrNoIdsTouchesNothing(): void {
		$this->appData->expects(self::never())->method('newFolder');
		$this->appData->method('getFolder')->willThrowException(new NotFoundException());

		$this->storage->deleteMany([]);
		$this->storage->deleteMany([1, 2]);
		$this->storage->delete(3);
	}
}
