<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * The app an item was added or ticked through ("Home Assistant"), sent by
 * the app itself and shown beside the item, while added_by and checked_by
 * still record the account behind it.
 */
class Version1014Date20261020000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$items = $schema->getTable('shopping_list_items');
		foreach (['added_via', 'checked_via'] as $column) {
			if (!$items->hasColumn($column)) {
				$items->addColumn($column, Types::STRING, [
					'notnull' => false,
					'default' => null,
					'length' => 64,
				]);
			}
		}

		return $schema;
	}
}
