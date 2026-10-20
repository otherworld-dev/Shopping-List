<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Listener;

use OCP\DB\Events\AddMissingColumnsEvent;
use OCP\DB\Types;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;

/**
 * Tells Nextcloud which columns the app's migrations add to tables that
 * already exist, so `occ db:add-missing-columns` can put one back and the
 * admin overview warns about it. On one server (#56) a migration was
 * recorded as run without its column being added, leaving the app broken
 * until the column was made by hand. All of these are nullable, so adding
 * one to existing rows is always safe.
 *
 * @template-implements IEventListener<AddMissingColumnsEvent>
 */
class MissingColumnsListener implements IEventListener {
	/** table => column => [type, options], as each migration adds it */
	private const COLUMNS = [
		'shopping_list_shares' => [
			'token' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
			'password_hash' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 255]],
			'expires_at' => [Types::DATETIME, ['notnull' => false, 'default' => null]],
			'code' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 8]],
			'show_names' => [Types::BOOLEAN, ['notnull' => false, 'default' => null]],
		],
		'shopping_list_areas' => [
			'name_key' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
		],
		'shopping_list_items' => [
			'image_key' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 32]],
			'added_by' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
			'added_by_name' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
			'checked_by_name' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
			'added_via' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
			'checked_via' => [Types::STRING, ['notnull' => false, 'default' => null, 'length' => 64]],
		],
		'shopping_list_prefs' => [
			'position' => [Types::INTEGER, ['notnull' => false, 'default' => null]],
		],
		'shopping_list_lists' => [
			'default_area_id' => [Types::INTEGER, ['notnull' => false, 'default' => null]],
		],
	];

	public function handle(Event $event): void {
		if (!$event instanceof AddMissingColumnsEvent) {
			return;
		}
		foreach (self::COLUMNS as $table => $columns) {
			foreach ($columns as $column => [$type, $options]) {
				$event->addMissingColumn($table, $column, $type, $options);
			}
		}
	}
}
