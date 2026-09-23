<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCP\AppFramework\Http;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\Files\SimpleFS\ISimpleFile;

/**
 * How a stored item photo goes out. The URL carries the item's current image
 * key, which changes on every replace, so the browser may keep the bytes for
 * a year without asking again. FileDisplayResponse sets no Content-Type of
 * its own and Nextcloud adds nosniff, so the type goes on here. The cache
 * header is written directly rather than through cacheFor(), which reaches
 * for the server container and so cannot run in a unit test.
 */
trait ItemImageResponseTrait {
	protected function imageResponse(ISimpleFile $file): FileDisplayResponse {
		return new FileDisplayResponse($file, Http::STATUS_OK, [
			'Content-Type' => 'image/jpeg',
			'Cache-Control' => 'private, max-age=31536000, immutable',
		]);
	}
}
