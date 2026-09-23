<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\Photo;
use OCA\Shopping_List\Db\PhotoMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\Tag;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\TagService;
use OCA\Shopping_List\Service\UserDataCleanup;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class UserDataCleanupTest extends TestCase {
	private ShoppingListMapper&MockObject $lists;
	private ListService&MockObject $listService;
	private ListShareMapper&MockObject $shares;
	private UserListPreferenceMapper&MockObject $prefs;
	private TagService&MockObject $tags;
	private PhotoMapper&MockObject $photos;
	private ItemImageCleanup&MockObject $imageCleanup;
	private ItemMapper&MockObject $items;
	private LoggerInterface&MockObject $logger;
	private UserDataCleanup $cleanup;

	protected function setUp(): void {
		$this->lists = $this->createMock(ShoppingListMapper::class);
		$this->listService = $this->createMock(ListService::class);
		$this->shares = $this->createMock(ListShareMapper::class);
		$this->prefs = $this->createMock(UserListPreferenceMapper::class);
		$this->tags = $this->createMock(TagService::class);
		$this->photos = $this->createMock(PhotoMapper::class);
		$this->imageCleanup = $this->createMock(ItemImageCleanup::class);
		$this->items = $this->createMock(ItemMapper::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->cleanup = new UserDataCleanup(
			$this->lists, $this->listService, $this->shares, $this->prefs, $this->tags,
			$this->photos, $this->imageCleanup, $this->items, $this->logger,
		);
	}

	private function list(int $id): ShoppingList {
		$list = new ShoppingList();
		$list->setId($id);
		return $list;
	}

	private function tag(int $id): Tag {
		$tag = new Tag();
		$tag->setId($id);
		return $tag;
	}

	private function photo(string $imageKey): Photo {
		$photo = new Photo();
		$photo->setUserId('bob');
		$photo->setImageKey($imageKey);
		return $photo;
	}

	public function testDeletesTheListsTheUserOwnsTheWayTheAppDoes(): void {
		$this->lists->method('findAllByUser')->with('bob')->willReturn([$this->list(3), $this->list(4)]);
		$deleted = [];
		$this->listService->method('delete')->willReturnCallback(function (int $id, string $userId) use (&$deleted) {
			$deleted[] = [$id, $userId];
		});

		$this->cleanup->deleteUser('bob');

		self::assertSame([[3, 'bob'], [4, 'bob']], $deleted);
	}

	public function testRemovesSharesPreferencesAndTheCheckedByMark(): void {
		$this->shares->expects(self::once())->method('deleteSharedWithUser')->with('bob');
		$this->prefs->expects(self::once())->method('deleteByUser')->with('bob');
		$this->items->expects(self::once())->method('clearCheckedBy')->with('bob');

		$this->cleanup->deleteUser('bob');
	}

	public function testDeletesTheUsersTags(): void {
		$this->tags->method('findAll')->with('bob')->willReturn([$this->tag(7), $this->tag(8)]);
		$deleted = [];
		$this->tags->method('delete')->willReturnCallback(function (int $id, string $userId) use (&$deleted) {
			$deleted[] = [$id, $userId];
		});

		$this->cleanup->deleteUser('bob');

		self::assertSame([[7, 'bob'], [8, 'bob']], $deleted);
	}

	public function testForgetsTheUsersPhotosAndReleasesTheirFiles(): void {
		$a = $this->photo('aaaaaaaaaaaaaaaa');
		$b = $this->photo('bbbbbbbbbbbbbbbb');
		$this->photos->method('findAllByUser')->with('bob')->willReturn([$a, $b]);
		$deleted = [];
		$this->photos->method('delete')->willReturnCallback(function (Photo $p) use (&$deleted) {
			$deleted[] = $p->getImageKey();
			return $p;
		});
		$this->imageCleanup->expects(self::once())->method('release')->with(['aaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbb']);

		$this->cleanup->deleteUser('bob');

		self::assertSame(['aaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbb'], $deleted);
	}

	public function testDeletesTheListsBeforeReleasingPhotoFiles(): void {
		$order = [];
		$this->lists->method('findAllByUser')->willReturn([$this->list(3)]);
		$this->listService->method('delete')->willReturnCallback(function () use (&$order) {
			$order[] = 'list';
		});
		$this->photos->method('findAllByUser')->willReturn([$this->photo('aaaaaaaaaaaaaaaa')]);
		$this->imageCleanup->method('release')->willReturnCallback(function () use (&$order) {
			$order[] = 'release';
		});

		$this->cleanup->deleteUser('bob');

		self::assertSame(['list', 'release'], $order);
	}

	public function testOneFailingStepIsLoggedAndTheRestStillRun(): void {
		$this->lists->method('findAllByUser')->willReturn([$this->list(3), $this->list(4)]);
		$deleted = [];
		$this->listService->method('delete')->willReturnCallback(function (int $id) use (&$deleted) {
			if ($id === 3) {
				throw new \RuntimeException('database hiccup');
			}
			$deleted[] = $id;
		});
		$this->logger->expects(self::once())->method('error');
		$this->prefs->expects(self::once())->method('deleteByUser');

		$this->cleanup->deleteUser('bob');

		self::assertSame([4], $deleted);
	}
}
