<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/**
 * The optional name a guest on a public link gives, tidied for showing next
 * to items. Anything unusable becomes no name instead of an error, so a
 * strange name never stops the item being added.
 */
final class GuestName {
	public const MAX_LENGTH = 40;

	public static function clean(mixed $input): ?string {
		if (!is_string($input) || !mb_check_encoding($input, 'UTF-8')) {
			return null;
		}
		// Whitespace first, so a newline becomes a space before \p{C} would drop it
		$name = (string)preg_replace('/\s+/u', ' ', $input);
		$name = trim((string)preg_replace('/\p{C}+/u', '', $name));
		$name = trim(mb_substr($name, 0, self::MAX_LENGTH));
		return $name === '' ? null : $name;
	}
}
