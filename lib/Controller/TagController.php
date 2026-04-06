<?php

declare(strict_types=1);

namespace OCA\ShoppingList\Controller;

use OCA\ShoppingList\Service\NoPermissionException;
use OCA\ShoppingList\Service\NotFoundException;
use OCA\ShoppingList\Service\TagService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class TagController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private TagService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function index(): DataResponse {
		return new DataResponse($this->service->findAll($this->userId));
	}

	#[NoAdminRequired]
	public function create(string $name): DataResponse {
		return new DataResponse($this->service->create($name, $this->userId), Http::STATUS_CREATED);
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
