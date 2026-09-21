<?php

declare(strict_types=1);

namespace {
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
}

namespace Doctrine\DBAL {
	// nextcloud/ocp's interfaces type-hint against doctrine/dbal (e.g.
	// IQueryBuilder::PARAM_STR resolves to ParameterType::STRING), but the
	// composer package doctrine/dbal is never installed here: nextcloud/ocp
	// declares no dependency on it, since a real Nextcloud server already has
	// it loaded. PHPUnit's mock generator resolves default parameter values
	// eagerly (e.g. IDBConnection::quote()'s $type = IQueryBuilder::PARAM_STR),
	// which forces this class to load the moment IDBConnection is mocked. A
	// minimal stand-in with the right case names is enough: nothing under
	// test executes a real query, so the actual values never matter. Guarded
	// with class_exists() rather than enum_exists(), because the shape
	// differs by dbal version: nextcloud/ocp pins dbal 3.x, where
	// ParameterType/ArrayParameterType are plain classes of int constants,
	// and only dbal 4 turned them into enums. class_exists() is true for
	// both shapes, so the guard is a correct no-op whichever one ever gets
	// installed for real; enum_exists() would be false for the dbal-3 class
	// and this block would then fatal by redeclaring the name.
	if (!class_exists(ParameterType::class)) {
		enum ParameterType {
			case NULL;
			case INTEGER;
			case STRING;
			case LARGE_OBJECT;
		}
	}

	if (!class_exists(ArrayParameterType::class)) {
		enum ArrayParameterType {
			case INTEGER;
			case STRING;
		}
	}
}

namespace Doctrine\DBAL\Types {
	if (!class_exists(Types::class)) {
		class Types {
			public const BOOLEAN = 'boolean';
		}
	}
}
