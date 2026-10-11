<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Remembered amounts: one row per list and item name, holding the amount
 * last typed for that name in that list ("500 g", "25 dag"). An item added
 * by its name alone gets it back, after the earlier item is long gone.
 * name_key is the item name trimmed and lower-cased, as for photos.
 */
class Version1012Date20261011000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('shopping_list_amounts')) {
			$table = $schema->createTable('shopping_list_amounts');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('name_key', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('quantity', Types::STRING, [
				'notnull' => true,
				'length' => 32,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['list_id', 'name_key'], 'sl_amounts_uq');
		}

		return $schema;
	}
}
