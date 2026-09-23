<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\ItemImageStorage;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ItemImageStorageTest extends TestCase {
	private IAppData&MockObject $appData;
	private LoggerInterface&MockObject $logger;
	private ItemImageStorage $storage;

	protected function setUp(): void {
		$this->appData = $this->createMock(IAppData::class);
		$factory = $this->createMock(IAppDataFactory::class);
		$factory->method('get')->with('shopping_list')->willReturn($this->appData);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->storage = new ItemImageStorage($factory, $this->logger);
	}

	public function testFileNamesAreKeyedByImageKey(): void {
		self::assertSame('00000000000000aa.jpg', ItemImageStorage::fileName('00000000000000aa', false));
		self::assertSame('00000000000000aa.thumb.jpg', ItemImageStorage::fileName('00000000000000aa', true));
	}

	public function testFileNameRefusesAnythingButAKey(): void {
		$this->expectException(\InvalidArgumentException::class);
		ItemImageStorage::fileName('../../secret', false);
	}

	public function testStoreCreatesTheFolderOnFirstUseAndWritesBothFiles(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willThrowException(new NotFoundException());
		$this->appData->expects(self::once())->method('newFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturn(false);
		$folder->expects(self::exactly(2))->method('newFile')
			->with(
				self::callback(fn (string $name) => in_array($name, ['00000000000000aa.jpg', '00000000000000aa.thumb.jpg'], true)),
				self::callback(fn (string $bytes) => in_array($bytes, ['FULL', 'THUMB'], true)),
			)
			->willReturn($this->createMock(ISimpleFile::class));

		$this->storage->store('00000000000000aa', 'FULL', 'THUMB');
	}

	public function testStoreOverwritesExistingFilesInPlace(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturn(true);
		$full = $this->createMock(ISimpleFile::class);
		$thumb = $this->createMock(ISimpleFile::class);
		$folder->method('getFile')->willReturnMap([['00000000000000aa.jpg', $full], ['00000000000000aa.thumb.jpg', $thumb]]);
		$full->expects(self::once())->method('putContent')->with('FULL');
		$thumb->expects(self::once())->method('putContent')->with('THUMB');
		$folder->expects(self::never())->method('newFile');

		$this->storage->store('00000000000000aa', 'FULL', 'THUMB');
	}

	public function testGetReturnsTheRequestedFile(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$file = $this->createMock(ISimpleFile::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('getFile')->with('00000000000000aa.thumb.jpg')->willReturn($file);

		self::assertSame($file, $this->storage->get('00000000000000aa', true));
	}

	public function testGetWithNoFolderYetIsNotFoundAndCreatesNothing(): void {
		$this->appData->method('getFolder')->willThrowException(new NotFoundException());
		$this->appData->expects(self::never())->method('newFolder');

		$this->expectException(NotFoundException::class);
		$this->storage->get('00000000000000aa', false);
	}

	public function testDeleteManyRemovesOnlyTheFilesThatExist(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$this->appData->method('getFolder')->with('images')->willReturn($folder);
		$folder->method('fileExists')->willReturnMap([
			['00000000000000a7.jpg', true], ['00000000000000a7.thumb.jpg', true],
			['00000000000000a8.jpg', false], ['00000000000000a8.thumb.jpg', false],
		]);
		$sevenFull = $this->createMock(ISimpleFile::class);
		$sevenThumb = $this->createMock(ISimpleFile::class);
		$folder->method('getFile')->willReturnMap([['00000000000000a7.jpg', $sevenFull], ['00000000000000a7.thumb.jpg', $sevenThumb]]);
		$sevenFull->expects(self::once())->method('delete');
		$sevenThumb->expects(self::once())->method('delete');

		$this->storage->deleteMany(['00000000000000a7', '00000000000000a8']);
	}

	public function testDeleteManyWithNoFolderOrNoIdsTouchesNothing(): void {
		$this->appData->expects(self::never())->method('newFolder');
		$this->appData->method('getFolder')->willThrowException(new NotFoundException());

		$this->storage->deleteMany([]);
		$this->storage->deleteMany(['00000000000000a1', '00000000000000a2']);
		$this->storage->delete('00000000000000a3');
	}

	public function testDeleteManySurvivesAnUnreadableAppdata(): void {
		$this->appData->method('getFolder')->willThrowException(new NotPermittedException());

		$this->logger->expects(self::atLeastOnce())->method('warning');

		$this->storage->deleteMany(['00000000000000a7']);
		$this->storage->delete('00000000000000a8');
	}

	public function testStoreTakesTheFolderAnotherRequestJustCreated(): void {
		$folder = $this->createMock(ISimpleFolder::class);
		$calls = 0;
		$this->appData->method('getFolder')->willReturnCallback(function () use (&$calls, $folder) {
			if ($calls++ === 0) {
				throw new NotFoundException();
			}
			return $folder;
		});
		$this->appData->method('newFolder')->willThrowException(new NotPermittedException());
		$folder->method('fileExists')->willReturn(false);
		$folder->expects(self::exactly(2))->method('newFile')->willReturn($this->createMock(ISimpleFile::class));

		$this->storage->store('00000000000000aa', 'FULL', 'THUMB');
	}
}
