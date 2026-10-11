<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use Exception;

/**
 * A backup file that cannot be read. Thrown before anything is written, so a
 * bad file never leaves rows behind.
 */
class BackupFormatException extends Exception {
}
