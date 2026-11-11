<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class ListController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ListService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function index(): DataResponse {
		return new DataResponse($this->service->findAll($this->userId));
	}

	/** This user's own order for one section of their lists. */
	#[NoAdminRequired]
	public function reorder(mixed $listIds = null): DataResponse {
		if (!is_array($listIds)) {
			return new DataResponse(['message' => 'listIds must be an array of list ids'], Http::STATUS_BAD_REQUEST);
		}
		foreach ($listIds as $id) {
			if (!self::isListId($id)) {
				return new DataResponse(['message' => 'listIds must contain only list ids'], Http::STATUS_BAD_REQUEST);
			}
		}
		try {
			return new DataResponse(['listIds' => $this->service->reorder($listIds, $this->userId)]);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	private static function isListId(mixed $id): bool {
		return is_int($id) || (is_string($id) && $id !== '' && ctype_digit($id));
	}

	#[NoAdminRequired]
	public function show(int $id): DataResponse {
		try {
			return new DataResponse($this->service->find($id, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	#[NoAdminRequired]
	public function create(string $title): DataResponse {
		return new DataResponse($this->service->create($title, $this->userId), Http::STATUS_CREATED);
	}

	#[NoAdminRequired]
	public function update(int $id, string $title): DataResponse {
		try {
			return new DataResponse($this->service->update($id, $title, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	/**
	 * The area this list's new items go to when no keyword places them;
	 * shopAreaId null for none. The field has to be there: a request that
	 * leaves it out is refused rather than read as "clear it".
	 */
	#[NoAdminRequired]
	public function setDefaultArea(int $id): DataResponse {
		$params = $this->request->getParams();
		if (!array_key_exists('shopAreaId', $params)) {
			return new DataResponse(['message' => 'shopAreaId is required (null for none)'], Http::STATUS_BAD_REQUEST);
		}
		$areaId = $params['shopAreaId'];
		if ($areaId !== null && !self::isListId($areaId)) {
			return new DataResponse(['message' => 'shopAreaId must be a shop area id or null'], Http::STATUS_BAD_REQUEST);
		}
		try {
			return new DataResponse($this->service->setDefaultArea($id, $areaId === null ? null : (int)$areaId, $this->userId));
		} catch (\InvalidArgumentException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
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
