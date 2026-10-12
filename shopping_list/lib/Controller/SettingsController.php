<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\UserSettingsService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class SettingsController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private UserSettingsService $settings,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function index(): DataResponse {
		return new DataResponse($this->settings->forUser($this->userId));
	}

	/** PATCH: only the keys sent change. Answers with every setting. */
	#[NoAdminRequired]
	public function update(?bool $showImages = null, ?string $listSort = null, ?bool $showOwnName = null, ?string $whatsNewSeen = null): DataResponse {
		try {
			if ($listSort !== null) {
				$this->settings->setListSort($this->userId, $listSort);
			}
			if ($whatsNewSeen !== null) {
				$this->settings->setWhatsNewSeen($this->userId, $whatsNewSeen);
			}
		} catch (\InvalidArgumentException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
		}
		if ($showImages !== null) {
			$this->settings->setShowImages($this->userId, $showImages);
		}
		if ($showOwnName !== null) {
			$this->settings->setShowOwnName($this->userId, $showOwnName);
		}
		return new DataResponse($this->settings->forUser($this->userId));
	}
}
