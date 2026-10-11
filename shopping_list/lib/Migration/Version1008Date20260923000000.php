<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Remembered photos: one row per user and item name, pointing at the image
 * key of the photo that user last took for that name. Items still carry the
 * key of the photo they show; this is what brings a photo back when an item
 * with the same name is added again, in any list the user can edit. The
 * files are images/{image_key}.jpg and .thumb.jpg in appdata, and name_key
 * is the item name trimmed and lower-cased.
 */
class Version1008Date20260923000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('shopping_list_photos')) {
			$table = $schema->createTable('shopping_list_photos');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('name_key', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('image_key', Types::STRING, [
				'notnull' => true,
				'length' => 32,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['user_id', 'name_key'], 'sl_photos_uq');
			$table->addIndex(['image_key'], 'sl_photos_key_idx');
		}

		return $schema;
	}
}
