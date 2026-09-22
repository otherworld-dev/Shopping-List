<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Files\NotFoundException as FilesNotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Security\ISecureRandom;

/**
 * The one place that gives an item a photo or takes it away. It checks list
 * permissions, runs the upload through the processor, writes the files and
 * rotates the item's image key, so a photo's URL changes on every replace
 * and can be cached without expiry until then.
 */
class ItemImageService {
	private const KEY_LENGTH = 16;
	private const KEY_CHARS = '0123456789abcdef';

	public function __construct(
		private ItemMapper $mapper,
		private ListService $listService,
		private PushService $pushService,
		private ItemImageStorage $storage,
		private ImageProcessor $processor,
		private ISecureRandom $random,
	) {
	}

	/**
	 * Attach or replace the photo on an item. The files are written before
	 * the row: a failure then leaves at most an orphan file that the next
	 * delete cleans up, never a key that points at nothing.
	 *
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 * @throws InvalidImageException
	 */
	public function attach(int $listId, int $itemId, string $rawBytes, string $userId): Item {
		$item = $this->findInList($listId, $itemId);
		$this->listService->assertWriteAccess($listId, $userId);

		$processed = $this->processor->process($rawBytes);
		$this->storage->store($itemId, $processed->full, $processed->thumb);

		$item->setImageKey($this->random->generate(self::KEY_LENGTH, self::KEY_CHARS));
		$item->setUpdatedAt(new DateTime());
		$item = $this->mapper->update($item);

		$this->pushService->notifyItemUpdate($listId, $itemId, 'updated', $userId);
		return $item;
	}

	/**
	 * Remove the photo. An item without one is handed back unchanged.
	 *
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function remove(int $listId, int $itemId, string $userId): Item {
		$item = $this->findInList($listId, $itemId);
		$this->listService->assertWriteAccess($listId, $userId);

		if ($item->getImageKey() === null) {
			return $item;
		}

		$this->storage->delete($itemId);
		$item->setImageKey(null);
		$item->setUpdatedAt(new DateTime());
		$item = $this->mapper->update($item);

		$this->pushService->notifyItemUpdate($listId, $itemId, 'updated', $userId);
		return $item;
	}

	/**
	 * The stored file for an item, only while $key is its current key. Access
	 * to the list is the caller's job: the GET controllers check it first.
	 *
	 * @throws NotFoundException
	 */
	public function getFile(int $listId, int $itemId, string $key, bool $thumbnail): ISimpleFile {
		$item = $this->findInList($listId, $itemId);
		$current = $item->getImageKey();
		if ($current === null || !hash_equals($current, $key)) {
			throw new NotFoundException('Image not found');
		}
		try {
			return $this->storage->get($itemId, $thumbnail);
		} catch (FilesNotFoundException) {
			throw new NotFoundException('Image not found');
		}
	}

	/** @throws NotFoundException for a missing item or one that belongs to another list */
	private function findInList(int $listId, int $itemId): Item {
		try {
			$item = $this->mapper->find($itemId);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}
		if ($item->getListId() !== $listId) {
			throw new NotFoundException('Item not found');
		}
		return $item;
	}
}
