<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\IRequest;

/**
 * Item photos for signed-in users. Plain routes, not OCS, because the body
 * is a JPEG. No CSRF token: an <img> tag cannot send one, and these only
 * read, behind the same list access check as the items themselves.
 */
class ImageController extends Controller {
	use ItemImageResponseTrait;

	public function __construct(
		string $appName,
		IRequest $request,
		private ListService $listService,
		private ItemImageService $images,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function show(int $listId, int $id, string $key): Response {
		return $this->serve($listId, $id, $key, false);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function thumbnail(int $listId, int $id, string $key): Response {
		return $this->serve($listId, $id, $key, true);
	}

	private function serve(int $listId, int $id, string $key, bool $thumbnail): Response {
		try {
			$this->listService->assertAccess($listId, $this->userId);
			return $this->imageResponse($this->images->getFile($listId, $id, $key, $thumbnail));
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}
}
