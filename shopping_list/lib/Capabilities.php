<?php

declare(strict_types=1);

namespace OCA\Shopping_List;

use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\IniSize;
use OCP\App\IAppManager;
use OCP\Capabilities\ICapability;

/**
 * What this server's copy of the app can do, for the Android app to read
 * from /ocs/v2.php/cloud/capabilities at login instead of probing for 404s.
 */
class Capabilities implements ICapability {
	public function __construct(
		private IAppManager $appManager,
	) {
	}

	public function getCapabilities(): array {
		$serverLimit = IniSize::uploadLimit();
		return [
			Application::APP_ID => [
				'version' => $this->appManager->getAppVersion(Application::APP_ID),
				'features' => ['item-images'],
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
