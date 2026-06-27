<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add a stable `name_key` to shop areas so default area names can be translated
 * live in each viewer's language instead of being frozen at seed time.
 *
 * Default areas store the English key (e.g. "Produce") here; the service
 * translates it via IL10N when serving the list. A user renaming an area clears
 * the key, so custom names are preserved verbatim.
 *
 * The backfill matches existing areas to the English defaults so lists created
 * before this change (which stored English names) start translating immediately.
 */
class Version1004Date20260627000000 extends SimpleMigrationStep {
	/** Stable English default area names — must match ShopAreaService::DEFAULTS. */
	private const DEFAULT_NAMES = [
		'Produce', 'Dairy', 'Bakery', 'Meat & Seafood', 'Frozen', 'Beverages',
		'Snacks', 'Household', 'Personal Care', 'General', 'Pets', 'Other',
	];

	public function __construct(
		private IDBConnection $db,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('shopping_list_areas');

		if (!$table->hasColumn('name_key')) {
			$table->addColumn('name_key', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
		}

		return $schema;
	}

	/**
	 * Backfill name_key for existing default areas whose stored name still matches
	 * an English default (i.e. lists seeded in English and not renamed). Areas
	 * seeded in another language, or renamed, keep a null key and their stored name.
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		foreach (self::DEFAULT_NAMES as $name) {
			$qb = $this->db->getQueryBuilder();
			$qb->update('shopping_list_areas')
				->set('name_key', $qb->createNamedParameter($name))
				->where($qb->expr()->eq('name', $qb->createNamedParameter($name)))
				->andWhere($qb->expr()->isNull('name_key'));
			$qb->executeStatement();
		}
	}
}
