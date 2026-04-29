<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add public link share support: token, password_hash, expires_at columns on shares table.
 */
class Version1003Date20260428000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('shopping_list_shares');

		if (!$table->hasColumn('token')) {
			$table->addColumn('token', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
		}

		if (!$table->hasColumn('password_hash')) {
			$table->addColumn('password_hash', Types::STRING, [
				'notnull' => false,
				'length' => 255,
			]);
		}

		if (!$table->hasColumn('expires_at')) {
			$table->addColumn('expires_at', Types::DATETIME, [
				'notnull' => false,
			]);
		}

		if (!$table->hasIndex('sl_shares_token_idx')) {
			$table->addUniqueIndex(['token'], 'sl_shares_token_idx');
		}

		return $schema;
	}
}
