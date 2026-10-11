<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Who added and who ticked each item, captured when it happens (a guest has
 * a name and no user id), and a per-link choice of showing members' names
 * on the public page.
 */
class Version1011Date20261004000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$items = $schema->getTable('shopping_list_items');
		foreach (['added_by', 'added_by_name', 'checked_by_name'] as $column) {
			if (!$items->hasColumn($column)) {
				$items->addColumn($column, Types::STRING, [
					'notnull' => false,
					'length' => 64,
					'default' => null,
				]);
			}
		}

		$shares = $schema->getTable('shopping_list_shares');
		if (!$shares->hasColumn('show_names')) {
			$shares->addColumn('show_names', Types::BOOLEAN, [
				'notnull' => false,
				'default' => null,
			]);
		}

		return $schema;
	}
}
