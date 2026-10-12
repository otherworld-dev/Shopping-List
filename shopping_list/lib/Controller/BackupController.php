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
	public function download(): DataDownloadResponse|JSONResponse {
		try {
			$backup = $this->service->export($this->userId);
			$filename = 'shopping-list-backup-' . date('Y-m-d') . '.json';

			return new DataDownloadResponse(
				json_encode($backup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
				$filename,
				'application/json',
			);
		} catch (\Throwable $e) {
			return new JSONResponse(['message' => 'Could not build the backup file.'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Only the two fields the backup format defines are read as named
	 * parameters, so route and query parameters (e.g. a stray
	 * `?version=2` on the POST) can never contaminate the payload the way
	 * pulling the whole `getParams()` union would. Left untyped
	 * deliberately: a query-string shadow then arrives as a string rather
	 * than being coerced, and fails `parse()`'s strict version check
	 * instead of being silently accepted.
	 */
	#[NoAdminRequired]
	public function restore($version = null, $lists = null): JSONResponse {
		$payload = ['version' => $version, 'lists' => $lists];

		try {
			return new JSONResponse($this->service->import($this->userId, $payload));
		} catch (BackupFormatException $e) {
			return new JSONResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
		} catch (\Throwable $e) {
			return new JSONResponse(['message' => 'Could not restore the backup.'], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}
}
