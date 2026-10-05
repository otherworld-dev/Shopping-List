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
	public const SHOW_OWN_NAME = 'show_own_name';
	public const WHATS_NEW_SEEN = 'whats_new_seen';

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

	/** Whether this user sees their own name on items they added or ticked. Off until they say so. */
	public function showOwnName(string $userId): bool {
		return $this->config->getUserValue($userId, Application::APP_ID, self::SHOW_OWN_NAME, '0') === '1';
	}

	public function setShowOwnName(string $userId, bool $on): void {
		$this->config->setUserValue($userId, Application::APP_ID, self::SHOW_OWN_NAME, $on ? '1' : '0');
	}

	/** The app version whose release notes this user last saw. Empty until the first are shown. */
	public function whatsNewSeen(string $userId): string {
		return $this->config->getUserValue($userId, Application::APP_ID, self::WHATS_NEW_SEEN, '');
	}

	/** @throws \InvalidArgumentException for anything not shaped like an app version */
	public function setWhatsNewSeen(string $userId, string $version): void {
		if (preg_match('/^\d{1,5}(\.\d{1,5}){0,3}(-[0-9A-Za-z.]{1,20})?$/', $version) !== 1) {
			throw new \InvalidArgumentException('Not a version');
		}
		$this->config->setUserValue($userId, Application::APP_ID, self::WHATS_NEW_SEEN, $version);
	}

	/** Every setting, in the shape the settings endpoint and the page's initial state share. */
	public function forUser(string $userId): array {
		return [
			'showImages' => $this->showImages($userId),
			'listSort' => $this->listSort($userId),
			'showOwnName' => $this->showOwnName($userId),
			'whatsNewSeen' => $this->whatsNewSeen($userId),
		];
	}
}
