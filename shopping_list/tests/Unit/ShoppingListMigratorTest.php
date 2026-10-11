<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\BackupService;
use OCA\Shopping_List\UserMigration\ShoppingListMigrator;
use OCP\IL10N;
use OCP\IUser;
use OCP\UserMigration\IExportDestination;
use OCP\UserMigration\IImportSource;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Output\NullOutput;

class ShoppingListMigratorTest extends TestCase {
	public function testExportWritesTheBackupIntoTheArchive(): void {
		$service = $this->createMock(BackupService::class);
		$service->method('export')->with('alice')->willReturn(['version' => 1, 'lists' => []]);

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnArgument(0);

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');

		$destination = $this->createMock(IExportDestination::class);
		$destination->expects(self::once())
			->method('addFileContents')
			->with(
				'shopping_list/shopping_list.json',
				self::stringContains('"version": 1'),
			);

		(new ShoppingListMigrator($service, $l10n))
			->export($user, $destination, new NullOutput());
	}

	public function testImportDoesNothingWhenTheArchiveHasNoBackup(): void {
		$service = $this->createMock(BackupService::class);
		$service->expects(self::never())->method('import');

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnArgument(0);

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');

		$source = $this->createMock(IImportSource::class);
		$source->method('pathExists')->willReturn(false);

		(new ShoppingListMigrator($service, $l10n))
			->import($user, $source, new NullOutput());
	}

	public function testImportHandsTheDecodedPayloadToTheService(): void {
		$service = $this->createMock(BackupService::class);
		$service->expects(self::once())
			->method('import')
			->with('alice', ['version' => 1, 'lists' => []])
			->willReturn(['lists' => 0, 'areas' => 0, 'items' => 0]);

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnArgument(0);

		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('alice');

		$source = $this->createMock(IImportSource::class);
		$source->method('pathExists')->willReturn(true);
		$source->method('getFileContents')->willReturn('{"version":1,"lists":[]}');

		(new ShoppingListMigrator($service, $l10n))
			->import($user, $source, new NullOutput());
	}
}
