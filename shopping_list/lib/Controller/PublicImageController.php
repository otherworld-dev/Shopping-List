<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PasswordRequiredException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\AnonRateLimit;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\IRequest;

/**
 * Item photos on a public share link. Its own class rather than a method on
 * ImageController because nobody is signed in here, so a userId cannot be
 * injected. The rate limit is per method and IP and counts every request;
 * 300 a minute leaves room for a long list to load its thumbnails, and the
 * immutable caching means a reload asks for none of them again.
 */
class PublicImageController extends Controller {
	use ItemImageResponseTrait;

	public function __construct(
		string $appName,
		IRequest $request,
		private PublicShareAccess $access,
		private ItemImageService $images,
	) {
		parent::__construct($appName, $request);
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 300, period: 60)]
	public function show(string $token, int $id, string $key): Response {
		return $this->serve($token, $id, $key, false);
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 300, period: 60)]
	public function thumbnail(string $token, int $id, string $key): Response {
		return $this->serve($token, $id, $key, true);
	}

	private function serve(string $token, int $id, string $key, bool $thumbnail): Response {
		try {
			$share = $this->access->resolve($token);
			return $this->imageResponse($this->images->getFile($share->getListId(), $id, $key, $thumbnail));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}
}
