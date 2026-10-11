<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use DateTime;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\Photo;
use OCA\Shopping_List\Db\PhotoMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception as DbException;
use OCP\Files\NotFoundException as FilesNotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Security\ISecureRandom;

/**
 * The one place that gives items a photo or takes it away. A photo belongs to
 * an item name, not to one item: uploading it puts it on every item with that
 * name in the lists the uploader can edit, and remembers it so an item added
 * later under the same name shows it too, even after the list was emptied.
 * Each upload gets a fresh random key, which names the files and makes the
 * URLs immutable, so they can be cached without expiry.
 */
class ItemImageService {
	private const KEY_LENGTH = 16;
	private const KEY_CHARS = '0123456789abcdef';
	private const NAME_KEY_LENGTH = 255;

	public function __construct(
		private ItemMapper $mapper,
		private ListService $listService,
		private PushService $pushService,
		private ItemImageStorage $storage,
		private ImageProcessor $processor,
		private ISecureRandom $random,
		private PhotoMapper $photos,
		private ItemImageCleanup $cleanup,
	) {
	}

	/** How item names are compared: trimmed and case-insensitive, like the learned area keywords. */
	public static function nameKey(string $name): string {
		return mb_substr(mb_strtolower(trim($name)), 0, self::NAME_KEY_LENGTH);
	}

	/**
	 * Attach or replace the photo for an item's name. The files are written
	 * first under a new key, then the uploader's remembered photo for the
	 * name, then every same-named item in the lists the uploader can edit.
	 * Keys that dropped out are handed to the cleanup last.
	 *
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 * @throws InvalidImageException
	 */
	public function attach(int $listId, int $itemId, string $rawBytes, string $userId): Item {
		$item = $this->findInList($listId, $itemId);
		$this->listService->assertWriteAccess($listId, $userId);

		$processed = $this->processor->process($rawBytes);
		$key = $this->random->generate(self::KEY_LENGTH, self::KEY_CHARS);
		$this->storage->store($key, $processed->full, $processed->thumb);

		$nameKey = self::nameKey($item->getName());
		$released = [$item->getImageKey()];
		if ($nameKey !== '') {
			$released[] = $this->remember($userId, $nameKey, $key);
		}

		$item = $this->setKey($item, $key, $userId);

		if ($nameKey !== '') {
			foreach ($this->editableItems($userId) as $other) {
				if ($other->getId() === $item->getId()
					|| $other->getImageKey() === $key
					|| self::nameKey($other->getName()) !== $nameKey) {
					continue;
				}
				$released[] = $other->getImageKey();
				$this->setKey($other, $key, $userId);
			}
		}

		$this->cleanup->release(array_values(array_filter(
			array_unique($released),
			fn ($k) => $k !== null && $k !== $key,
		)));
		return $item;
	}

	/**
	 * Remove the photo from an item and forget it for the name: the
	 * remembered photos for that name of everyone who can edit this list are
	 * dropped, and the items showing any of them in the lists the remover can
	 * edit lose it. An item without a photo is handed back unchanged.
	 *
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function remove(int $listId, int $itemId, string $userId): Item {
		$item = $this->findInList($listId, $itemId);
		$this->listService->assertWriteAccess($listId, $userId);

		$key = $item->getImageKey();
		if ($key === null) {
			return $item;
		}

		$keys = [$key];
		$nameKey = self::nameKey($item->getName());
		if ($nameKey !== '') {
			foreach ($this->photos->findByName($nameKey) as $photo) {
				if ($this->canEdit($listId, $photo->getUserId())) {
					$keys[] = $photo->getImageKey();
					$this->photos->delete($photo);
				}
			}
		}
		$keys = array_values(array_unique($keys));

		$item = $this->setKey($item, null, $userId);
		foreach ($this->editableItems($userId) as $other) {
			if ($other->getId() !== $item->getId() && in_array($other->getImageKey(), $keys, true)) {
				$this->setKey($other, null, $userId);
			}
		}

		$this->cleanup->release($keys);
		return $item;
	}

	/**
	 * The key of the photo a new item called $name should show in this list:
	 * the newest remembered photo for the name whose taker can edit the list.
	 */
	public function rememberedKey(int $listId, string $name): ?string {
		$nameKey = self::nameKey($name);
		if ($nameKey === '') {
			return null;
		}
		foreach ($this->photos->findByName($nameKey) as $photo) {
			if ($this->canEdit($listId, $photo->getUserId())) {
				return $photo->getImageKey();
			}
		}
		return null;
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
			return $this->storage->get($current, $thumbnail);
		} catch (FilesNotFoundException) {
			throw new NotFoundException('Image not found');
		}
	}

	/**
	 * Point the user's remembered photo for this name at $key.
	 *
	 * @return ?string the key it pointed at before, if any
	 */
	private function remember(string $userId, string $nameKey, string $key): ?string {
		$photo = $this->photos->findForUser($userId, $nameKey);
		if ($photo === null) {
			$photo = new Photo();
			$photo->setUserId($userId);
			$photo->setNameKey($nameKey);
			$photo->setImageKey($key);
			$photo->setUpdatedAt(new DateTime());
			try {
				$this->photos->insert($photo);
				return null;
			} catch (DbException $e) {
				if ($e->getReason() !== DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
					throw $e;
				}
				// A parallel upload for the same name created the row first.
				$photo = $this->photos->findForUser($userId, $nameKey);
				if ($photo === null) {
					throw $e;
				}
			}
		}
		$previous = $photo->getImageKey();
		$photo->setImageKey($key);
		$photo->setUpdatedAt(new DateTime());
		$this->photos->update($photo);
		return $previous;
	}

	private function setKey(Item $item, ?string $key, string $userId): Item {
		$item->setImageKey($key);
		$item->setUpdatedAt(new DateTime());
		$item = $this->mapper->update($item);
		$this->pushService->notifyItemUpdate($item->getListId(), $item->getId(), 'updated', $userId);
		return $item;
	}

	/** @return iterable<Item> every item in the lists this user can edit */
	private function editableItems(string $userId): iterable {
		foreach ($this->listService->findAll($userId) as $list) {
			if ($list->getPermission() >= 1) {
				yield from $this->mapper->findAllByList($list->getId());
			}
		}
	}

	private function canEdit(int $listId, string $userId): bool {
		try {
			$this->listService->assertWriteAccess($listId, $userId);
			return true;
		} catch (NoPermissionException|NotFoundException) {
			return false;
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
