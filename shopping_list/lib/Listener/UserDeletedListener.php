<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Listener;

use OCA\Shopping_List\Service\UserDataCleanup;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\User\Events\UserDeletedEvent;

/**
 * @template-implements IEventListener<UserDeletedEvent>
 */
class UserDeletedListener implements IEventListener {
	public function __construct(
		private UserDataCleanup $cleanup,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof UserDeletedEvent) {
			return;
		}
		$this->cleanup->deleteUser($event->getUser()->getUID());
	}
}
