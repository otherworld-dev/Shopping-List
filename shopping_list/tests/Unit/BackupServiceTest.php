<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ItemTagMapper;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\Tag;
use OCA\Shopping_List\Db\TagMapper;
use OCA\Shopping_List\Db\UserListPreference;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCA\Shopping_List\Service\BackupSerializer;
use OCA\Shopping_List\Service\BackupService;
use OCP\IDBConnection;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class BackupServiceTest extends TestCase {
	private ShoppingListMapper&MockObject $listMapper;
	private ShopAreaMapper&MockObject $areaMapper;
	private ItemMapper&MockObject $itemMapper;
	private ItemTagMapper&MockObject $itemTagMapper;
	private TagMapper&MockObject $tagMapper;
	private UserListPreferenceMapper&MockObject $preferenceMapper;
	private IDBConnection&MockObject $db;
	private BackupService $service;

	protected function setUp(): void {
		$this->listMapper = $this->createMock(ShoppingListMapper::class);
		$this->areaMapper = $this->createMock(ShopAreaMapper::class);
		$this->itemMapper = $this->createMock(ItemMapper::class);
		$this->itemTagMapper = $this->createMock(ItemTagMapper::class);
		$this->tagMapper = $this->createMock(TagMapper::class);
		$this->preferenceMapper = $this->createMock(UserListPreferenceMapper::class);
		$this->db = $this->createMock(IDBConnection::class);

		$this->service = new BackupService(
			$this->listMapper,
			$this->areaMapper,
			$this->itemMapper,
			$this->itemTagMapper,
			$this->tagMapper,
			$this->preferenceMapper,
			new BackupSerializer(),
			$this->db,
		);
	}

	public function testExportOnlyAsksForTheUsersOwnLists(): void {
		$this->listMapper->expects(self::once())
			->method('findAllByUser')
			->with('alice')
			->willReturn([]);
		$this->preferenceMapper->method('findAllByUser')->willReturn([]);
		$this->tagMapper->method('findByUser')->willReturn([]);

		$result = $this->service->export('alice');

		self::assertSame(1, $result['version']);
		self::assertSame([], $result['lists']);
	}

	public function testExportBuildsThePayloadForRealLists(): void {
		$weeklyShop = new ShoppingList();
		$weeklyShop->setId(7);
		$weeklyShop->setTitle('Weekly shop');

		$camping = new ShoppingList();
		$camping->setId(8);
		$camping->setTitle('Camping');

		$this->listMapper->method('findAllByUser')
			->with('alice')
			->willReturn([$weeklyShop, $camping]);

		// Only the camping list is pinned; the weekly shop list has no row
		// at all, which export() must still read as "not pinned".
		$pinned = new UserListPreference();
		$pinned->setListId(8);
		$pinned->setUserId('alice');
		$pinned->setIsPinned(true);
		$this->preferenceMapper->method('findAllByUser')->willReturn([8 => $pinned]);

		$tag = new Tag();
		$tag->setId(70);
		$tag->setName('organic');
		$this->tagMapper->method('findByUser')->willReturn([$tag]);

		$produce = new ShopArea();
		$produce->setId(20);
		$produce->setListId(7);
		$produce->setName('Produce');
		$produce->setSortOrder(0);
		$produce->setKeywordsArray([]);

		$gear = new ShopArea();
		$gear->setId(21);
		$gear->setListId(8);
		$gear->setName('Gear');
		$gear->setSortOrder(0);
		$gear->setKeywordsArray([]);

		$this->areaMapper->method('findByList')->willReturnMap([
			[7, [$produce]],
			[8, [$gear]],
		]);

		$milk = new Item();
		$milk->setId(30);
		$milk->setListId(7);
		$milk->setName('Milk');
		$milk->setShopAreaId(20);
		$milk->setChecked(false);
		$milk->setSortOrder(0);

		$this->itemMapper->method('findAllByList')->willReturnMap([
			[7, [$milk]],
			// Camping has no items at all.
			[8, []],
		]);

		// One call for the whole list's items, never one per item, and
		// never called at all for the list with no items.
		$this->itemTagMapper->expects(self::once())
			->method('findTagIdsByItems')
			->with([30])
			->willReturn([30 => [70]]);

		$result = $this->service->export('alice');

		self::assertCount(2, $result['lists']);
		[$weeklyShopPayload, $campingPayload] = $result['lists'];

		self::assertSame('Weekly shop', $weeklyShopPayload['title']);
		self::assertFalse($weeklyShopPayload['pinned']);
		self::assertSame('Produce', $weeklyShopPayload['areas'][0]['name']);
		self::assertSame('Milk', $weeklyShopPayload['items'][0]['name']);
		self::assertSame(['organic'], $weeklyShopPayload['items'][0]['tags']);

		self::assertSame('Camping', $campingPayload['title']);
		self::assertTrue($campingPayload['pinned']);
		self::assertSame('Gear', $campingPayload['areas'][0]['name']);
		self::assertSame([], $campingPayload['items']);
	}

	public function testImportCreatesTheListWithoutSeedingDefaultAreas(): void {
		$this->db->expects(self::once())->method('beginTransaction');
		$this->db->expects(self::once())->method('commit');

		$this->listMapper->expects(self::once())
			->method('insert')
			->willReturnCallback(function (ShoppingList $list): ShoppingList {
				self::assertSame('Weekly shop', $list->getTitle());
				self::assertSame('alice', $list->getUserId());

				$inserted = new ShoppingList();
				$inserted->setId(99);
				$inserted->setTitle($list->getTitle());
				$inserted->setUserId($list->getUserId());
				return $inserted;
			});

		$this->areaMapper->expects(self::once())
			->method('insert')
			->willReturnCallback(function (ShopArea $area): ShopArea {
				self::assertSame(99, $area->getListId());
				self::assertSame('Produce', $area->getName());
				// Stable English key for default areas, so a restored
				// default area is still translated live per viewer rather
				// than freezing into the exporting user's language.
				self::assertSame('Produce', $area->getNameKey());
				self::assertSame('9a3412', $area->getColor());
				self::assertSame(1, $area->getSortOrder());
				self::assertSame(['apple'], $area->getKeywordsArray());

				$inserted = new ShopArea();
				$inserted->setId(50);
				$inserted->setName($area->getName());
				return $inserted;
			});

		$this->itemMapper->expects(self::once())
			->method('insert')
			->willReturnCallback(function (Item $item): Item {
				self::assertSame(99, $item->getListId());
				self::assertSame('Milk', $item->getName());
				self::assertSame(50, $item->getShopAreaId());
				self::assertNull($item->getCheckedBy());
				// The fixture item carries no quantity at all, and a restore
				// must not invent one.
				self::assertNull($item->getQuantity());

				$inserted = new Item();
				$inserted->setId(60);
				return $inserted;
			});

		$tag = new Tag();
		$tag->setId(70);
		$tag->setName('organic');
		$this->tagMapper->method('findOrCreate')->willReturn($tag);
		$this->itemTagMapper->expects(self::once())
			->method('setTagsForItem')
			->with(60, [70]);

		$this->preferenceMapper->expects(self::once())
			->method('setPinned')
			->with('alice', 99, true);

		// The headline safety property: a restore only ever creates rows.
		foreach ([$this->listMapper, $this->areaMapper, $this->itemMapper] as $mapper) {
			$mapper->expects(self::never())->method('update');
			$mapper->expects(self::never())->method('delete');
		}

		$summary = $this->service->import('alice', [
			'version' => 1,
			'lists' => [[
				'title' => 'Weekly shop',
				'pinned' => true,
				'areas' => [[
					'name' => 'Produce', 'nameKey' => 'Produce',
					'color' => '9a3412', 'sortOrder' => 1, 'keywords' => ['apple'],
				]],
				'items' => [[
					'name' => 'Milk', 'area' => 'Produce', 'tags' => ['organic'],
				]],
			]],
		]);

		self::assertSame(['lists' => 1, 'areas' => 1, 'items' => 1], $summary);
	}

	public function testImportDedupesTagsThatTrimToTheSameName(): void {
		$this->db->method('beginTransaction');
		$this->db->method('commit');

		$this->listMapper->method('insert')->willReturnCallback(function (ShoppingList $list): ShoppingList {
			$inserted = new ShoppingList();
			$inserted->setId(99);
			$inserted->setTitle($list->getTitle());
			$inserted->setUserId($list->getUserId());
			return $inserted;
		});

		$this->itemMapper->method('insert')->willReturnCallback(function (Item $item): Item {
			$inserted = new Item();
			$inserted->setId(60);
			return $inserted;
		});

		$tag = new Tag();
		$tag->setId(70);
		$tag->setName('organic');
		// "organic" and "organic " both trim to the same name and resolve to
		// the same tag here, exactly as two real tag rows could.
		$this->tagMapper->method('findOrCreate')->willReturn($tag);

		// Without array_unique() in insertItem(), this would be called with
		// [70, 70], which shopping_list_itags' (item_id, tag_id) primary key
		// rejects and aborts the whole restore.
		$this->itemTagMapper->expects(self::once())
			->method('setTagsForItem')
			->with(60, [70]);

		$this->service->import('alice', [
			'version' => 1,
			'lists' => [[
				'title' => 'Weekly shop',
				'areas' => [],
				'items' => [[
					'name' => 'Milk', 'tags' => ['organic', 'organic '],
				]],
			]],
		]);
	}

	public function testImportRollsBackWhenTheFileIsBad(): void {
		$this->db->expects(self::once())->method('beginTransaction');
		$this->db->expects(self::once())->method('rollBack');
		$this->db->expects(self::never())->method('commit');
		$this->listMapper->expects(self::never())->method('insert');

		$this->expectException(\OCA\Shopping_List\Service\BackupFormatException::class);

		// Valid header, so parse() passes, but the second list has no title.
		$this->service->import('alice', [
			'version' => 1,
			'lists' => [
				['title' => 'Fine'],
				['areas' => []],
			],
		]);
	}
}
