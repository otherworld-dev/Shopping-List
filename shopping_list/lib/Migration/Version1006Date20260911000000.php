<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Per-user preferences for a list, starting with whether it is pinned.
 *
 * One row per (user, list), created the first time the user pins or unpins
 * that list. Rows are removed with the list in ListService::cascadeDelete.
 */
class Version1006Date20260911000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('shopping_list_prefs')) {
			$table = $schema->createTable('shopping_list_prefs');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('is_pinned', Types::BOOLEAN, [
				'notnull' => false,
				'default' => false,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['user_id', 'list_id'], 'sl_prefs_uq');
			$table->addIndex(['list_id'], 'sl_prefs_list_idx');
		}

		return $schema;
	}
}
