<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use DateTime;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Service\ListOrder;
use PHPUnit\Framework\TestCase;

class ListOrderTest extends TestCase {
	private function list(int $id, string $title, string $updated, bool $owner = true, ?bool $pinned = null, ?int $position = null): ShoppingList {
		$list = new ShoppingList();
		$list->setId($id);
		$list->setTitle($title);
		$list->setUpdatedAt(new DateTime($updated));
		$list->setIsOwner($owner);
		$list->setIsPinned($pinned);
		$list->setPosition($position);
		return $list;
	}

	/** @param ShoppingList[] $lists */
	private function ids(array $lists): array {
		return array_map(fn (ShoppingList $l) => $l->getId(), $lists);
	}

	public function testPinnedThenOwnedThenSharedWhateverTheMode(): void {
		$lists = [
			$this->list(1, 'Shared', '2026-09-26 12:00', owner: false),
			$this->list(2, 'Owned', '2026-09-20 12:00'),
			$this->list(3, 'Pinned', '2026-09-01 12:00', pinned: true),
		];
		foreach (ListOrder::MODES as $mode) {
			self::assertSame([3, 2, 1], $this->ids(ListOrder::sort($lists, $mode)), $mode);
		}
	}

	public function testRecentlyUpdatedPutsTheNewestFirst(): void {
		$lists = [
			$this->list(1, 'Old', '2026-09-01 12:00'),
			$this->list(2, 'New', '2026-09-26 12:00'),
			$this->list(3, 'Middle', '2026-09-10 12:00'),
		];
		self::assertSame([2, 3, 1], $this->ids(ListOrder::sort($lists, ListOrder::UPDATED)));
	}

	public function testAToZIgnoresCase(): void {
		$lists = [
			$this->list(1, 'weekend', '2026-09-26 12:00'),
			$this->list(2, 'Bakery', '2026-09-01 12:00'),
			$this->list(3, 'apples', '2026-09-10 12:00'),
		];
		self::assertSame([3, 2, 1], $this->ids(ListOrder::sort($lists, ListOrder::ALPHA)));
	}

	public function testAToZIgnoresCaseInAccentedTitlesToo(): void {
		$lists = [
			$this->list(1, 'Äpfel', '2026-09-26 12:00'),
			$this->list(2, 'äpfel', '2026-09-01 12:00'),
			$this->list(3, 'Öl', '2026-09-20 12:00'),
			$this->list(4, 'öl', '2026-09-15 12:00'),
		];
		// Äpfel/äpfel are equal, tie-broken by ID (1, 2); Öl/öl are equal, tie-broken by ID (3, 4)
		self::assertSame([1, 2, 3, 4], $this->ids(ListOrder::sort($lists, ListOrder::ALPHA)));
	}

	public function testCustomPutsUnplacedListsFirstNewestFirstThenByPosition(): void {
		$lists = [
			$this->list(1, 'Second', '2026-09-01 12:00', position: 1),
			$this->list(2, 'First', '2026-09-02 12:00', position: 0),
			$this->list(3, 'New', '2026-09-26 12:00'),
			$this->list(4, 'Older new', '2026-09-20 12:00'),
		];
		self::assertSame([3, 4, 2, 1], $this->ids(ListOrder::sort($lists, ListOrder::CUSTOM)));
	}

	public function testTiesGoByIdSoTheOrderIsStable(): void {
		$lists = [
			$this->list(5, 'Same', '2026-09-01 12:00', position: 0),
			$this->list(4, 'same', '2026-09-01 12:00', position: 0),
		];
		foreach (ListOrder::MODES as $mode) {
			self::assertSame([4, 5], $this->ids(ListOrder::sort($lists, $mode)), $mode);
		}
	}

	public function testAnUnknownModeReadsAsRecentlyUpdated(): void {
		self::assertSame(ListOrder::UPDATED, ListOrder::normalise('price'));
		self::assertSame(ListOrder::UPDATED, ListOrder::normalise(null));
		self::assertSame(ListOrder::CUSTOM, ListOrder::normalise('custom'));
	}
}
