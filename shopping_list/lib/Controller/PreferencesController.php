<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCA\Shopping_List\Exception\NoPermissionException;
use OCA\Shopping_List\Service\ListService;
use OCP\AppFramework\OCSController;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class PreferencesController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private string $userId,
		private UserListPreferenceMapper $preferenceMapper,
		private ListService $listService,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function update(int $id, bool $isPinned): DataResponse {
		try {
			// Verify user has access to the list
			$this->listService->find($id, $this->userId);

			// Upsert preference
			$pref = $this->preferenceMapper->upsert($this->userId, $id, $isPinned);

			return new DataResponse($pref);
		} catch (DoesNotExistException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}
}
