<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\ImageTooLargeException;
use OCA\Shopping_List\Service\IniSize;
use OCA\Shopping_List\Service\InvalidImageException;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

/**
 * Upload and removal of an item's photo, as OCS so the web app and the
 * Android app make the same call. Serving the bytes is ImageController's
 * job: a JPEG does not fit in the OCS envelope.
 */
class ItemImageController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ItemImageService $service,
		private string $userId,
	) {
		parent::__construct($appName, $request);
	}

	/** Multipart form upload with the photo in the field "image". Answers with the updated item. */
	#[NoAdminRequired]
	public function upload(int $listId, int $id): DataResponse {
		$file = $this->request->getUploadedFile('image');
		if (!is_array($file)) {
			// Once post_max_size is exceeded PHP drops the whole body, so nothing
			// reaches $_FILES. The Content-Length header still says why.
			$limit = IniSize::uploadLimit();
			if ($limit !== null && (int)$this->request->getHeader('Content-Length') > $limit) {
				return $this->tooLarge('Upload exceeds the server limit of ' . IniSize::human($limit));
			}
			return new DataResponse(['message' => 'No image uploaded'], Http::STATUS_BAD_REQUEST);
		}
		if (is_array($file['name'] ?? null)) {
			return new DataResponse(['message' => 'One image at a time'], Http::STATUS_BAD_REQUEST);
		}
		$error = (int)($file['error'] ?? UPLOAD_ERR_NO_FILE);
		if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
			return $this->tooLarge('Upload exceeds the server limit of ' . (string)ini_get('upload_max_filesize'));
		}
		if ($error !== UPLOAD_ERR_OK) {
			return new DataResponse(['message' => 'Upload failed'], Http::STATUS_BAD_REQUEST);
		}
		if ((int)($file['size'] ?? 0) > ImageProcessor::MAX_UPLOAD_BYTES) {
			return $this->tooLarge('Image is larger than ' . IniSize::human(ImageProcessor::MAX_UPLOAD_BYTES));
		}
		$raw = @file_get_contents((string)($file['tmp_name'] ?? ''));
		if ($raw === false) {
			return new DataResponse(['message' => 'Upload failed'], Http::STATUS_BAD_REQUEST);
		}

		try {
			return new DataResponse($this->service->attach($listId, $id, $raw, $this->userId));
		} catch (ImageTooLargeException $e) {
			return $this->tooLarge($e->getMessage());
		} catch (InvalidImageException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_UNSUPPORTED_MEDIA_TYPE);
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	#[NoAdminRequired]
	public function remove(int $listId, int $id): DataResponse {
		try {
			return new DataResponse($this->service->remove($listId, $id, $this->userId));
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_NOT_FOUND);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		}
	}

	private function tooLarge(string $message): DataResponse {
		return new DataResponse(['message' => $message], Http::STATUS_REQUEST_ENTITY_TOO_LARGE);
	}
}
