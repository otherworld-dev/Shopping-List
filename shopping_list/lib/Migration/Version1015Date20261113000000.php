<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Items added to a shared list that the other people on it are to be told
 * about, one row per item per person. Rows wait here for the background job
 * that sends one notification per list, then stay while that notification is
 * unread so the next adds can be folded into it.
 */
class Version1015Date20261113000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('shopping_list_added')) {
			$table = $schema->createTable('shopping_list_added');
			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('actor', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('item_name', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('notified', Types::BOOLEAN, [
				'notnull' => false,
				'default' => false,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['list_id', 'user_id'], 'sl_added_list_user_idx');
			$table->addIndex(['user_id'], 'sl_added_user_idx');
		}

		return $schema;
	}
}
