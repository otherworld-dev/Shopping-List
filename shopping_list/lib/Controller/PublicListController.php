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
use OCA\Shopping_List\Service\ShopAreaService;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\GuestName;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use DateTime;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\AnonRateLimit;
use OCP\AppFramework\Http\Attribute\BruteForceProtection;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class PublicListController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private ShareService $shareService,
		private ShoppingListMapper $listMapper,
		private ItemMapper $itemMapper,
		private ShopAreaMapper $areaMapper,
		private ShopAreaService $areaService,
		private PublicShareAccess $access,
		private ItemService $itemService,
		private ItemImageService $images,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Validate token and check session-based password auth.
	 */
	private function authenticate(string $token): ListShare {
		return $this->access->resolve($token);
	}

	private function assertWrite(ListShare $share): void {
		$this->access->assertWrite($share);
	}

	/**
	 * @throws NotFoundException when the item is gone or belongs to another list
	 */
	private function findItem(ListShare $share, int $id): Item {
		try {
			$item = $this->itemMapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Item not found');
		}
		if ($item->getListId() !== $share->getListId()) {
			throw new NotFoundException('Item not found');
		}
		return $item;
	}

	/**
	 * Shape items for the public: never members' user ids, and not their
	 * names either when the owner turned them off for the link; guests'
	 * names always show.
	 *
	 * @template T of Item|Item[]
	 * @param T $items
	 * @return T
	 */
	private function forLink(ListShare $share, Item|array $items): Item|array {
		foreach (is_array($items) ? $items : [$items] as $item) {
			$item->forPublic($share->showsNames());
		}
		return $items;
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
	#[BruteForceProtection(action: 'shopping_list_public_auth')]
	public function auth(string $token): DataResponse {
		try {
			$share = $this->shareService->validatePublicAccess($token, $this->request->getParam('password'));
			$this->access->grant($token);
			return new DataResponse([
				'title' => $this->listMapper->find($share->getListId())->getTitle(),
				'permission' => $share->getPermission(),
			]);
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NoPermissionException) {
			// A wrong password slows down this address's next tries
			$response = new DataResponse(['message' => 'Invalid password'], Http::STATUS_FORBIDDEN);
			$response->throttle(['token' => $token]);
			return $response;
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Turn an invite code typed into the Android app into the link's token.
	 * It gives nothing the link wouldn't: a protected list still asks for
	 * its password through auth().
	 */
	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 10, period: 60)]
	#[BruteForceProtection(action: 'shopping_list_public_code')]
	public function resolveCode(string $code): DataResponse {
		try {
			$share = $this->shareService->findShareByCode($code);
			return new DataResponse(['token' => $share->getToken()]);
		} catch (NotFoundException) {
			// A wrong guess slows down this address's next ones; the input is
			// cut short as it goes into the throttle log
			$response = new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
			$response->throttle(['code' => mb_substr($code, 0, 16)]);
			return $response;
		}
	}

	#[PublicPage]
	#[NoCSRFRequired]
	#[AnonRateLimit(limit: 30, period: 60)]
	public function items(string $token): DataResponse {
		try {
			$share = $this->authenticate($token);
			return new DataResponse($this->forLink($share, $this->itemMapper->findAllByList($share->getListId())));
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
			$item->setImageKey($this->images->rememberedKey($share->getListId(), $name));
			$item->setAddedBy(null);
			$item->setAddedByName(GuestName::clean($this->request->getParam('guestName')));
			$now = new DateTime();
			$item->setCreatedAt($now);
			$item->setUpdatedAt($now);

			return new DataResponse($this->forLink($share, $this->itemMapper->insert($item)), Http::STATUS_CREATED);
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

			$item = $this->findItem($share, $id);

			$params = $this->request->getParams();
			if (isset($params['name'])) {
				$renamed = ItemImageService::nameKey((string)$params['name']) !== ItemImageService::nameKey($item->getName());
				$item->setName($params['name']);
				if ($renamed) {
					$remembered = $this->images->rememberedKey($item->getListId(), (string)$params['name']);
					if ($remembered !== null) {
						$item->setImageKey($remembered);
					}
				}
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

			return new DataResponse($this->forLink($share, $this->itemMapper->update($item)));
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

			$item = $this->findItem($share, $id);

			$item->setChecked($checked);
			$item->setCheckedBy(null);
			$item->setCheckedByName($checked ? GuestName::clean($this->request->getParam('guestName')) : null);
			$item->setUpdatedAt(new DateTime());

			return new DataResponse($this->forLink($share, $this->itemMapper->update($item)));
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

			$item = $this->findItem($share, $id);

			$this->itemService->deleteEntity($item, '');
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
			return new DataResponse($this->areaService->findAll($share->getListId()));
		} catch (PasswordRequiredException) {
			return new DataResponse(['passwordRequired' => true], Http::STATUS_FORBIDDEN);
		} catch (NotFoundException) {
			return new DataResponse(['message' => 'Not found'], Http::STATUS_NOT_FOUND);
		}
	}
}
