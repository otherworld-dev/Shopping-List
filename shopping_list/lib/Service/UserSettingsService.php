<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\AppInfo\Application;
use OCP\IConfig;

/**
 * The user's own app settings, kept in Nextcloud's per-user app config so
 * they are the same in every browser and on the phone.
 */
class UserSettingsService {
	public const SHOW_IMAGES = 'show_images';
	public const LIST_SORT = 'list_sort';

	public function __construct(
		private IConfig $config,
	) {
	}

	/** Whether this user wants item photos shown and the photo actions offered. Off until they say so. */
	public function showImages(string $userId): bool {
		return $this->config->getUserValue($userId, Application::APP_ID, self::SHOW_IMAGES, '0') === '1';
	}

	public function setShowImages(string $userId, bool $on): void {
		$this->config->setUserValue($userId, Application::APP_ID, self::SHOW_IMAGES, $on ? '1' : '0');
	}

	/** How this user's lists are ordered: updated, alpha or custom. Recently updated until they choose. */
	public function listSort(string $userId): string {
		return ListOrder::normalise($this->config->getUserValue($userId, Application::APP_ID, self::LIST_SORT, ListOrder::UPDATED));
	}

	/** @throws \InvalidArgumentException for anything but the three modes */
	public function setListSort(string $userId, string $mode): void {
		if (!in_array($mode, ListOrder::MODES, true)) {
			throw new \InvalidArgumentException('Unknown list sort');
		}
		$this->config->setUserValue($userId, Application::APP_ID, self::LIST_SORT, $mode);
	}

	/** Every setting, in the shape the settings endpoint and the page's initial state share. */
	public function forUser(string $userId): array {
		return [
			'showImages' => $this->showImages($userId),
			'listSort' => $this->listSort($userId),
		];
	}
}
