<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCP\IGroupManager;

class PushService {
	private ?object $queue = null;

	public function __construct(
		private ShoppingListMapper $listMapper,
		private ListShareMapper $shareMapper,
		private IGroupManager $groupManager,
	) {
		// Optional dependency on notify_push
		if (class_exists('OCA\NotifyPush\Queue\IQueue')) {
			try {
				$this->queue = \OC::$server->get('OCA\NotifyPush\Queue\IQueue');
			} catch (\Exception) {
				// notify_push not available
			}
		}
	}

	public function notifyListUpdate(int $listId, string $excludeUserId): void {
		$this->notify('shopping_list_list_update', $listId, [
			'listId' => $listId,
		], $excludeUserId);
	}

	public function notifyItemUpdate(int $listId, int $itemId, string $action, string $excludeUserId): void {
		$this->notify('shopping_list_item_update', $listId, [
			'listId' => $listId,
			'itemId' => $itemId,
			'action' => $action,
		], $excludeUserId);
	}

	public function notifyShareUpdate(int $listId, string $targetUserId, string $action): void {
		if ($this->queue === null) {
			return;
		}

		try {
			$this->queue->push('notify_custom', [
				'user' => $targetUserId,
				'message' => 'shopping_list_share_update',
				'body' => ['listId' => $listId, 'action' => $action],
			]);
		} catch (\Exception) {
			// Silently ignore push failures
		}
	}

	private function notify(string $message, int $listId, array $body, string $excludeUserId): void {
		if ($this->queue === null) {
			return;
		}

		$users = $this->getListParticipants($listId);

		foreach ($users as $userId) {
			if ($userId === $excludeUserId) {
				continue;
			}
			try {
				$this->queue->push('notify_custom', [
					'user' => $userId,
					'message' => $message,
					'body' => $body,
				]);
			} catch (\Exception) {
				// Silently ignore push failures
			}
		}
	}

	/**
	 * Get all users who have access to a list (owner + share recipients).
	 *
	 * @return string[]
	 */
	private function getListParticipants(int $listId): array {
		$users = [];

		// Owner
		try {
			$list = $this->listMapper->find($listId);
			$users[] = $list->getUserId();
		} catch (\Exception) {
			return [];
		}

		// Direct user shares + group share members
		$shares = $this->shareMapper->findByList($listId);
		foreach ($shares as $share) {
			if ($share->getSharedWithType() === 0) {
				$users[] = $share->getSharedWith();
			} elseif ($share->getSharedWithType() === 1) {
				$group = $this->groupManager->get($share->getSharedWith());
				if ($group !== null) {
					foreach ($group->getUsers() as $user) {
						$users[] = $user->getUID();
					}
				}
			}
		}

		return array_unique($users);
	}
}
