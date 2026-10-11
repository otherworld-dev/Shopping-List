<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/** What ImageProcessor makes of an upload: two JPEGs and the size of the large one. */
class ProcessedImage {
	public function __construct(
		public readonly string $full,
		public readonly string $thumb,
		public readonly int $width,
		public readonly int $height,
	) {
	}
}
