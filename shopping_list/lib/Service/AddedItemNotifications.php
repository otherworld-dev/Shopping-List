<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\BackgroundJob\SendAddedItemNotifications;
use OCA\Shopping_List\Db\AddedItem;
use OCA\Shopping_List\Db\AddedItemMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJobList;
use OCP\IUserManager;
use OCP\Notification\IManager as INotificationManager;
use OCP\Notification\INotification;
use Psr\Log\LoggerInterface;

/**
 * Tells the people on a list when someone else adds to it, as Nextcloud
 * notifications (the bell, and the phone through the Nextcloud app).
 *
 * An add only records a row per person and queues a job for the list, so
 * a run of adds goes out together as one notification a couple of minutes
 * after the first. While a person's notification for a list is still
 * unread, the next batch replaces it with the running total ("Sam added 5
 * items"), rather than stacking up one per batch.
 */
class AddedItemNotifications {
	public const SUBJECT = 'items_added';
	public const OBJECT_TYPE = 'list';
	/** Seconds after the first add that the batch goes out; cron runs it at its next pass after that. */
	public const DELAY = 120;
	/** How many item names a notification carries */
	public const MAX_ITEMS = 5;
	/** How many adders a notification names */
	public const MAX_ACTORS = 3;

	public function __construct(
		private AddedItemMapper $added,
		private PushService $push,
		private ShoppingListMapper $lists,
		private UserSettingsService $settings,
		private IUserManager $userManager,
		private INotificationManager $notifications,
		private IJobList $jobs,
		private ITimeFactory $time,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Note an item put on a list, for everyone else on it who wants to know.
	 * $actorId is null for a guest on a link, who goes by $guestName if they
	 * gave one. A failure here is logged and never stops the add itself.
	 */
	public function itemAdded(int $listId, string $itemName, ?string $actorId, ?string $guestName = null): void {
		try {
			$recipients = array_filter(
				$this->push->listParticipants($listId),
				fn (string $userId) => $userId !== $actorId && $this->settings->notifyAdds($userId),
			);
			if ($recipients === []) {
				return;
			}
			$actor = $actorId === null
				? ($guestName ?? '')
				: ($this->userManager->getDisplayName($actorId) ?? $actorId);
			foreach ($recipients as $userId) {
				$this->added->add($listId, $userId, $actor, $itemName);
			}

			// The first add sets the time; later ones join that batch
			$argument = ['listId' => $listId];
			if (!$this->jobs->has(SendAddedItemNotifications::class, $argument)) {
				$this->jobs->scheduleAfter(SendAddedItemNotifications::class, $this->time->getTime() + self::DELAY, $argument);
			}
		} catch (\Throwable $e) {
			$this->logger->warning('Could not queue a notification for an added item', ['exception' => $e]);
		}
	}

	/**
	 * Send what has built up for a list, one notification per person. Rows
	 * for someone no longer on the list, or who has turned these off, are
	 * dropped. A notification that has since been read or dismissed is not
	 * added to; the new batch starts a fresh one.
	 */
	public function send(int $listId): void {
		try {
			$this->lists->find($listId);
		} catch (DoesNotExistException) {
			$this->added->deleteByList($listId);
			return;
		}
		$members = $this->push->listParticipants($listId);

		/** @var array<string, AddedItem[]> $byUser */
		$byUser = [];
		foreach ($this->added->findByList($listId) as $row) {
			$byUser[$row->getUserId()][] = $row;
		}

		foreach ($byUser as $userId => $rows) {
			if (!in_array($userId, $members, true) || !$this->settings->notifyAdds($userId)) {
				$this->added->deleteByIds(self::ids($rows));
				continue;
			}
			$fresh = array_values(array_filter($rows, fn (AddedItem $r) => !$r->getNotified()));
			if ($fresh === []) {
				continue;
			}
			$shown = array_values(array_filter($rows, fn (AddedItem $r) => (bool)$r->getNotified()));
			$current = $this->filter($userId, $listId);
			if ($shown !== [] && $this->notifications->getCount($current) === 0) {
				$this->added->deleteByIds(self::ids($shown));
				$rows = $fresh;
			}

			$this->notifications->markProcessed($current);
			$notification = $this->filter($userId, $listId)
				->setDateTime(new DateTime('@' . $this->time->getTime()))
				->setSubject(self::SUBJECT, self::parameters($rows));
			$this->notifications->notify($notification);
			$this->added->markNotified(self::ids($fresh));
		}
	}

	/** Take back a list's notifications, for everyone, when the list goes. */
	public function listDeleted(int $listId): void {
		try {
			$this->added->deleteByList($listId);
			$notification = $this->notifications->createNotification();
			$notification->setApp(Application::APP_ID)
				->setObject(self::OBJECT_TYPE, (string)$listId);
			$this->notifications->markProcessed($notification);
		} catch (\Throwable $e) {
			$this->logger->warning('Could not clear the notifications of a deleted list', ['exception' => $e]);
		}
	}

	private function filter(string $userId, int $listId): INotification {
		$notification = $this->notifications->createNotification();
		$notification->setApp(Application::APP_ID)
			->setUser($userId)
			->setObject(self::OBJECT_TYPE, (string)$listId);
		return $notification;
	}

	/**
	 * The adders, newest first, the first few item names in the order they
	 * were added, and the totals.
	 *
	 * @param AddedItem[] $rows
	 * @return array{actors: string[], actorCount: int, items: string[], count: int}
	 */
	public static function parameters(array $rows): array {
		$actors = [];
		foreach (array_reverse($rows) as $row) {
			$actor = (string)$row->getActor();
			if (!in_array($actor, $actors, true)) {
				$actors[] = $actor;
			}
		}
		return [
			'actors' => array_slice($actors, 0, self::MAX_ACTORS),
			'actorCount' => count($actors),
			'items' => array_slice(array_map(fn (AddedItem $r) => $r->getItemName(), $rows), 0, self::MAX_ITEMS),
			'count' => count($rows),
		];
	}

	/**
	 * @param AddedItem[] $rows
	 * @return int[]
	 */
	private static function ids(array $rows): array {
		return array_map(fn (AddedItem $r) => $r->getId(), $rows);
	}
}
