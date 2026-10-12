<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * A list's default shop area: where a new item goes when no keyword puts it
 * anywhere. It belongs to the list, so everyone on it gets the same one.
 */
class Version1013Date20261012000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$lists = $schema->getTable('shopping_list_lists');
		if (!$lists->hasColumn('default_area_id')) {
			$lists->addColumn('default_area_id', Types::INTEGER, [
				'notnull' => false,
				'default' => null,
			]);
		}

		return $schema;
	}
}
