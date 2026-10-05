<?php

declare(strict_types=1);

namespace OCA\Shopping_List;

use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\IniSize;
use OCP\App\IAppManager;
use OCP\Capabilities\IPublicCapability;
use OCP\IUserSession;

/**
 * What this server's copy of the app can do, for the Android app to read
 * from /ocs/v2.php/cloud/capabilities at login instead of probing for 404s.
 * Guests joining by invite code have no account, so the feature list is
 * public; the version and limits are only for signed-in users.
 */
class Capabilities implements IPublicCapability {
	private const FEATURES = ['item-images', 'list-order', 'invite-codes', 'guest-names'];

	public function __construct(
		private IAppManager $appManager,
		private IUserSession $userSession,
	) {
	}

	public function getCapabilities(): array {
		if (!$this->userSession->isLoggedIn()) {
			return [Application::APP_ID => ['features' => self::FEATURES]];
		}
		$serverLimit = IniSize::uploadLimit();
		return [
			Application::APP_ID => [
				'version' => $this->appManager->getAppVersion(Application::APP_ID),
				'features' => self::FEATURES,
				'itemImages' => [
					'maxUploadBytes' => $serverLimit === null
						? ImageProcessor::MAX_UPLOAD_BYTES
						: min(ImageProcessor::MAX_UPLOAD_BYTES, $serverLimit),
					'maxSide' => ImageProcessor::MAX_SIDE,
					'thumbSide' => ImageProcessor::THUMB_SIDE,
				],
			],
		];
	}
}
