<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\BackupFormatException;
use OCA\Shopping_List\Service\BackupService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * A plain controller rather than an OCSController: a file download cannot be
 * wrapped in an OCS envelope, and the two base classes cannot be combined, so
 * both routes live here as ordinary app routes.
 */
class BackupController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private BackupService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function download(): DataDownloadResponse {
		$backup = $this->service->export($this->userId);
		$filename = 'shopping-list-backup-' . date('Y-m-d') . '.json';

		return new DataDownloadResponse(
			json_encode($backup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
			$filename,
			'application/json',
		);
	}

	#[NoAdminRequired]
	public function restore(): JSONResponse {
		// The whole decoded backup arrives as the request body.
		$payload = $this->request->getParams();
		unset($payload['_route']);

		try {
			return new JSONResponse($this->service->import($this->userId, $payload));
		} catch (BackupFormatException $e) {
			return new JSONResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
		}
	}
}
