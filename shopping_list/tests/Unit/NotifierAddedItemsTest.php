<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Notification\Notifier;
use OCA\Shopping_List\Service\AddedItemNotifications;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\AlreadyProcessedException;
use OCP\Notification\INotification;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** How an "added to your list" notification reads. */
class NotifierAddedItemsTest extends TestCase {
	private ListService&MockObject $lists;
	private Notifier $notifier;
	private array $parsed = [];

	protected function setUp(): void {
		$l = $this->createMock(IL10N::class);
		$l->method('t')->willReturnCallback(fn (string $text, array $p = []) => vsprintf($text, $p));
		$l->method('n')->willReturnCallback(
			fn (string $one, string $many, int $count, array $p = []) => vsprintf(str_replace('%n', (string)$count, $count === 1 ? $one : $many), $p),
		);
		$factory = $this->createMock(IFactory::class);
		$factory->method('get')->willReturn($l);
		$urls = $this->createMock(IURLGenerator::class);
		$urls->method('linkToRouteAbsolute')->willReturnCallback(
			fn (string $route, array $args) => 'https://cloud.example/apps/shopping_list/?' . http_build_query($args),
		);
		$urls->method('imagePath')->willReturn('/apps/shopping_list/img/app.svg');
		$urls->method('getAbsoluteURL')->willReturnArgument(0);
		$this->lists = $this->createMock(ListService::class);
		$this->notifier = new Notifier($factory, $urls, $this->lists);
	}

	private function notification(array $params): INotification {
		$n = $this->createMock(INotification::class);
		$n->method('getApp')->willReturn('shopping_list');
		$n->method('getSubject')->willReturn(AddedItemNotifications::SUBJECT);
		$n->method('getObjectId')->willReturn('5');
		$n->method('getUser')->willReturn('adam');
		$n->method('getSubjectParameters')->willReturn($params);
		foreach (['setParsedSubject' => 'subject', 'setParsedMessage' => 'message', 'setLink' => 'link'] as $setter => $key) {
			$n->method($setter)->willReturnCallback(function (string $v) use ($key, $n) {
				$this->parsed[$key] = $v;
				return $n;
			});
		}
		$n->method('setIcon')->willReturnSelf();
		return $n;
	}

	private function list(string $title): void {
		$list = new ShoppingList();
		$list->setTitle($title);
		$this->lists->method('find')->with(5, 'adam')->willReturn($list);
	}

	public function testOnePersonOneItem(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Sam', 'guest' => false]], 'actorCount' => 1, 'items' => ['Milk'], 'count' => 1]), 'en');

		self::assertSame('Sam added an item to Weekly shop', $this->parsed['subject']);
		self::assertSame('Milk', $this->parsed['message']);
	}

	public function testOnePersonSeveralItems(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Sam', 'guest' => false]], 'actorCount' => 1, 'items' => ['Milk', 'Eggs', 'Bread'], 'count' => 3]), 'en');

		self::assertSame('Sam added 3 items to Weekly shop', $this->parsed['subject']);
		self::assertSame('Milk, Eggs, Bread', $this->parsed['message']);
	}

	public function testTwoPeople(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Sam', 'guest' => false], ['name' => 'Anna', 'guest' => false]], 'actorCount' => 2, 'items' => ['Milk', 'Eggs'], 'count' => 2]), 'en');

		self::assertSame('Sam and Anna added 2 items to Weekly shop', $this->parsed['subject']);
	}

	public function testMorePeopleAndMoreItemsThanItNames(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification([
			'actors' => [['name' => 'Sam', 'guest' => false], ['name' => 'Anna', 'guest' => false], ['name' => 'Ben', 'guest' => false]], 'actorCount' => 4,
			'items' => ['Milk', 'Eggs', 'Bread', 'Jam', 'Tea'], 'count' => 8,
		]), 'en');

		self::assertSame('Sam and others added 8 items to Weekly shop', $this->parsed['subject']);
		self::assertSame('Milk, Eggs, Bread, Jam, Tea and 3 more', $this->parsed['message']);
	}

	public function testAGuestWithNoName(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => '', 'guest' => true]], 'actorCount' => 1, 'items' => ['Milk'], 'count' => 1]), 'en');

		self::assertSame('A guest added an item to Weekly shop', $this->parsed['subject']);
	}

	public function testANamedGuestIsMarkedAsAGuest(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Adam', 'guest' => true]], 'actorCount' => 1, 'items' => ['Milk'], 'count' => 1]), 'en');

		self::assertSame('Adam (guest) added an item to Weekly shop', $this->parsed['subject']);
	}

	public function testItOpensTheList(): void {
		$this->list('Weekly shop');
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Sam', 'guest' => false]], 'actorCount' => 1, 'items' => ['Milk'], 'count' => 1]), 'en');

		self::assertSame('https://cloud.example/apps/shopping_list/?list=5', $this->parsed['link']);
	}

	public function testAListThatIsGoneOrNoLongerSharedTakesItAway(): void {
		$this->lists->method('find')->willThrowException(new NotFoundException('List not found'));

		$this->expectException(AlreadyProcessedException::class);
		$this->notifier->prepare($this->notification(['actors' => [['name' => 'Sam', 'guest' => false]], 'actorCount' => 1, 'items' => ['Milk'], 'count' => 1]), 'en');
	}
}
