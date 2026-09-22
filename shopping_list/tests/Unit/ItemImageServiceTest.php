<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemImageStorage;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\ProcessedImage;
use OCA\Shopping_List\Service\PushService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Files\SimpleFS\InMemoryFile;
use OCP\Security\ISecureRandom;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ItemImageServiceTest extends TestCase {
	private ItemMapper&MockObject $mapper;
	private ListService&MockObject $listService;
	private PushService&MockObject $push;
	private ItemImageStorage&MockObject $storage;
	private ImageProcessor&MockObject $processor;
	private ISecureRandom&MockObject $random;
	private ItemImageService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->listService = $this->createMock(ListService::class);
		$this->push = $this->createMock(PushService::class);
		$this->storage = $this->createMock(ItemImageStorage::class);
		$this->processor = $this->createMock(ImageProcessor::class);
		$this->random = $this->createMock(ISecureRandom::class);
		$this->service = new ItemImageService(
			$this->mapper, $this->listService, $this->push, $this->storage, $this->processor, $this->random,
		);
		$this->mapper->method('update')->willReturnArgument(0);
	}

	private function item(int $listId = 5, ?string $imageKey = null): Item {
		$item = new Item();
		$item->setId(42);
		$item->setListId($listId);
		$item->setName('Milk');
		$item->setImageKey($imageKey);
		$item->setUpdatedAt(new DateTime('2026-01-01T00:00:00+00:00'));
		return $item;
	}

	public function testAttachStoresBothFilesRotatesTheKeyAndNotifies(): void {
		$item = $this->item(5, '0000000000000001');
		$this->mapper->method('find')->with(42)->willReturn($item);
		$this->listService->expects(self::once())->method('assertWriteAccess')->with(5, 'alice');
		$this->processor->method('process')->with('RAW')->willReturn(new ProcessedImage('FULL', 'THUMB', 1280, 960));
		$this->storage->expects(self::once())->method('store')->with(42, 'FULL', 'THUMB');
		$this->random->method('generate')->with(16, '0123456789abcdef')->willReturn('abcdefabcdefabcd');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'updated', 'alice');

		$result = $this->service->attach(5, 42, 'RAW', 'alice');

		self::assertSame('abcdefabcdefabcd', $result->getImageKey());
		self::assertGreaterThan(new DateTime('2026-01-01T00:00:00+00:00'), $result->getUpdatedAt());
	}

	public function testAttachWithoutWriteAccessTouchesNothing(): void {
		$this->mapper->method('find')->willReturn($this->item());
		$this->listService->method('assertWriteAccess')->willThrowException(new NoPermissionException('No write access'));
		$this->processor->expects(self::never())->method('process');
		$this->storage->expects(self::never())->method('store');

		$this->expectException(NoPermissionException::class);
		$this->service->attach(5, 42, 'RAW', 'bob');
	}

	public function testAttachOnAnItemFromAnotherListIsNotFound(): void {
		$this->mapper->method('find')->willReturn($this->item(7));
		$this->listService->expects(self::never())->method('assertWriteAccess');

		$this->expectException(NotFoundException::class);
		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testAttachOnAMissingItemIsNotFound(): void {
		$this->mapper->method('find')->willThrowException(new DoesNotExistException('gone'));

		$this->expectException(NotFoundException::class);
		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testRemoveDeletesTheFilesClearsTheKeyAndNotifies(): void {
		$this->mapper->method('find')->willReturn($this->item(5, 'abcdefabcdefabcd'));
		$this->storage->expects(self::once())->method('delete')->with(42);
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'updated', 'alice');

		$result = $this->service->remove(5, 42, 'alice');

		self::assertNull($result->getImageKey());
	}

	public function testRemoveWithoutAnImageChangesNothing(): void {
		$item = $this->item(5, null);
		$this->mapper->method('find')->willReturn($item);
		$this->storage->expects(self::never())->method('delete');
		$this->mapper->expects(self::never())->method('update');
		$this->push->expects(self::never())->method('notifyItemUpdate');

		self::assertSame($item, $this->service->remove(5, 42, 'alice'));
	}

	public function testGetFileRejectsAWrongKeyWithoutReadingStorage(): void {
		$this->mapper->method('find')->willReturn($this->item(5, 'abcdefabcdefabcd'));
		$this->storage->expects(self::never())->method('get');

		$this->expectException(NotFoundException::class);
		$this->service->getFile(5, 42, '0000000000000000', true);
	}

	public function testGetFileReturnsTheStoredFileForTheCurrentKey(): void {
		$this->mapper->method('find')->willReturn($this->item(5, 'abcdefabcdefabcd'));
		$file = new InMemoryFile('42.thumb.jpg', 'x');
		$this->storage->method('get')->with(42, true)->willReturn($file);

		self::assertSame($file, $this->service->getFile(5, 42, 'abcdefabcdefabcd', true));
	}

	public function testGetFileWhoseBytesAreMissingIsNotFound(): void {
		$this->mapper->method('find')->willReturn($this->item(5, 'abcdefabcdefabcd'));
		$this->storage->method('get')->willThrowException(new \OCP\Files\NotFoundException());

		$this->expectException(NotFoundException::class);
		$this->service->getFile(5, 42, 'abcdefabcdefabcd', false);
	}
}
