<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

// nextcloud/ocp carries the OCP namespace but declares no autoload section of
// its own, so composer's autoloader does not know about it. Register it by
// hand. These are real implementations, not empty stubs, which is what lets
// the entities and the serializer be exercised without a running server.
spl_autoload_register(static function (string $class): void {
	if (!str_starts_with($class, 'OCP\\')) {
		return;
	}
	$path = __DIR__ . '/../vendor/nextcloud/ocp/' . str_replace('\\', '/', $class) . '.php';
	if (file_exists($path)) {
		require_once $path;
	}
});
