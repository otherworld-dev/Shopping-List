<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Amount;
use OCA\Shopping_List\Db\AmountMapper;
use OCP\DB\Exception as DbException;

/**
 * The amount each item name was last given in a list, so adding "Rice" on
 * its own brings back the "500 g" it had last time. Only amounts somebody
 * actually typed are remembered: the caller decides that, because a client
 * that fills in "1" by itself must not wipe out a real amount.
 */
class AmountMemory {
	/** Matches the items table's quantity column. */
	private const QUANTITY_LENGTH = 32;

	public function __construct(
		private AmountMapper $amounts,
	) {
	}

	/** The amount last typed for this name in this list, or null for none. */
	public function recall(int $listId, string $name): ?string {
		$nameKey = ItemImageService::nameKey($name);
		if ($nameKey === '') {
			return null;
		}
		return $this->amounts->findForList($listId, $nameKey)?->getQuantity();
	}

	/**
	 * Remember a typed amount for this name in this list. Clearing the
	 * amount forgets it, so the name goes back to the plain default.
	 */
	public function remember(int $listId, string $name, ?string $quantity): void {
		$nameKey = ItemImageService::nameKey($name);
		if ($nameKey === '') {
			return;
		}
		$quantity = mb_substr(trim($quantity ?? ''), 0, self::QUANTITY_LENGTH);

		$amount = $this->amounts->findForList($listId, $nameKey);
		if ($quantity === '') {
			if ($amount !== null) {
				$this->amounts->delete($amount);
			}
			return;
		}

		if ($amount === null) {
			$amount = new Amount();
			$amount->setListId($listId);
			$amount->setNameKey($nameKey);
			$amount->setQuantity($quantity);
			$amount->setUpdatedAt(new DateTime());
			try {
				$this->amounts->insert($amount);
				return;
			} catch (DbException $e) {
				if ($e->getReason() !== DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
					throw $e;
				}
				// Somebody else added the same name at the same moment.
				$amount = $this->amounts->findForList($listId, $nameKey);
				if ($amount === null) {
					throw $e;
				}
			}
		}
		$amount->setQuantity($quantity);
		$amount->setUpdatedAt(new DateTime());
		$this->amounts->update($amount);
	}
}
