<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use DateTime;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\UserListPreference;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCA\Shopping_List\Service\UserSettingsService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ListServiceOrderTest extends TestCase {
	private ShoppingListMapper&MockObject $lists;
	private UserListPreferenceMapper&MockObject $prefs;
	private UserSettingsService&MockObject $settings;
	private ListService $service;

	protected function setUp(): void {
		$this->lists = $this->createMock(ShoppingListMapper::class);
		$this->prefs = $this->createMock(UserListPreferenceMapper::class);
		$this->settings = $this->createMock(UserSettingsService::class);
		$this->lists->method('findSharedWithUser')->willReturn([]);
		$this->lists->method('findSharedWithGroups')->willReturn([]);
		$this->lists->method('findByIds')->willReturn([]);
		$this->service = new ListService(
			$this->lists,
			$this->createMock(ShopAreaService::class),
			$this->createMock(IGroupManager::class),
			$this->createMock(IUserManager::class),
			$this->createMock(IDBConnection::class),
			$this->createMock(PushService::class),
			$this->prefs,
			$this->createMock(ItemImageCleanup::class),
			$this->settings,
		);
	}

	private function owned(int $id, string $title, string $updated): ShoppingList {
		$list = new ShoppingList();
		$list->setId($id);
		$list->setUserId('alice');
		$list->setTitle($title);
		$list->setUpdatedAt(new DateTime($updated));
		return $list;
	}

	private function pref(int $listId, ?int $position): UserListPreference {
		$pref = new UserListPreference();
		$pref->setListId($listId);
		$pref->setIsPinned(false);
		$pref->setPosition($position);
		return $pref;
	}

	public function testFindAllReturnsTheListsInTheUsersOrderWithTheirPositions(): void {
		$this->lists->method('findAllByUser')->willReturn([
			$this->owned(1, 'Groceries', '2026-09-26 12:00'),
			$this->owned(2, 'Hardware', '2026-09-01 12:00'),
		]);
		$this->prefs->method('findAllByUser')->willReturn([1 => $this->pref(1, 1), 2 => $this->pref(2, 0)]);
		$this->settings->method('listSort')->with('alice')->willReturn('custom');

		$result = $this->service->findAll('alice');

		self::assertSame([2, 1], array_map(fn (ShoppingList $l) => $l->getId(), $result));
		self::assertSame(0, $result[0]->getPosition());
	}

	public function testReorderSavesTheOrderForThisUser(): void {
		$this->lists->method('find')->willReturnCallback(fn (int $id) => $this->owned($id, 'List', '2026-09-01 12:00'));
		$this->prefs->expects(self::once())->method('setPositions')->with('alice', [3, 1, 2]);

		self::assertSame([3, 1, 2], $this->service->reorder([3, 1, 2], 'alice'));
	}

	public function testReorderRefusesAListTheUserCannotSeeAndSavesNothing(): void {
		$this->lists->method('find')->willReturnCallback(function (int $id) {
			if ($id === 9) {
				throw new DoesNotExistException('gone');
			}
			return $this->owned($id, 'List', '2026-09-01 12:00');
		});
		$this->prefs->expects(self::never())->method('setPositions');
		$this->expectException(NotFoundException::class);

		$this->service->reorder([3, 9, 1], 'alice');
	}

	public function testReorderCountsARepeatedIdOnce(): void {
		$this->lists->method('find')->willReturnCallback(fn (int $id) => $this->owned($id, 'List', '2026-09-01 12:00'));
		$this->prefs->expects(self::once())->method('setPositions')->with('alice', [3, 1]);

		$this->service->reorder([3, 3, 1], 'alice');
	}
}
