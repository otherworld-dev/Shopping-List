<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\Item;

/** The item a line of text ended up as, and whether it was new, topped up or brought back. */
final class TextAddResult {
	public const CREATED = 'created';
	public const MERGED = 'merged';
	public const RESTORED = 'restored';

	public function __construct(
		public readonly Item $item,
		public readonly string $outcome,
	) {
	}
}
