<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PasswordRequiredException;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ShareService;
use DateTime;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\AnonRateLimit;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;
use OCP\ISession;

class PublicListController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ShareService $shareService,
		private ShoppingListMapper $listMapper,
		private ItemMapper $itemMapper,
		private ShopAreaMapper $areaMapper,
		private ISession $session,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Validate token and check session-based password auth.
	 */
	private function authenticate(string $token): ListShare {
		// Validate token exists and hasn't expired (no password check)
		$share = $this->shareService->findValidShare($token);

		// For password-protected shares, require session auth
		if ($share->getPasswordHash() !== null) {
			$sessionKey = 'shopping_list_public_' . $token;
			if (!$this->session->get($sessionKey)) {
				throw new PasswordRequiredException('Password required');
			}
		}

		return $share;
	}

	private function assertWrite(ListShare $share): void {
		if ($share->getPermission() < 1) {
			throw new NoPermissionException('Read-only access');
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function show(string $token): DataResponse {
		try {
			$share = $this->authenticate($token);
			$list = $this->listMapper->find($share->getListId());
			return new DataResponse([
				'title' => $list->getTitle(),
				'permission' => $share->getPermission(),
			]);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 5, period: 60)]
	public function auth(string $token): DataResponse {
		try {
			$share = $this->shareService->validatePublicAccess($token, $this->request->getParam('password'));
			// Store auth in session
			$sessionKey = 'shopping_list_public_' . $token;
			$this->session->set($sessionKey, true);
			return new DataResponse([
				'title' => $this->listMapper->find($share->getListId())->getTitle(),
				'permission' => $share->getPermission(),
			]);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException) {
			return new DataResponse(['message' => 'Invalid password'], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function items(string $token): DataResponse {
		try {
			$share = $this->authenticate($token);
			return new DataResponse($this->itemMapper->findAllByList($share->getListId()));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function createItem(string $token): DataResponse {
		try {
			$share = $this->authenticate($token);
			$this->assertWrite($share);

			$name = trim((string)$this->request->getParam('name', ''));
			if ($name === '' || mb_strlen($name) > 255) {
				return new DataResponse(['message' => 'Invalid name'], Http::STATUS_BAD_REQUEST);
			}

			$shopAreaId = $this->request->getParam('shopAreaId');
			$item = new Item();
			$item->setListId($share->getListId());
			$item->setName($name);
			$item->setQuantity($this->request->getParam('quantity') ?? '1');
			$item->setUnit($this->request->getParam('unit'));
			$item->setShopAreaId($shopAreaId !== null ? (int)$shopAreaId : null);
			$item->setChecked(false);
			$item->setSortOrder(0);
			$now = new DateTime();
			$item->setCreatedAt($now);
			$item->setUpdatedAt($now);

			return new DataResponse($this->itemMapper->insert($item), Http::STATUS_CREATED);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function updateItem(string $token, int $id): DataResponse {
		try {
			$share = $this->authenticate($token);
			$this->assertWrite($share);

			$item = $this->itemMapper->find($id);
			if ($item->getListId() !== $share->getListId()) {
				throw new NotFoundException('Item not found');
			}

			$params = $this->request->getParams();
			if (isset($params['name'])) {
				$item->setName($params['name']);
			}
			if (array_key_exists('quantity', $params)) {
				$item->setQuantity($params['quantity']);
			}
			if (array_key_exists('unit', $params)) {
				$item->setUnit($params['unit']);
			}
			if (array_key_exists('shopAreaId', $params)) {
				$item->setShopAreaId($params['shopAreaId']);
			}
			$item->setUpdatedAt(new DateTime());

			return new DataResponse($this->itemMapper->update($item));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function checkItem(string $token, int $id, bool $checked): DataResponse {
		try {
			$share = $this->authenticate($token);
			$this->assertWrite($share);

			$item = $this->itemMapper->find($id);
			if ($item->getListId() !== $share->getListId()) {
				throw new NotFoundException('Item not found');
			}

			$item->setChecked($checked);
			$item->setUpdatedAt(new DateTime());

			return new DataResponse($this->itemMapper->update($item));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function deleteItem(string $token, int $id): DataResponse {
		try {
			$share = $this->authenticate($token);
			$this->assertWrite($share);

			$item = $this->itemMapper->find($id);
			if ($item->getListId() !== $share->getListId()) {
				throw new NotFoundException('Item not found');
			}

			$this->itemMapper->delete($item);
			return new DataResponse(null, Http::STATUS_NO_CONTENT);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function reorder(string $token, array $sortedIds): DataResponse {
		try {
			$share = $this->authenticate($token);
			$this->assertWrite($share);
			$listId = $share->getListId();

			// Validate all IDs belong to this list
			$listItems = $this->itemMapper->findAllByList($listId);
			$validIds = array_map(fn($i) => $i->getId(), $listItems);
			foreach ($sortedIds as $id) {
				if (!in_array((int)$id, $validIds, true)) {
					throw new NotFoundException('Item not found');
				}
			}

			foreach ($sortedIds as $index => $id) {
				$this->itemMapper->updateSortOrder((int)$id, $index);
			}
			return new DataResponse(null);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException $e) {
			return new DataResponse(['message' => $e->getMessage()], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function areas(string $token): DataResponse {
		try {
			$share = $this->authenticate($token);
			return new DataResponse($this->areaMapper->findByList($share->getListId()));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}
}
