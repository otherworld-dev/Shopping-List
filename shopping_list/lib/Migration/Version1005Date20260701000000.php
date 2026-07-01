<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Migration;

use Closure;
use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Notification\Notifier;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUserManager;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use OCP\Notification\IManager as INotificationManager;
use Psr\Log\LoggerInterface;

/**
 * One-off announcement: tell existing users that the companion Android app is
 * available on Google Play.
 *
 * This carries no schema change — it runs once (like every migration) when the
 * app is upgraded, and drops a dismissable notification for every user who
 * already has data in the app. Fresh installs have no lists yet, so no one is
 * notified on first install; the announcement only reaches people who are
 * actually upgrading. Any failure here is swallowed so it can never block the
 * upgrade.
 */
class Version1005Date20260701000000 extends SimpleMigrationStep {
	public function __construct(
		private IDBConnection $db,
		private IUserManager $userManager,
		private IGroupManager $groupManager,
		private INotificationManager $notificationManager,
		private LoggerInterface $logger,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		// No schema change — this migration only sends the announcement.
		return null;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		try {
			$users = $this->getTargetUsers();
			if ($users === []) {
				return;
			}

			$now = new \DateTime();
			$sent = 0;
			foreach ($users as $userId) {
				$notification = $this->notificationManager->createNotification();
				$notification->setApp(Application::APP_ID)
					->setUser($userId)
					->setDateTime($now)
					->setObject(Notifier::SUBJECT_ANDROID_APP, '1')
					->setSubject(Notifier::SUBJECT_ANDROID_APP);
				$this->notificationManager->notify($notification);
				$sent++;
			}

			$output->info(sprintf('Shopping List: announced the Android app to %d user(s).', $sent));
		} catch (\Throwable $e) {
			// Never let an announcement break the upgrade.
			$this->logger->warning('Shopping List: failed to send Android app announcement', [
				'exception' => $e,
				'app' => Application::APP_ID,
			]);
		}
	}

	/**
	 * Users who already use the app: list owners plus everyone a list has been
	 * shared with (group shares expanded to their members). Only existing users
	 * are returned.
	 *
	 * @return string[]
	 */
	private function getTargetUsers(): array {
		$userIds = [];

		// List owners.
		$qb = $this->db->getQueryBuilder();
		$qb->selectDistinct('user_id')->from('shopping_list_lists');
		$result = $qb->executeQuery();
		while (($row = $result->fetch()) !== false) {
			$userIds[$row['user_id']] = true;
		}
		$result->closeCursor();

		// Share recipients (0 = user, 1 = group).
		$qb = $this->db->getQueryBuilder();
		$qb->selectDistinct('shared_with')
			->addSelect('shared_with_type')
			->from('shopping_list_shares');
		$result = $qb->executeQuery();
		while (($row = $result->fetch()) !== false) {
			if ((int)$row['shared_with_type'] === 1) {
				$group = $this->groupManager->get($row['shared_with']);
				if ($group !== null) {
					foreach ($group->getUsers() as $user) {
						$userIds[$user->getUID()] = true;
					}
				}
			} else {
				$userIds[$row['shared_with']] = true;
			}
		}
		$result->closeCursor();

		// Keep only users that still exist.
		return array_values(array_filter(
			array_keys($userIds),
			fn (string $uid): bool => $this->userManager->userExists($uid),
		));
	}
}
