<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\PhotoMapper;

/**
 * Deletes photo files once nothing uses them. A photo is in use while an item
 * shows it or a remembered photo row points at it, so emptying a list keeps
 * the files and a later item with the same name can show them again. Callers
 * hand over the keys they just let go of, after their rows have changed.
 */
class ItemImageCleanup {
	public function __construct(
		private ItemMapper $items,
		private PhotoMapper $photos,
		private ItemImageStorage $storage,
	) {
	}

	/** @param array<?string> $imageKeys keys that may have lost their last user; nulls and repeats are fine */
	public function release(array $imageKeys): void {
		$unused = [];
		foreach (array_unique(array_filter($imageKeys, fn ($k) => $k !== null && $k !== '')) as $key) {
			if (!$this->items->hasImageKey($key) && !$this->photos->hasImageKey($key)) {
				$unused[] = $key;
			}
		}
		if ($unused !== []) {
			$this->storage->deleteMany($unused);
		}
	}
}
