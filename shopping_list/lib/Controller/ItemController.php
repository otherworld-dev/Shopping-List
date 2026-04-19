<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class ItemController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ItemService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function index(int $listId): DataResponse {
		try {
			return new DataResponse($this->service->findAll($listId, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	#[NoAdminRequired]
	public function create(
		int $listId,
		string $name,
		?string $quantity = null,
		?string $unit = null,
		?int $shopAreaId = null,
		bool $areaExplicit = false,
	): DataResponse {
		try {
			$item = $this->service->create($listId, $name, $quantity, $unit, $shopAreaId, $this->userId, $areaExplicit);
			return new DataResponse($item, Http::STATUS_CREATED);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function update(int $listId, int $id): DataResponse {
		try {
			$fields = [];
			$params = $this->request->getParams();
			foreach (['name', 'quantity', 'unit', 'shopAreaId', 'sortOrder', 'areaExplicit'] as $field) {
				if (array_key_exists($field, $params)) {
					$fields[$field] = $params[$field];
				}
			}
			return new DataResponse($this->service->update($id, $fields, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function check(int $listId, int $id, bool $checked): DataResponse {
		try {
			return new DataResponse($this->service->check($id, $checked, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function destroy(int $listId, int $id): DataResponse {
		try {
			$this->service->delete($id, $this->userId);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function reorder(int $listId, array $sortedIds): DataResponse {
		try {
			$this->service->reorder($listId, $sortedIds, $this->userId);
			return new DataResponse(null);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function clearChecked(int $listId): DataResponse {
		try {
			$this->service->clearChecked($listId, $this->userId);
			return new DataResponse(null);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function uncheckAll(int $listId): DataResponse {
		try {
			$this->service->uncheckAll($listId, $this->userId);
			return new DataResponse(null);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}
}
