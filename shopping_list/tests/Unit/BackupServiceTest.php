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

	public function testImportCreatesTheListWithoutSeedingDefaultAreas(): void {
		$this->db->expects(self::once())->method('beginTransaction');
		$this->db->expects(self::once())->method('commit');

		$inserted = new ShoppingList();
		$inserted->setId(99);
		$inserted->setTitle('Weekly shop');
		$inserted->setUserId('alice');

		$this->listMapper->expects(self::once())
			->method('insert')
			->willReturn($inserted);

		$area = new ShopArea();
		$area->setId(50);
		$area->setName('Produce');
		$this->areaMapper->expects(self::once())
			->method('insert')
			->willReturn($area);

		$item = new Item();
		$item->setId(60);
		$this->itemMapper->expects(self::once())
			->method('insert')
			->willReturn($item);

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
