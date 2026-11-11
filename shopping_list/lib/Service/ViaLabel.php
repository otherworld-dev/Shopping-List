<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/**
 * The name of the app a change came through, from the X-Shopping-List-Via
 * header ("Home Assistant"). Tidied the same way as a guest's name, as it
 * shows in the same place beside an item; anything unusable means no label.
 */
final class ViaLabel {
	public const HEADER = 'X-Shopping-List-Via';

	public static function clean(mixed $input): ?string {
		return GuestName::clean($input);
	}
}
