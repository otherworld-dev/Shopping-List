<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Service\BackupSerializer;
use PHPUnit\Framework\TestCase;

class BackupSerializerTest extends TestCase {
	private BackupSerializer $serializer;

	protected function setUp(): void {
		$this->serializer = new BackupSerializer();
	}

	public function testSerializeProducesTheDocumentedShape(): void {
		$list = new ShoppingList();
		$list->setId(7);
		$list->setTitle('Weekly shop');
		$list->setCreatedAt(new DateTime('2026-04-06T18:00:00+00:00'));
		$list->setUpdatedAt(new DateTime('2026-09-20T19:20:00+00:00'));

		$area = new ShopArea();
		$area->setId(20);
		$area->setListId(7);
		$area->setName('Produce');
		$area->setNameKey('Produce');
		$area->setColor('9a3412');
		$area->setSortOrder(1);
		$area->setKeywordsArray(['apple', 'banana']);

		$item = new Item();
		$item->setId(30);
		$item->setListId(7);
		$item->setName('Milk');
		$item->setQuantity('2');
		$item->setUnit('l');
		$item->setShopAreaId(20);
		$item->setChecked(false);
		$item->setSortOrder(3);
		$item->setCreatedAt(new DateTime('2026-09-01T08:00:00+00:00'));
		$item->setUpdatedAt(new DateTime('2026-09-01T08:00:00+00:00'));

		$result = $this->serializer->serialize(
			[$list],
			[7 => [$area]],
			[7 => [$item]],
			[30 => ['organic']],
			[7 => true],
			new DateTime('2026-09-21T09:15:00+00:00'),
		);

		self::assertSame(1, $result['version']);
		self::assertSame('2026-09-21T09:15:00+00:00', $result['exportedAt']);
		self::assertCount(1, $result['lists']);

		$exported = $result['lists'][0];
		self::assertSame('Weekly shop', $exported['title']);
		self::assertTrue($exported['pinned']);
		self::assertSame([
			'name' => 'Produce',
			'nameKey' => 'Produce',
			'color' => '9a3412',
			'sortOrder' => 1,
			'keywords' => ['apple', 'banana'],
		], $exported['areas'][0]);
		self::assertSame('Milk', $exported['items'][0]['name']);
		self::assertSame('Produce', $exported['items'][0]['area']);
		self::assertSame(['organic'], $exported['items'][0]['tags']);
	}

	public function testItemWithNoAreaSerialisesAsNull(): void {
		$list = new ShoppingList();
		$list->setId(7);
		$list->setTitle('Weekly shop');
		$list->setCreatedAt(new DateTime('2026-04-06T18:00:00+00:00'));
		$list->setUpdatedAt(new DateTime('2026-04-06T18:00:00+00:00'));

		$item = new Item();
		$item->setId(31);
		$item->setListId(7);
		$item->setName('Batteries');
		$item->setChecked(false);
		$item->setSortOrder(0);
		$item->setCreatedAt(new DateTime('2026-09-01T08:00:00+00:00'));
		$item->setUpdatedAt(new DateTime('2026-09-01T08:00:00+00:00'));

		$result = $this->serializer->serialize(
			[$list], [7 => []], [7 => [$item]], [], [], new DateTime(),
		);

		self::assertNull($result['lists'][0]['items'][0]['area']);
		self::assertFalse($result['lists'][0]['pinned']);
		self::assertSame([], $result['lists'][0]['items'][0]['tags']);
	}

	public function testExportCarriesNoDatabaseIds(): void {
		$list = new ShoppingList();
		$list->setId(7);
		$list->setTitle('Weekly shop');
		$list->setCreatedAt(new DateTime());
		$list->setUpdatedAt(new DateTime());

		$area = new ShopArea();
		$area->setId(20);
		$area->setListId(7);
		$area->setName('Produce');
		$area->setSortOrder(1);
		$area->setKeywordsArray([]);

		$result = $this->serializer->serialize(
			[$list], [7 => [$area]], [7 => []], [], [], new DateTime(),
		);

		self::assertSame([], $this->findKeys($result, ['id', 'listId', 'list_id', 'userId', 'user_id', 'shopAreaId']));
	}

	/**
	 * Every occurrence of the given keys, at any depth. Keeping ids out of the
	 * file is what makes an import unable to touch another user's rows, so it
	 * is asserted rather than assumed.
	 *
	 * @param string[] $needles
	 * @return string[]
	 */
	private function findKeys(array $data, array $needles): array {
		$found = [];
		foreach ($data as $key => $value) {
			if (in_array((string)$key, $needles, true)) {
				$found[] = (string)$key;
			}
			if (is_array($value)) {
				$found = array_merge($found, $this->findKeys($value, $needles));
			}
		}
		return array_values(array_unique($found));
	}
}
