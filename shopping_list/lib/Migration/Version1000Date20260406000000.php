<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version1000Date20260406000000 extends SimpleMigrationStep {
	public function __construct(
		private IDBConnection $db,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		// Lists
		if (!$schema->hasTable('shopping_list_lists')) {
			$table = $schema->createTable('shopping_list_lists');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('title', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['user_id'], 'sl_lists_user_idx');
		}

		// Items
		if (!$schema->hasTable('shopping_list_items')) {
			$table = $schema->createTable('shopping_list_items');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('name', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('quantity', Types::STRING, [
				'notnull' => false,
				'length' => 32,
			]);
			$table->addColumn('unit', Types::STRING, [
				'notnull' => false,
				'length' => 32,
			]);
			$table->addColumn('shop_area_id', Types::INTEGER, [
				'notnull' => false,
				'unsigned' => true,
			]);
			$table->addColumn('checked', Types::BOOLEAN, [
				'notnull' => true,
				'default' => false,
			]);
			$table->addColumn('checked_by', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('sort_order', Types::INTEGER, [
				'notnull' => true,
				'default' => 0,
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['list_id'], 'sl_items_list_idx');
			$table->addIndex(['list_id', 'sort_order'], 'sl_items_sort_idx');
		}

		// Shares
		if (!$schema->hasTable('shopping_list_shares')) {
			$table = $schema->createTable('shopping_list_shares');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('list_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('shared_with', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('shared_with_type', Types::SMALLINT, [
				'notnull' => true,
				'comment' => '0=user, 1=group',
			]);
			$table->addColumn('permission', Types::SMALLINT, [
				'notnull' => true,
				'comment' => '0=read, 1=write',
			]);
			$table->addColumn('shared_by', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['list_id', 'shared_with', 'shared_with_type'], 'sl_shares_uq');
			$table->addIndex(['shared_with', 'shared_with_type'], 'sl_shares_recipient_idx');
		}

		// Shop Areas
		if (!$schema->hasTable('shopping_list_shop_areas')) {
			$table = $schema->createTable('shopping_list_shop_areas');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('name', Types::STRING, [
				'notnull' => true,
				'length' => 128,
			]);
			$table->addColumn('sort_order', Types::INTEGER, [
				'notnull' => true,
				'default' => 0,
			]);
			$table->addColumn('color', Types::STRING, [
				'notnull' => false,
				'length' => 7,
				'comment' => 'hex color e.g. #FF5733',
			]);
			$table->addColumn('keywords', Types::TEXT, [
				'notnull' => false,
				'comment' => 'JSON array of keyword strings',
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['user_id'], 'sl_areas_user_idx');
		}

		// Tags
		if (!$schema->hasTable('shopping_list_tags')) {
			$table = $schema->createTable('shopping_list_tags');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('name', Types::STRING, [
				'notnull' => true,
				'length' => 128,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['name', 'user_id'], 'sl_tags_uq');
		}

		// Item Tags (many-to-many)
		if (!$schema->hasTable('shopping_list_item_tags')) {
			$table = $schema->createTable('shopping_list_item_tags');
			$table->addColumn('item_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('tag_id', Types::INTEGER, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['item_id', 'tag_id']);
			$table->addIndex(['tag_id'], 'sl_itag_tag_idx');
		}

		return $schema;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		// Default shop areas are seeded per-user when they create their first list.
	}
}
