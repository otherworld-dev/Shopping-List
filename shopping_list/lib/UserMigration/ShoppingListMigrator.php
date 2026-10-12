<?php

declare(strict_types=1);

namespace OCA\Shopping_List\UserMigration;

use OCA\Shopping_List\Service\BackupService;
use OCP\IL10N;
use OCP\IUser;
use OCP\UserMigration\IExportDestination;
use OCP\UserMigration\IImportSource;
use OCP\UserMigration\IMigrator;
use OCP\UserMigration\TMigratorBasicVersionHandling;
use OCP\UserMigration\UserMigrationException;
use Symfony\Component\Console\Output\OutputInterface;
use Throwable;

/**
 * Carries a user's shopping lists through Nextcloud's user migration.
 *
 * The occ user:export and user:import commands, and the Personal settings
 * page that drive this, come from the separate User Migration app, which is
 * not bundled with the server. The in-app download is what most people will
 * actually use; this is here for whole-account moves between servers.
 */
class ShoppingListMigrator implements IMigrator {
	use TMigratorBasicVersionHandling;

	private const PATH = 'shopping_list/shopping_list.json';

	protected int $version = 1;

	public function __construct(
		private BackupService $backupService,
		private IL10N $l,
	) {
	}

	public function getId(): string {
		return 'shopping_list';
	}

	public function getDisplayName(): string {
		return $this->l->t('Shopping List');
	}

	public function getDescription(): string {
		return $this->l->t('Your shopping lists, their items, areas and tags. Shares are not included.');
	}

	public function export(IUser $user, IExportDestination $exportDestination, OutputInterface $output): void {
		$output->writeln('Exporting shopping lists...');

		try {
			$backup = $this->backupService->export($user->getUID());
			$exportDestination->addFileContents(
				self::PATH,
				json_encode($backup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
			);
		} catch (Throwable $e) {
			throw new UserMigrationException('Could not export shopping lists', 0, $e);
		}
	}

	public function import(IUser $user, IImportSource $importSource, OutputInterface $output): void {
		if (!$importSource->pathExists(self::PATH)) {
			$output->writeln('No shopping lists to import, skipping.');
			return;
		}

		$output->writeln('Importing shopping lists...');

		try {
			$payload = json_decode(
				$importSource->getFileContents(self::PATH),
				true,
				512,
				JSON_THROW_ON_ERROR,
			);
			$summary = $this->backupService->import($user->getUID(), $payload);
			$output->writeln("Imported {$summary['lists']} lists and {$summary['items']} items.");
		} catch (Throwable $e) {
			throw new UserMigrationException('Could not import shopping lists', 0, $e);
		}
	}
}
