<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Listener\MissingColumnsListener;
use OCP\DB\Events\AddMissingColumnsEvent;
use OCP\EventDispatcher\Event;
use PHPUnit\Framework\TestCase;

/** occ db:add-missing-columns can put back a column a skipped migration never added (#56). */
class MissingColumnsListenerTest extends TestCase {
	/** @return array<string, array{typeName: string, options: array}> by "table.column" */
	private function declared(): array {
		$event = new AddMissingColumnsEvent();
		(new MissingColumnsListener())->handle($event);
		$out = [];
		foreach ($event->getMissingColumns() as $column) {
			$out[$column['tableName'] . '.' . $column['columnName']] = ['typeName' => $column['typeName'], 'options' => $column['options']];
		}
		return $out;
	}

	public function testDeclaresTheDefaultAreaColumn(): void {
		self::assertSame(
			['typeName' => 'integer', 'options' => ['notnull' => false, 'default' => null]],
			$this->declared()['shopping_list_lists.default_area_id'],
		);
	}

	public function testDeclaresTheViaColumns(): void {
		$declared = $this->declared();
		foreach (['added_via', 'checked_via'] as $column) {
			self::assertSame(
				['typeName' => 'string', 'options' => ['notnull' => false, 'default' => null, 'length' => 64]],
				$declared['shopping_list_items.' . $column],
			);
		}
	}

	public function testDeclaresEveryColumnAddedToAnExistingTable(): void {
		self::assertEqualsCanonicalizing([
			'shopping_list_shares.token',
			'shopping_list_shares.password_hash',
			'shopping_list_shares.expires_at',
			'shopping_list_shares.code',
			'shopping_list_shares.show_names',
			'shopping_list_areas.name_key',
			'shopping_list_items.image_key',
			'shopping_list_items.added_by',
			'shopping_list_items.added_by_name',
			'shopping_list_items.checked_by_name',
			'shopping_list_items.added_via',
			'shopping_list_items.checked_via',
			'shopping_list_prefs.position',
			'shopping_list_lists.default_area_id',
		], array_keys($this->declared()));
	}

	public function testEveryDeclaredColumnCanBeNull(): void {
		foreach ($this->declared() as $name => $column) {
			self::assertFalse($column['options']['notnull'], $name . ' must be nullable to be added to rows that exist');
		}
	}

	public function testIgnoresOtherEvents(): void {
		(new MissingColumnsListener())->handle(new Event());
		$this->addToAssertionCount(1);
	}
}
