<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/** The upload is over the byte, pixel or memory limit. Answered with 413. Catch before InvalidImageException. */
class ImageTooLargeException extends InvalidImageException {
}
