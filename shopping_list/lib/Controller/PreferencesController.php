<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\AppInfo\Application;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IConfig;
use OCP\IRequest;

class PreferencesController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function getKeywords(): DataResponse {
		$value = $this->config->getUserValue(
			$this->userId,
			Application::APP_ID,
			'area_keywords',
			''
		);
		if ($value === '') {
			return new DataResponse(null);
		}
		return new DataResponse(json_decode($value, true));
	}

	#[NoAdminRequired]
	public function setKeywords(): DataResponse {
		$keywords = $this->request->getParam('keywords');
		if ($keywords === null) {
			return new DataResponse(['message' => 'Missing keywords'], Http::STATUS_BAD_REQUEST);
		}
		$this->config->setUserValue(
			$this->userId,
			Application::APP_ID,
			'area_keywords',
			json_encode($keywords)
		);
		return new DataResponse(null);
	}
}
