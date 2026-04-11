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
	 * Get all areas for a list.
	 */
	#[NoAdminRequired]
	public function index(int $listId): DataResponse {
		try {
			$this->listService->assertAccess($listId, $this->userId);
			return new DataResponse($this->service->findAll($listId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	#[NoAdminRequired]
	public function create(int $listId, string $name, ?string $color = null, ?array $keywords = null): DataResponse {
		try {
			$this->listService->assertWriteAccess($listId, $this->userId);
			$area = $this->service->create($listId, $name, $color, $keywords);
			return new DataResponse($area, Http::STATUS_CREATED);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function update(int $listId, int $id, ?string $name = null, ?string $color = null, ?int $sortOrder = null, ?array $keywords = null): DataResponse {
		try {
			$this->listService->assertWriteAccess($listId, $this->userId);
			return new DataResponse($this->service->update($id, $listId, $name, $color, $sortOrder, $keywords));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function destroy(int $listId, int $id): DataResponse {
		try {
			$this->listService->assertWriteAccess($listId, $this->userId);
			$this->service->delete($id, $listId);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}
}
