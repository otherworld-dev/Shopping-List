<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\Photo;
use OCA\Shopping_List\Db\PhotoMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\ItemImageCleanup;
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
	private const NEW_KEY = 'abcdefabcdefabcd';
	private const OLD_KEY = '1111111111111111';

	private ItemMapper&MockObject $mapper;
	private ListService&MockObject $listService;
	private PushService&MockObject $push;
	private ItemImageStorage&MockObject $storage;
	private ImageProcessor&MockObject $processor;
	private ISecureRandom&MockObject $random;
	private PhotoMapper&MockObject $photos;
	private ItemImageCleanup&MockObject $cleanup;
	private ItemImageService $service;

	/** @var array<int, Item[]> items per list id, served by findAllByList */
	private array $itemsByList = [];

	/** @var array<int, ?string> image key each updated item was saved with, by item id, in update order */
	private array $updated = [];

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->listService = $this->createMock(ListService::class);
		$this->push = $this->createMock(PushService::class);
		$this->storage = $this->createMock(ItemImageStorage::class);
		$this->processor = $this->createMock(ImageProcessor::class);
		$this->random = $this->createMock(ISecureRandom::class);
		$this->photos = $this->createMock(PhotoMapper::class);
		$this->cleanup = $this->createMock(ItemImageCleanup::class);
		$this->service = new ItemImageService(
			$this->mapper, $this->listService, $this->push, $this->storage, $this->processor, $this->random,
			$this->photos, $this->cleanup,
		);
		$this->mapper->method('update')->willReturnCallback(function (Item $i) {
			$this->updated[$i->getId()] = $i->getImageKey();
			return $i;
		});
		$this->mapper->method('findAllByList')->willReturnCallback(fn (int $listId) => $this->itemsByList[$listId] ?? []);
		$this->photos->method('insert')->willReturnArgument(0);
		$this->photos->method('update')->willReturnArgument(0);
	}

	private function item(int $id = 42, int $listId = 5, string $name = 'Cheese', ?string $imageKey = null): Item {
		$item = new Item();
		$item->setId($id);
		$item->setListId($listId);
		$item->setName($name);
		$item->setImageKey($imageKey);
		$item->setUpdatedAt(new DateTime('2026-01-01T00:00:00+00:00'));
		return $item;
	}

	private function list(int $id, int $permission): ShoppingList {
		$list = new ShoppingList();
		$list->setId($id);
		$list->setPermission($permission);
		return $list;
	}

	private function photo(string $userId, string $imageKey): Photo {
		$photo = new Photo();
		$photo->setUserId($userId);
		$photo->setNameKey('cheese');
		$photo->setImageKey($imageKey);
		return $photo;
	}

	private function expectAttachBasics(Item $item): void {
		$this->mapper->method('find')->with($item->getId())->willReturn($item);
		$this->processor->method('process')->with('RAW')->willReturn(new ProcessedImage('FULL', 'THUMB', 1280, 960));
		$this->random->method('generate')->with(16, '0123456789abcdef')->willReturn(self::NEW_KEY);
	}

	public function testAttachStoresTheFilesUnderANewKeyAndGivesItToTheItem(): void {
		$item = $this->item(42, 5, 'Cheese', self::OLD_KEY);
		$this->expectAttachBasics($item);
		$this->itemsByList[5] = [$item];
		$this->listService->method('findAll')->with('alice')->willReturn([$this->list(5, 1)]);
		$this->listService->expects(self::once())->method('assertWriteAccess')->with(5, 'alice');
		$this->storage->expects(self::once())->method('store')->with(self::NEW_KEY, 'FULL', 'THUMB');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(5, 42, 'updated', 'alice');

		$result = $this->service->attach(5, 42, 'RAW', 'alice');

		self::assertSame(self::NEW_KEY, $result->getImageKey());
		self::assertGreaterThan(new DateTime('2026-01-01T00:00:00+00:00'), $result->getUpdatedAt());
	}

	public function testAttachRemembersThePhotoForTheNameAndTheUploader(): void {
		$this->expectAttachBasics($this->item());
		$this->listService->method('findAll')->willReturn([]);
		$this->photos->method('findForUser')->with('alice', 'cheese')->willReturn(null);
		$this->photos->expects(self::once())->method('insert')->with(self::callback(
			fn (Photo $p) => $p->getUserId() === 'alice' && $p->getNameKey() === 'cheese' && $p->getImageKey() === self::NEW_KEY,
		))->willReturnArgument(0);

		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testAttachReplacesTheUploadersEarlierPhotoForTheNameAndReleasesIt(): void {
		$this->expectAttachBasics($this->item());
		$this->listService->method('findAll')->willReturn([]);
		$earlier = $this->photo('alice', '2222222222222222');
		$this->photos->method('findForUser')->willReturn($earlier);
		$this->photos->expects(self::never())->method('insert');
		$this->photos->expects(self::once())->method('update')->with(self::callback(
			fn (Photo $p) => $p === $earlier && $p->getImageKey() === self::NEW_KEY,
		))->willReturnArgument(0);
		$this->cleanup->expects(self::once())->method('release')->with(['2222222222222222']);

		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testAttachGivesThePhotoToSameNamedItemsInEveryListTheUploaderCanEdit(): void {
		$item = $this->item(42, 5, 'Cheese', self::OLD_KEY);
		$this->expectAttachBasics($item);
		$this->itemsByList = [
			5 => [$item, $this->item(43, 5, 'Milk')],
			6 => [$this->item(50, 6, '  CHEESE ', null)],
			9 => [$this->item(60, 9, 'cheese')],
		];
		$this->listService->method('findAll')->with('alice')->willReturn([
			$this->list(5, 1), $this->list(6, 1), $this->list(9, 0),
		]);
		$notified = [];
		$this->push->method('notifyItemUpdate')->willReturnCallback(function (int $listId, int $itemId) use (&$notified) {
			$notified[] = [$listId, $itemId];
		});
		$this->cleanup->expects(self::once())->method('release')->with([self::OLD_KEY]);

		$this->service->attach(5, 42, 'RAW', 'alice');

		self::assertSame([42 => self::NEW_KEY, 50 => self::NEW_KEY], $this->updated);
		self::assertSame([[5, 42], [6, 50]], $notified);
	}

	public function testAttachWithoutWriteAccessTouchesNothing(): void {
		$this->mapper->method('find')->willReturn($this->item());
		$this->listService->method('assertWriteAccess')->willThrowException(new NoPermissionException('No write access'));
		$this->processor->expects(self::never())->method('process');
		$this->storage->expects(self::never())->method('store');
		$this->photos->expects(self::never())->method('insert');

		$this->expectException(NoPermissionException::class);
		$this->service->attach(5, 42, 'RAW', 'bob');
	}

	public function testAttachOnAnItemFromAnotherListIsNotFound(): void {
		$this->mapper->method('find')->willReturn($this->item(42, 7));
		$this->listService->expects(self::never())->method('assertWriteAccess');

		$this->expectException(NotFoundException::class);
		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testAttachOnAMissingItemIsNotFound(): void {
		$this->mapper->method('find')->willThrowException(new DoesNotExistException('gone'));

		$this->expectException(NotFoundException::class);
		$this->service->attach(5, 42, 'RAW', 'alice');
	}

	public function testRememberedKeyIsTheNewestPhotoWhoseTakerCanEditTheList(): void {
		$this->photos->method('findByName')->with('cheese')->willReturn([
			$this->photo('carol', '3333333333333333'),
			$this->photo('bob', '2222222222222222'),
			$this->photo('alice', self::OLD_KEY),
		]);
		$this->listService->method('assertWriteAccess')->willReturnCallback(function (int $listId, string $userId) {
			if ($userId === 'carol') {
				throw new NoPermissionException('No write access');
			}
		});

		self::assertSame('2222222222222222', $this->service->rememberedKey(5, ' Cheese '));
	}

	public function testRememberedKeySkipsTakersWhoCannotSeeTheList(): void {
		$this->photos->method('findByName')->willReturn([$this->photo('carol', '3333333333333333')]);
		$this->listService->method('assertWriteAccess')->willThrowException(new NotFoundException('List not found'));

		self::assertNull($this->service->rememberedKey(5, 'Cheese'));
	}

	public function testRememberedKeyOfABlankNameIsNull(): void {
		$this->photos->expects(self::never())->method('findByName');

		self::assertNull($this->service->rememberedKey(5, '   '));
	}

	public function testRemoveForgetsTheNameForEveryoneWhoCanEditTheList(): void {
		$item = $this->item(42, 5, 'Cheese', self::OLD_KEY);
		$this->mapper->method('find')->willReturn($item);
		$alice = $this->photo('alice', self::OLD_KEY);
		$bob = $this->photo('bob', '2222222222222222');
		$carol = $this->photo('carol', '3333333333333333');
		$this->photos->method('findByName')->with('cheese')->willReturn([$alice, $bob, $carol]);
		$this->listService->method('assertWriteAccess')->willReturnCallback(function (int $listId, string $userId) {
			if ($userId === 'carol') {
				throw new NoPermissionException('No write access');
			}
		});
		$deleted = [];
		$this->photos->method('delete')->willReturnCallback(function (Photo $p) use (&$deleted) {
			$deleted[] = $p->getUserId();
			return $p;
		});
		$this->cleanup->expects(self::once())->method('release')->with([self::OLD_KEY, '2222222222222222']);

		$this->service->remove(5, 42, 'dave');

		self::assertSame(['alice', 'bob'], $deleted);
	}

	public function testRemoveClearsThoseKeysFromItemsInTheListsTheRemoverCanEdit(): void {
		$item = $this->item(42, 5, 'Cheese', self::OLD_KEY);
		$this->mapper->method('find')->willReturn($item);
		$this->photos->method('findByName')->willReturn([$this->photo('bob', '2222222222222222')]);
		$this->itemsByList = [
			5 => [$item, $this->item(44, 5, 'cheese', '2222222222222222')],
			6 => [$this->item(50, 6, 'Renamed', self::OLD_KEY), $this->item(51, 6, 'cheese', '3333333333333333')],
			9 => [$this->item(60, 9, 'cheese', self::OLD_KEY)],
		];
		$this->listService->method('findAll')->with('dave')->willReturn([
			$this->list(5, 1), $this->list(6, 1), $this->list(9, 0),
		]);
		$this->push->expects(self::exactly(3))->method('notifyItemUpdate');

		$result = $this->service->remove(5, 42, 'dave');

		self::assertNull($result->getImageKey());
		self::assertSame([42 => null, 44 => null, 50 => null], $this->updated);
	}

	public function testRemoveWithoutAnImageChangesNothing(): void {
		$item = $this->item(42, 5, 'Cheese', null);
		$this->mapper->method('find')->willReturn($item);
		$this->photos->expects(self::never())->method('delete');
		$this->mapper->expects(self::never())->method('update');
		$this->push->expects(self::never())->method('notifyItemUpdate');

		self::assertSame($item, $this->service->remove(5, 42, 'alice'));
	}

	public function testRemoveWithoutWriteAccessTouchesNothing(): void {
		$this->mapper->method('find')->willReturn($this->item(42, 5, 'Cheese', self::OLD_KEY));
		$this->listService->method('assertWriteAccess')->willThrowException(new NoPermissionException('No write access'));
		$this->photos->expects(self::never())->method('delete');
		$this->cleanup->expects(self::never())->method('release');

		$this->expectException(NoPermissionException::class);
		$this->service->remove(5, 42, 'bob');
	}

	public function testGetFileRejectsAWrongKeyWithoutReadingStorage(): void {
		$this->mapper->method('find')->willReturn($this->item(42, 5, 'Cheese', self::NEW_KEY));
		$this->storage->expects(self::never())->method('get');

		$this->expectException(NotFoundException::class);
		$this->service->getFile(5, 42, '0000000000000000', true);
	}

	public function testGetFileReturnsTheStoredFileForTheCurrentKey(): void {
		$this->mapper->method('find')->willReturn($this->item(42, 5, 'Cheese', self::NEW_KEY));
		$file = new InMemoryFile(self::NEW_KEY . '.thumb.jpg', 'x');
		$this->storage->method('get')->with(self::NEW_KEY, true)->willReturn($file);

		self::assertSame($file, $this->service->getFile(5, 42, self::NEW_KEY, true));
	}

	public function testGetFileWhoseBytesAreMissingIsNotFound(): void {
		$this->mapper->method('find')->willReturn($this->item(42, 5, 'Cheese', self::NEW_KEY));
		$this->storage->method('get')->willThrowException(new \OCP\Files\NotFoundException());

		$this->expectException(NotFoundException::class);
		$this->service->getFile(5, 42, self::NEW_KEY, false);
	}
}
