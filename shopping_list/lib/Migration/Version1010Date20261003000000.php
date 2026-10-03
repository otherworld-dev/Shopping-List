<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * A short invite code for each public link, so a guest can join in the
 * Android app without the long token. Null for user and group shares, and
 * for links made before this until the Share dialog next opens.
 */
class Version1010Date20261003000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('shopping_list_shares');
		if (!$table->hasColumn('code')) {
			$table->addColumn('code', Types::STRING, [
				'notnull' => false,
				'length' => 8,
				'default' => null,
			]);
		}
		if (!$table->hasIndex('shopping_list_shares_code')) {
			$table->addUniqueIndex(['code'], 'shopping_list_shares_code');
		}

		return $schema;
	}
}
