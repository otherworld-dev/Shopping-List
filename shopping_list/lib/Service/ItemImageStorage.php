<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\AppInfo\Application;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use Psr\Log\LoggerInterface;

/**
 * The item photos on disk. They live in the app's own appdata folder, not in
 * anyone's Files, so a photo one member of a shared list takes is readable by
 * the others, counts against no quota, and goes when the item goes. Two files
 * per item, both named by the item id: the photo and its thumbnail. Nothing
 * here checks permissions; ItemImageService does that.
 */
class ItemImageStorage {
	private const FOLDER = 'images';

	private ?IAppData $appData = null;

	public function __construct(
		private IAppDataFactory $appDataFactory,
		private LoggerInterface $logger,
	) {
	}

	public static function fileName(int $itemId, bool $thumbnail): string {
		return $itemId . ($thumbnail ? '.thumb.jpg' : '.jpg');
	}

	/** Write both files, creating the folder on first use and overwriting on replace. */
	public function store(int $itemId, string $fullJpeg, string $thumbJpeg): void {
		$folder = $this->folder(true);
		$this->write($folder, self::fileName($itemId, false), $fullJpeg);
		$this->write($folder, self::fileName($itemId, true), $thumbJpeg);
	}

	/** @throws NotFoundException when there is no such file */
	public function get(int $itemId, bool $thumbnail): ISimpleFile {
		$folder = $this->folder(false);
		if ($folder === null) {
			throw new NotFoundException('No images stored yet');
		}
		return $folder->getFile(self::fileName($itemId, $thumbnail));
	}

	/** Remove both files. Missing files are fine: this runs on every item delete, photo or not. */
	public function delete(int $itemId): void {
		$this->deleteMany([$itemId]);
	}

	/**
	 * Remove the files of several items by id. The rows are usually gone by
	 * the time this runs (clearChecked and cascadeDelete hand over ids after
	 * the fact), so nothing here may look an item up.
	 *
	 * @param int[] $itemIds
	 */
	public function deleteMany(array $itemIds): void {
		if ($itemIds === []) {
			return;
		}
		$folder = $this->folder(false);
		if ($folder === null) {
			return;
		}
		foreach ($itemIds as $itemId) {
			foreach ([false, true] as $thumbnail) {
				$name = self::fileName((int)$itemId, $thumbnail);
				if (!$folder->fileExists($name)) {
					continue;
				}
				try {
					$folder->getFile($name)->delete();
				} catch (NotFoundException) {
					// Removed by a parallel request. Nothing left to do.
				} catch (NotPermittedException $e) {
					$this->logger->warning('Could not delete item image ' . $name, [
						'app' => Application::APP_ID,
						'exception' => $e,
					]);
				}
			}
		}
	}

	private function write(ISimpleFolder $folder, string $name, string $bytes): void {
		if ($folder->fileExists($name)) {
			$folder->getFile($name)->putContent($bytes);
		} else {
			$folder->newFile($name, $bytes);
		}
	}

	/**
	 * The images folder. With $create false a missing folder comes back as
	 * null, which the read and delete paths treat as "no photos yet".
	 */
	private function folder(bool $create): ?ISimpleFolder {
		$this->appData ??= $this->appDataFactory->get(Application::APP_ID);
		try {
			return $this->appData->getFolder(self::FOLDER);
		} catch (NotFoundException) {
			return $create ? $this->appData->newFolder(self::FOLDER) : null;
		}
	}
}
