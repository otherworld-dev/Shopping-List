<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class ShopAreaController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ShopAreaService $service,
		private ListService $listService,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Get areas for a list (resolves to list owner's areas).
	 */
	#[NoAdminRequired]
	public function index(int $listId): DataResponse {
		try {
			$list = $this->listService->find($listId, $this->userId);
			return new DataResponse($this->service->findAll($list->getUserId()));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Get the current user's own areas.
	 */
	#[NoAdminRequired]
	public function mine(): DataResponse {
		return new DataResponse($this->service->findAll($this->userId));
	}

	#[NoAdminRequired]
	public function create(string $name, ?string $color = null, ?array $keywords = null): DataResponse {
		$area = $this->service->create($name, $color, $keywords, $this->userId);
		return new DataResponse($area, Http::STATUS_CREATED);
	}

	#[NoAdminRequired]
	public function update(int $id, ?string $name = null, ?string $color = null, ?int $sortOrder = null, ?array $keywords = null): DataResponse {
		try {
			return new DataResponse($this->service->update($id, $name, $color, $sortOrder, $keywords, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function destroy(int $id): DataResponse {
		try {
			$this->service->delete($id, $this->userId);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}
}
