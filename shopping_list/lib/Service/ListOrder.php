<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ShoppingList;

/**
 * How one user's lists are ordered: pinned first, then their own, then the
 * ones shared with them, each sorted by the mode they chose. The web app's
 * utils/listSort.ts and the Android app follow the same rules.
 */
final class ListOrder {
	public const UPDATED = 'updated';
	public const ALPHA = 'alpha';
	public const CUSTOM = 'custom';
	public const MODES = [self::UPDATED, self::ALPHA, self::CUSTOM];

	public static function normalise(?string $mode): string {
		return in_array($mode, self::MODES, true) ? $mode : self::UPDATED;
	}

	/**
	 * @param ShoppingList[] $lists with isOwner, isPinned and position set for the user
	 * @return ShoppingList[]
	 */
	public static function sort(array $lists, string $mode): array {
		$mode = self::normalise($mode);
		usort($lists, function (ShoppingList $a, ShoppingList $b) use ($mode): int {
			$section = self::section($a) <=> self::section($b);
			if ($section !== 0) {
				return $section;
			}
			$byMode = match ($mode) {
				self::ALPHA => strcmp(mb_strtolower((string)$a->getTitle()), mb_strtolower((string)$b->getTitle())),
				self::CUSTOM => self::byPosition($a, $b),
				default => self::newestFirst($a, $b),
			};
			return $byMode !== 0 ? $byMode : $a->getId() <=> $b->getId();
		});
		return $lists;
	}

	private static function section(ShoppingList $list): int {
		if ($list->getIsPinned() === true) {
			return 0;
		}
		return $list->getIsOwner() ? 1 : 2;
	}

	private static function newestFirst(ShoppingList $a, ShoppingList $b): int {
		return ($b->getUpdatedAt()?->getTimestamp() ?? 0) <=> ($a->getUpdatedAt()?->getTimestamp() ?? 0);
	}

	/** A list never placed goes on top, the newest of those first. */
	private static function byPosition(ShoppingList $a, ShoppingList $b): int {
		$pa = $a->getPosition();
		$pb = $b->getPosition();
		if ($pa === null && $pb === null) {
			return self::newestFirst($a, $b);
		}
		if ($pa === null) {
			return -1;
		}
		if ($pb === null) {
			return 1;
		}
		return $pa <=> $pb;
	}
}
