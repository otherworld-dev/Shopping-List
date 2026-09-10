<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Create user_list_preferences table for storing per-user pin state.
 */
class Version1006Date20260910000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('shopping_list_user_prefs')) {
			$table = $schema->createTable('shopping_list_user_prefs');
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('is_pinned', Types::BOOLEAN, [
				'notnull' => true,
				'default' => false,
			]);

			$table->setPrimaryKey(['user_id', 'list_id']);
			$table->addIndex(['user_id'], 'shopping_list_user_prefs_uid');
			$table->addForeignKeyConstraint(
				$schema->getTable('shopping_list_lists'),
				['list_id'],
				['id'],
				['onDelete' => 'CASCADE'],
				'shopping_list_user_prefs_list_fk'
			);
		}

		return $schema;
	}
}
