<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Finalize list-scoped areas: make list_id NOT NULL, drop user_id, update indexes.
 */
class Version1002Date20260411000001 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('shopping_list_areas');

		// Make list_id NOT NULL now that data is migrated
		$column = $table->getColumn('list_id');
		$column->setNotnull(true);

		// Drop old user_id column and its index
		if ($table->hasIndex('sl_areas_user_idx')) {
			$table->dropIndex('sl_areas_user_idx');
		}
		if ($table->hasColumn('user_id')) {
			$table->dropColumn('user_id');
		}

		// Add index on list_id
		$table->addIndex(['list_id'], 'sl_areas_list_idx');

		return $schema;
	}
}
