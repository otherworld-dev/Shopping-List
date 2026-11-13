<?php

declare(strict_types=1);

namespace OCA\Shopping_List\BackgroundJob;

use OCA\Shopping_List\Service\AddedItemNotifications;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\QueuedJob;

/**
 * Sends one list's batch of "added to your list" notifications. Queued by
 * the first add of a batch with the list id as its argument, and removed
 * before it runs, so an add while it is running queues the next batch.
 */
class SendAddedItemNotifications extends QueuedJob {
	public function __construct(
		ITimeFactory $time,
		private AddedItemNotifications $notifications,
	) {
		parent::__construct($time);
	}

	protected function run($argument): void {
		$listId = (int)($argument['listId'] ?? 0);
		if ($listId > 0) {
			$this->notifications->send($listId);
		}
	}
}
