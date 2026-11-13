<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Service\AmountMemory;
use OCA\Shopping_List\Service\ItemImageCleanup;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use OCP\IL10N;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** Copying an item to another list, leaving the original where it is. */
class ItemServiceCopyTest extends TestCase {
	private const KEY = 'abcdefabcdefabcd';

	private ItemMapper&MockObject $mapper;
	private ListService&MockObject $lists;
	private ShopAreaService&MockObject $areas;
	private PushService&MockObject $push;
	private ItemImageService&MockObject $images;
	private AmountMemory&MockObject $amounts;
	private ItemService $service;
	/** @var Item[] what the target list (6) holds */
	private array $target = [];

	protected function setUp(): void {
		$this->mapper = $this->createMock(ItemMapper::class);
		$this->mapper->method('insert')->willReturnCallback(function (Item $i) {
			$i->setId(99);
			return $i;
		});
		$this->mapper->method('update')->willReturnArgument(0);
		$this->mapper->method('findAllByList')->willReturnCallback(fn (int $listId) => $listId === 6 ? $this->target : []);
		$this->lists = $this->createMock(ListService::class);
		$this->areas = $this->createMock(ShopAreaService::class);
		$this->push = $this->createMock(PushService::class);
		$this->images = $this->createMock(ItemImageService::class);
		$this->amounts = $this->createMock(AmountMemory::class);
		$users = $this->createMock(IUserManager::class);
		$users->method('getDisplayName')->willReturnMap([['ben', 'Ben Jones']]);
		$l = $this->createMock(IL10N::class);
		$l->method('getLanguageCode')->willReturn('en');
		$this->service = new ItemService(
			$this->mapper,
			$this->lists,
			$this->areas,
			$this->push,
			$this->createMock(IDBConnection::class),
			$this->createMock(ItemImageCleanup::class),
			$this->images,
			$users,
			$this->amounts,
			$l,
		);
	}

	private function item(int $id, int $listId, string $name, ?string $quantity = '1', bool $checked = false): Item {
		$item = new Item();
		$item->setId($id);
		$item->setListId($listId);
		$item->setName($name);
		$item->setQuantity($quantity);
		$item->setChecked($checked);
		$item->setSortOrder(4);
		return $item;
	}

	/** Milk on list 5, in Dairy, ticked off by Sam, with a photo */
	private function source(): Item {
		$item = $this->item(42, 5, 'Milk', '2 pints');
		$item->setUnit('pints');
		$item->setShopAreaId(3);
		$item->setChecked(true);
		$item->setCheckedBy('sam');
		$item->setCheckedByName('Sam');
		$item->setAddedBy('sam');
		$item->setAddedByName('Sam');
		$item->setImageKey(self::KEY);
		$this->mapper->method('find')->willReturnCallback(function (int $id) use ($item) {
			if ($id === 42) {
				return $item;
			}
			foreach ($this->target as $t) {
				if ($t->getId() === $id) {
					return $t;
				}
			}
			throw new DoesNotExistException('');
		});
		return $item;
	}

	private function dairy(): void {
		$area = new ShopArea();
		$area->setName('Dairy');
		$this->areas->method('find')->with(3)->willReturn($area);
	}

	public function testTheCopyIsANewOpenItemAddedByTheUser(): void {
		$this->source();
		$this->dairy();
		$this->areas->method('findAreaForMove')->with(6, 'Dairy', 'Milk')->willReturn(12);
		$this->mapper->expects(self::once())->method('insert');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(6, 99, 'created', 'ben');

		$copy = $this->service->copy(42, 6, 'ben', 'Android');

		self::assertSame(99, $copy->getId());
		self::assertSame(6, $copy->getListId());
		self::assertSame('Milk', $copy->getName());
		self::assertSame('2 pints', $copy->getQuantity());
		self::assertSame('pints', $copy->getUnit());
		self::assertSame(12, $copy->getShopAreaId());
		self::assertFalse($copy->getChecked());
		self::assertNull($copy->getCheckedBy());
		self::assertSame('ben', $copy->getAddedBy());
		self::assertSame('Ben Jones', $copy->getAddedByName());
		self::assertSame('Android', $copy->getAddedVia());
		self::assertSame(0, $copy->getSortOrder());
	}

	public function testTheOriginalIsLeftAsItWas(): void {
		$source = $this->source();
		$this->dairy();
		$before = $source->jsonSerialize();
		// Only the copy is written; the source row is never updated
		$this->mapper->expects(self::never())->method('update');

		$this->service->copy(42, 6, 'ben');

		self::assertSame($before, $source->jsonSerialize());
	}

	public function testAnAreaThatIsGoneFallsBackToKeywordDetection(): void {
		$this->source();
		$this->areas->method('find')->willThrowException(new NotFoundException('gone'));
		$this->areas->expects(self::once())->method('findAreaForMove')->with(6, null, 'Milk')->willReturn(8);

		self::assertSame(8, $this->service->copy(42, 6, 'ben')->getShopAreaId());
	}

	public function testAnItemWithNoAreaUsesKeywordDetection(): void {
		$this->source()->setShopAreaId(null);
		$this->areas->expects(self::never())->method('find');
		$this->areas->expects(self::once())->method('findAreaForMove')->with(6, null, 'Milk')->willReturn(null);

		self::assertNull($this->service->copy(42, 6, 'ben')->getShopAreaId());
	}

	public function testTheCopySharesThePhoto(): void {
		$this->source();
		$this->images->expects(self::never())->method('rememberedKey');

		self::assertSame(self::KEY, $this->service->copy(42, 6, 'ben')->getImageKey());
	}

	public function testAnItemWithoutAPhotoPicksUpTheTargetListsPhoto(): void {
		$this->source()->setImageKey(null);
		$this->images->method('rememberedKey')->with(6, 'Milk')->willReturn('2222222222222222');

		self::assertSame('2222222222222222', $this->service->copy(42, 6, 'ben')->getImageKey());
	}

	public function testNoWriteAccessToTheTargetCopiesNothing(): void {
		$this->source();
		$this->lists->method('assertWriteAccess')->willReturnCallback(function (int $listId) {
			if ($listId === 6) {
				throw new NoPermissionException('No write access');
			}
		});
		$this->mapper->expects(self::never())->method('insert');
		$this->push->expects(self::never())->method('notifyItemUpdate');

		$this->expectException(NoPermissionException::class);
		$this->service->copy(42, 6, 'ben');
	}

	public function testNoWriteAccessToTheSourceCopiesNothing(): void {
		$this->source();
		$this->lists->method('assertWriteAccess')->willReturnCallback(function (int $listId) {
			if ($listId === 5) {
				throw new NoPermissionException('No write access');
			}
		});
		$this->mapper->expects(self::never())->method('insert');

		$this->expectException(NoPermissionException::class);
		$this->service->copy(42, 6, 'ben');
	}

	public function testAMissingItemIsNotFound(): void {
		$this->mapper->method('find')->willThrowException(new DoesNotExistException(''));

		$this->expectException(NotFoundException::class);
		$this->service->copy(404, 6, 'ben');
	}

	public function testCopyingToTheSameListChangesNothing(): void {
		$source = $this->source();
		$this->mapper->expects(self::never())->method('insert');
		$this->mapper->expects(self::never())->method('update');
		$this->push->expects(self::never())->method('notifyItemUpdate');

		self::assertSame($source, $this->service->copy(42, 5, 'ben'));
	}

	public function testAnOpenItemOfTheSameNameTakesTheAmountOnTop(): void {
		$source = $this->source();
		$source->setQuantity('2');
		$source->setUnit(null);
		$source->setName('Lemon');
		$this->target = [$this->item(50, 6, 'lemon', '1')];
		$this->mapper->expects(self::never())->method('insert');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(6, 50, 'updated', 'ben');
		// A sum, not something typed, so it isn't remembered for the name
		$this->amounts->expects(self::never())->method('remember');

		$merged = $this->service->copy(42, 6, 'ben');

		self::assertSame(50, $merged->getId());
		self::assertSame('3', $merged->getQuantity());
		// One going to more than one is pluralised, as in the add box
		self::assertSame('lemons', $merged->getName());
	}

	public function testATickedOffItemOfTheSameNameComesBackWithTheAmount(): void {
		$this->source();
		$ticked = $this->item(51, 6, 'Milk', '1', true);
		$ticked->setCheckedBy('sam');
		$ticked->setCheckedByName('Sam');
		$this->target = [$ticked];
		$this->mapper->expects(self::never())->method('insert');
		$this->push->expects(self::once())->method('notifyItemUpdate')->with(6, 51, 'updated', 'ben');

		$restored = $this->service->copy(42, 6, 'ben');

		self::assertSame(51, $restored->getId());
		self::assertFalse($restored->getChecked());
		self::assertNull($restored->getCheckedBy());
		self::assertSame('2 pints', $restored->getQuantity());
	}
}
