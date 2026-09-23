<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\PhotoMapper;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use Psr\Log\LoggerInterface;

/**
 * Removes what a deleted Nextcloud user leaves behind. Their own lists go the
 * same way as deleting them in the app, so the people they were shared with
 * are told and the lists' items, areas, shares and link shares go with them.
 * Shares made to them, their pins, their tags and their remembered photos
 * are dropped, and their name is taken off the items they ticked in other
 * people's lists. Each step is logged and skipped on failure, so one bad row
 * does not stop the rest or the user deletion itself.
 */
class UserDataCleanup {
	public function __construct(
		private ShoppingListMapper $lists,
		private ListService $listService,
		private ListShareMapper $shares,
		private UserListPreferenceMapper $prefs,
		private TagService $tags,
		private PhotoMapper $photos,
		private ItemImageCleanup $imageCleanup,
		private ItemMapper $items,
		private LoggerInterface $logger,
	) {
	}

	public function deleteUser(string $userId): void {
		// Lists first: their items let go of photo keys while the user's
		// remembered photos still hold them, then the photos step below
		// deletes whatever files are left unused.
		foreach ($this->lists->findAllByUser($userId) as $list) {
			$this->step('delete list ' . $list->getId(), fn () => $this->listService->delete($list->getId(), $userId));
		}
		$this->step('remove shares', fn () => $this->shares->deleteSharedWithUser($userId));
		$this->step('remove pins', fn () => $this->prefs->deleteByUser($userId));
		foreach ($this->tags->findAll($userId) as $tag) {
			$this->step('delete tag ' . $tag->getId(), fn () => $this->tags->delete($tag->getId(), $userId));
		}
		$this->step('forget photos', function () use ($userId) {
			$keys = [];
			foreach ($this->photos->findAllByUser($userId) as $photo) {
				$keys[] = $photo->getImageKey();
				$this->photos->delete($photo);
			}
			$this->imageCleanup->release($keys);
		});
		$this->step('clear checked by', fn () => $this->items->clearCheckedBy($userId));
	}

	private function step(string $what, callable $run): void {
		try {
			$run();
		} catch (\Throwable $e) {
			$this->logger->error('Deleted user clean-up could not ' . $what, [
				'app' => Application::APP_ID,
				'exception' => $e,
			]);
		}
	}
}
