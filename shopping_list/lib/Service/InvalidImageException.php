<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

/** The upload is not an image this server can read. Answered with 415. */
class InvalidImageException extends \Exception {
}
