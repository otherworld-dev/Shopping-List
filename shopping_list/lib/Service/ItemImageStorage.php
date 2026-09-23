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
 * the others and counts against no quota. Two files per photo, both named by
 * its image key: the photo and its thumbnail. One photo can sit on several
 * items and outlive them all, so the files go only when ItemImageCleanup finds
 * nothing using the key any more. Nothing here checks permissions;
 * ItemImageService does that.
 */
class ItemImageStorage {
	private const FOLDER = 'images';

	private ?IAppData $appData = null;

	public function __construct(
		private IAppDataFactory $appDataFactory,
		private LoggerInterface $logger,
	) {
	}

	/** @throws \InvalidArgumentException for anything but a 16-hex image key */
	public static function fileName(string $imageKey, bool $thumbnail): string {
		if (preg_match('/^[0-9a-f]{16}$/', $imageKey) !== 1) {
			throw new \InvalidArgumentException('Not an image key');
		}
		return $imageKey . ($thumbnail ? '.thumb.jpg' : '.jpg');
	}

	/** Write both files, creating the folder on first use and overwriting on replace. */
	public function store(string $imageKey, string $fullJpeg, string $thumbJpeg): void {
		$folder = $this->folder(true);
		$this->write($folder, self::fileName($imageKey, false), $fullJpeg);
		$this->write($folder, self::fileName($imageKey, true), $thumbJpeg);
	}

	/** @throws NotFoundException when there is no such file */
	public function get(string $imageKey, bool $thumbnail): ISimpleFile {
		$folder = $this->folder(false);
		if ($folder === null) {
			throw new NotFoundException('No images stored yet');
		}
		return $folder->getFile(self::fileName($imageKey, $thumbnail));
	}

	/** Remove both files of one photo. Missing files are fine. */
	public function delete(string $imageKey): void {
		$this->deleteMany([$imageKey]);
	}

	/**
	 * Remove the files of several photos by key. This runs after the rows
	 * that used them are gone, so a failure is logged, never thrown.
	 *
	 * @param string[] $imageKeys
	 */
	public function deleteMany(array $imageKeys): void {
		if ($imageKeys === []) {
			return;
		}
		try {
			$folder = $this->folder(false);
		} catch (\Exception $e) {
			// The rows are already gone; a broken appdata must not turn that
			// into a failed request. Log it and leave the files for later.
			$this->logger->warning('Could not open the item images folder', [
				'app' => Application::APP_ID,
				'exception' => $e,
			]);
			return;
		}
		if ($folder === null) {
			return;
		}
		foreach ($imageKeys as $imageKey) {
			foreach ([false, true] as $thumbnail) {
				$name = self::fileName($imageKey, $thumbnail);
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
			if (!$create) {
				return null;
			}
		}
		try {
			return $this->appData->newFolder(self::FOLDER);
		} catch (NotPermittedException) {
			// Two first-ever uploads raced to create it and the other one won.
			return $this->appData->getFolder(self::FOLDER);
		}
	}
}
