<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/**
 * php.ini sizes. OCP\Util::uploadLimit() and humanFileSize() exist, but they
 * hand off to OC_Helper, which is private and absent from the OCP stubs the
 * unit tests run against, so the little arithmetic is done here.
 */
class IniSize {
	/**
	 * Bytes for a php.ini shorthand such as "512M". Null when unlimited
	 * ("-1"), empty, or not set at all (ini_get returns false).
	 */
	public static function bytes(string|false $value): ?int {
		if ($value === false) {
			return null;
		}
		$value = trim($value);
		if ($value === '' || $value === '-1') {
			return null;
		}
		$number = (int)$value;
		return match (strtolower(substr($value, -1))) {
			'g' => $number * 1024 * 1024 * 1024,
			'm' => $number * 1024 * 1024,
			'k' => $number * 1024,
			default => $number,
		};
	}

	/** The smaller of upload_max_filesize and post_max_size, or null when neither limits. */
	public static function uploadLimit(): ?int {
		$limits = array_filter([
			self::bytes(ini_get('upload_max_filesize')),
			self::bytes(ini_get('post_max_size')),
		], static fn (?int $v) => $v !== null && $v > 0);
		return $limits === [] ? null : min($limits);
	}

	/** "10 MB" style label for messages. */
	public static function human(int $bytes): string {
		if ($bytes >= 1024 * 1024 * 1024) {
			return self::trim($bytes / (1024 * 1024 * 1024)) . ' GB';
		}
		if ($bytes >= 1024 * 1024) {
			return self::trim($bytes / (1024 * 1024)) . ' MB';
		}
		if ($bytes >= 1024) {
			return self::trim($bytes / 1024) . ' KB';
		}
		return $bytes . ' bytes';
	}

	private static function trim(float $value): string {
		return rtrim(rtrim(number_format($value, 1, '.', ''), '0'), '.');
	}
}
