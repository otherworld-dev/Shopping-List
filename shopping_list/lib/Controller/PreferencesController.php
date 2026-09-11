<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class PreferencesController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ListService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function update(int $id, bool $isPinned): DataResponse {
		try {
			return new DataResponse($this->service->setPinned($id, $isPinned, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}
}
