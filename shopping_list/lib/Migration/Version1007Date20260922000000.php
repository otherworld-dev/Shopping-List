<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Optional photo per item. The bytes live in the app's appdata folder as
 * images/{id}.jpg and images/{id}.thumb.jpg; the row only carries image_key,
 * a random 16-hex token that is rotated on every replace so image URLs are
 * immutable and can be cached for good. NULL means no photo.
 */
class Version1007Date20260922000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('shopping_list_items');

		if (!$table->hasColumn('image_key')) {
			$table->addColumn('image_key', Types::STRING, [
				'notnull' => false,
				'length' => 32,
			]);
		}

		return $schema;
	}
}
