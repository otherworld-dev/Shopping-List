<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\ShareService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class ShareController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ShareService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function index(int $listId): DataResponse {
		try {
			return new DataResponse($this->service->getShares($listId, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		}
	}

	#[NoAdminRequired]
	public function create(int $listId, string $sharedWith, int $shareType, int $permission): DataResponse {
		try {
			$share = $this->service->share($listId, $sharedWith, $shareType, $permission, $this->userId);
			return new DataResponse($share, Http::STATUS_CREATED);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (\InvalidArgumentException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
		}
	}

	#[NoAdminRequired]
	public function update(int $id, int $permission): DataResponse {
		try {
			return new DataResponse($this->service->updatePermission($id, $permission, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function destroy(int $id): DataResponse {
		try {
			$this->service->unshare($id, $this->userId);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	// --- Link share management ---

	#[NoAdminRequired]
	public function createLink(int $listId): DataResponse {
		$permission = (int)($this->request->getParam('permission', 0));
		$password = $this->request->getParam('password');
		$expiresAt = $this->request->getParam('expiresAt');

		try {
			$share = $this->service->createLinkShare($listId, $permission, $password, $expiresAt, $this->userId);
			return new DataResponse($share, Http::STATUS_CREATED);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function updateLink(int $id): DataResponse {
		$params = $this->request->getParams();
		$permission = isset($params['permission']) ? (int)$params['permission'] : null;
		$password = $params['password'] ?? null;
		$removePassword = !empty($params['removePassword']);
		$expiresAt = $params['expiresAt'] ?? null;
		$removeExpiry = !empty($params['removeExpiry']);

		try {
			$share = $this->service->updateLinkShare($id, $permission, $password, $removePassword, $expiresAt, $removeExpiry, $this->userId);
			return new DataResponse($share);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function destroyLink(int $id): DataResponse {
		try {
			$this->service->deleteLinkShare($id, $this->userId);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}
}
