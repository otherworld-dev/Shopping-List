<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/**
 * Short codes a guest can type into the Android app instead of a link's
 * 64-character token. Eight symbols from an alphabet without look-alikes
 * (no 0/O or 1/I/L) give about 850 billion codes.
 */
final class InviteCode {
	public const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
	public const LENGTH = 8;

	public static function generate(): string {
		$code = '';
		$last = strlen(self::ALPHABET) - 1;
		for ($i = 0; $i < self::LENGTH; $i++) {
			$code .= self::ALPHABET[random_int(0, $last)];
		}
		return $code;
	}

	/** A typed code in its stored form, or null when it can't be one. */
	public static function normalise(string $input): ?string {
		$code = strtoupper((string)preg_replace('/[\s-]+/', '', $input));
		return preg_match('/^[' . self::ALPHABET . ']{' . self::LENGTH . '}$/', $code) === 1 ? $code : null;
	}
}
