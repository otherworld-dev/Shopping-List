<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicListController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ItemService;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCA\Shopping_List\Service\ShareService;
use OCA\Shopping_List\Service\ShopAreaService;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

class PublicListControllerGuestNameTest extends TestCase {
	private array $params = [];
	private ListShare $share;
	private ?Item $stored = null;

	private function controller(): PublicListController {
		$request = $this->createMock(IRequest::class);
		$request->method('getParam')->willReturnCallback(fn (string $k, $d = null) => $this->params[$k] ?? $d);
		$request->method('getParams')->willReturnCallback(fn () => $this->params);
		$this->share = $this->share ?? (function () {
			$s = new ListShare();
			$s->setListId(5);
			$s->setPermission(1);
			return $s;
		})();
		$access = $this->createMock(PublicShareAccess::class);
		$access->method('resolve')->willReturnCallback(fn () => $this->share);
		$items = $this->createMock(ItemMapper::class);
		$items->method('insert')->willReturnArgument(0);
		$items->method('update')->willReturnArgument(0);
		$items->method('find')->willReturnCallback(fn () => $this->stored);
		$items->method('findAllByList')->willReturnCallback(fn () => [$this->stored]);
		return new PublicListController(
			'shopping_list', $request,
			$this->createMock(ShareService::class),
			$this->createMock(ShoppingListMapper::class),
			$items,
			$this->createMock(ShopAreaMapper::class),
			$this->createMock(ShopAreaService::class),
			$access,
			$this->createMock(ItemService::class),
			$this->createMock(ItemImageService::class),
		);
	}

	private function item(array $set): Item {
		$i = new Item();
		$i->setId(9);
		$i->setListId(5);
		$i->setName('Milk');
		$i->setChecked(false);
		foreach ($set as $k => $v) {
			$i->{'set' . ucfirst($k)}($v);
		}
		return $this->stored = $i;
	}

	public function testAGuestAddsWithTheirName(): void {
		$this->params = ['name' => 'Milk', 'guestName' => "  Anna\u{202E} "];
		$data = $this->controller()->createItem('tok')->getData()->jsonSerialize();
		self::assertNull($data['addedBy']);
		self::assertSame('Anna', $data['addedByName']);
	}

	public function testAGuestCanStayAnonymous(): void {
		$this->params = ['name' => 'Milk'];
		$data = $this->controller()->createItem('tok')->getData()->jsonSerialize();
		self::assertNull($data['addedByName']);
	}

	public function testAGuestTickReplacesTheEarlierUser(): void {
		$this->item(['checked' => true, 'checkedBy' => 'ben', 'checkedByName' => 'Ben']);
		$this->params = ['guestName' => 'Anna'];
		$data = $this->controller()->checkItem('tok', 9, true)->getData()->jsonSerialize();
		self::assertNull($data['checkedBy']);
		self::assertSame('Anna', $data['checkedByName']);
	}

	public function testUntickingForgetsWhoTickedIt(): void {
		$this->item(['checked' => true, 'checkedByName' => 'Anna']);
		$data = $this->controller()->checkItem('tok', 9, false)->getData()->jsonSerialize();
		self::assertNull($data['checkedBy']);
		self::assertNull($data['checkedByName']);
	}

	public function testEditingCannotForgeTheAuthor(): void {
		$this->item(['addedBy' => 'ben', 'addedByName' => 'Ben']);
		$this->params = ['name' => 'Oat milk', 'addedBy' => null, 'addedByName' => 'Mallory', 'checkedByName' => 'Mallory'];
		$data = $this->controller()->updateItem('tok', 9)->getData()->jsonSerialize();
		self::assertSame('Ben', $data['addedByName']);
		self::assertFalse($data['addedByGuest']);
		self::assertNull($data['checkedByName']);
		self::assertSame('ben', $this->stored->getAddedBy());
	}

	public function testALinkNeverHandsOutMembersUserIds(): void {
		$this->item(['addedBy' => 'ben@example.com', 'addedByName' => 'Ben', 'checked' => true, 'checkedBy' => 'ben@example.com', 'checkedByName' => 'Ben']);

		$listed = $this->controller()->items('tok')->getData()[0]->jsonSerialize();
		self::assertNull($listed['addedBy']);
		self::assertNull($listed['checkedBy']);
		self::assertSame('Ben', $listed['addedByName']);
		self::assertFalse($listed['addedByGuest']);
	}

	public function testALinkWithoutNamesHidesMembersButNotGuests(): void {
		$this->share = new ListShare();
		$this->share->setListId(5);
		$this->share->setPermission(1);
		$this->share->setShowNames(false);
		$this->item(['addedBy' => 'ben', 'addedByName' => 'Ben', 'checked' => true, 'checkedByName' => 'Anna']);

		$listed = $this->controller()->items('tok')->getData()[0]->jsonSerialize();
		self::assertNull($listed['addedBy']);
		self::assertNull($listed['addedByName']);
		self::assertSame('Anna', $listed['checkedByName']);

		$this->params = ['guestName' => 'Zoë'];
		$checked = $this->controller()->checkItem('tok', 9, true)->getData()->jsonSerialize();
		self::assertNull($checked['addedByName']);
		self::assertSame('Zoë', $checked['checkedByName']);

		$this->params = ['name' => 'Bread'];
		$updated = $this->controller()->updateItem('tok', 9)->getData()->jsonSerialize();
		self::assertNull($updated['addedByName']);
	}
}
