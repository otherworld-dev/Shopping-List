<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\BackgroundJob\SendAddedItemNotifications;
use OCA\Shopping_List\Db\AddedItem;
use OCA\Shopping_List\Db\AddedItemMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\AddedItemNotifications;
use OCA\Shopping_List\Service\PushService;
use OCA\Shopping_List\Service\UserSettingsService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJobList;
use OCP\IUserManager;
use OCP\Notification\IManager as INotificationManager;
use OCP\Notification\INotification;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class AddedItemNotificationsTest extends TestCase {
	private AddedItemMapper&MockObject $added;
	private PushService&MockObject $push;
	private ShoppingListMapper&MockObject $lists;
	private UserSettingsService&MockObject $settings;
	private INotificationManager&MockObject $notifications;
	private IJobList&MockObject $jobs;
	private AddedItemNotifications $service;
	/** @var string[] who has turned these off */
	private array $optedOut = [];
	/** @var array<int, array{string, array}> each notification sent, as [user, subject parameters] */
	private array $sent = [];
	/** @var string[] the user of each notification taken away first */
	private array $processed = [];
	/** Unread notifications getCount() reports */
	private int $unread = 0;

	protected function setUp(): void {
		$this->added = $this->createMock(AddedItemMapper::class);
		$this->push = $this->createMock(PushService::class);
		$this->push->method('listParticipants')->willReturn(['adam', 'ben', 'cara']);
		$this->lists = $this->createMock(ShoppingListMapper::class);
		$this->settings = $this->createMock(UserSettingsService::class);
		$this->settings->method('notifyAdds')->willReturnCallback(fn (string $u) => !in_array($u, $this->optedOut, true));
		$users = $this->createMock(IUserManager::class);
		$users->method('getDisplayName')->willReturnMap([['ben', 'Ben Jones']]);
		$this->notifications = $this->createMock(INotificationManager::class);
		$this->notifications->method('createNotification')->willReturnCallback(fn () => $this->notification());
		$this->notifications->method('notify')->willReturnCallback(function (INotification $n) {
			$this->sent[] = [$n->getUser(), $n->getSubjectParameters()];
		});
		$this->notifications->method('markProcessed')->willReturnCallback(function (INotification $n) {
			$this->processed[] = $n->getUser();
		});
		$this->notifications->method('getCount')->willReturnCallback(fn () => $this->unread);
		$this->jobs = $this->createMock(IJobList::class);
		$time = $this->createMock(ITimeFactory::class);
		$time->method('getTime')->willReturn(1_800_000_000);
		$this->service = new AddedItemNotifications(
			$this->added,
			$this->push,
			$this->lists,
			$this->settings,
			$users,
			$this->notifications,
			$this->jobs,
			$time,
			$this->createMock(LoggerInterface::class),
		);
	}

	/** A notification that keeps what it is given, as the real one does */
	private function notification(): INotification {
		$state = ['user' => '', 'params' => []];
		$n = $this->createMock(INotification::class);
		foreach (['setApp', 'setObject', 'setDateTime'] as $setter) {
			$n->method($setter)->willReturnSelf();
		}
		$n->method('setUser')->willReturnCallback(function (string $u) use (&$state, $n) {
			$state['user'] = $u;
			return $n;
		});
		$n->method('setSubject')->willReturnCallback(function (string $s, array $p) use (&$state, $n) {
			$state['params'] = $p;
			return $n;
		});
		$n->method('getUser')->willReturnCallback(function () use (&$state) {
			return $state['user'];
		});
		$n->method('getSubjectParameters')->willReturnCallback(function () use (&$state) {
			return $state['params'];
		});
		return $n;
	}

	private static function row(int $id, string $user, string $actor, string $item, bool $notified = false): AddedItem {
		$row = new AddedItem();
		$row->setId($id);
		$row->setListId(5);
		$row->setUserId($user);
		$row->setActor($actor);
		$row->setItemName($item);
		$row->setNotified($notified);
		return $row;
	}

	public function testAnAddIsNotedForEveryoneElseOnTheList(): void {
		$noted = [];
		$this->added->method('add')->willReturnCallback(function (int $list, string $user, string $actor, string $item) use (&$noted) {
			$noted[] = [$list, $user, $actor, $item];
			return new AddedItem();
		});

		$this->service->itemAdded(5, 'Milk', 'ben');

		self::assertSame([[5, 'adam', 'Ben Jones', 'Milk'], [5, 'cara', 'Ben Jones', 'Milk']], $noted);
	}

	public function testSomeoneWhoTurnedThemOffIsLeftOut(): void {
		$this->optedOut = ['cara'];
		$this->added->expects(self::once())->method('add')->with(5, 'adam', 'Ben Jones', 'Milk');

		$this->service->itemAdded(5, 'Milk', 'ben');
	}

	public function testAGuestIsSomeoneElseToEveryone(): void {
		$this->added->expects(self::exactly(3))->method('add')
			->with(5, self::anything(), 'Anna', 'Milk');

		$this->service->itemAdded(5, 'Milk', null, 'Anna');
	}

	public function testTheFirstAddQueuesTheBatchAndLaterOnesJoinIt(): void {
		$this->jobs->method('has')->willReturnOnConsecutiveCalls(false, true);
		$this->jobs->expects(self::once())->method('scheduleAfter')
			->with(SendAddedItemNotifications::class, 1_800_000_000 + AddedItemNotifications::DELAY, ['listId' => 5]);

		$this->service->itemAdded(5, 'Milk', 'ben');
		$this->service->itemAdded(5, 'Eggs', 'ben');
	}

	public function testNobodyToTellQueuesNothing(): void {
		$this->optedOut = ['adam', 'cara'];
		$this->added->expects(self::never())->method('add');
		$this->jobs->expects(self::never())->method('scheduleAfter');

		$this->service->itemAdded(5, 'Milk', 'ben');
	}

	public function testAFailureNeverStopsTheAdd(): void {
		$this->added->method('add')->willThrowException(new \RuntimeException('database gone'));

		$this->service->itemAdded(5, 'Milk', 'ben');
		$this->addToAssertionCount(1);
	}

	public function testABatchIsOneNotificationPerPerson(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->added->method('findByList')->willReturn([
			self::row(1, 'adam', 'Ben Jones', 'Milk'),
			self::row(2, 'cara', 'Ben Jones', 'Milk'),
			self::row(3, 'adam', 'Ben Jones', 'Eggs'),
			self::row(4, 'cara', 'Ben Jones', 'Eggs'),
		]);
		$this->added->expects(self::exactly(2))->method('markNotified');

		$this->service->send(5);

		$expected = ['actors' => ['Ben Jones'], 'actorCount' => 1, 'items' => ['Milk', 'Eggs'], 'count' => 2];
		self::assertSame([['adam', $expected], ['cara', $expected]], $this->sent);
		// Each replaces whatever that person had for the list
		self::assertSame(['adam', 'cara'], $this->processed);
	}

	public function testAnUnreadNotificationIsAddedTo(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->unread = 1;
		$this->added->method('findByList')->willReturn([
			self::row(1, 'adam', 'Ben Jones', 'Milk', true),
			self::row(2, 'adam', 'Anna', 'Eggs'),
		]);
		$this->added->expects(self::never())->method('deleteByIds');
		$this->added->expects(self::once())->method('markNotified')->with([2]);

		$this->service->send(5);

		self::assertSame([['adam', ['actors' => ['Anna', 'Ben Jones'], 'actorCount' => 2, 'items' => ['Milk', 'Eggs'], 'count' => 2]]], $this->sent);
	}

	public function testAReadNotificationStartsAFreshOne(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->unread = 0;
		$this->added->method('findByList')->willReturn([
			self::row(1, 'adam', 'Ben Jones', 'Milk', true),
			self::row(2, 'adam', 'Anna', 'Eggs'),
		]);
		$this->added->expects(self::once())->method('deleteByIds')->with([1]);

		$this->service->send(5);

		self::assertSame([['adam', ['actors' => ['Anna'], 'actorCount' => 1, 'items' => ['Eggs'], 'count' => 1]]], $this->sent);
	}

	public function testNothingNewSendsNothing(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->added->method('findByList')->willReturn([self::row(1, 'adam', 'Ben Jones', 'Milk', true)]);
		$this->notifications->expects(self::never())->method('notify');

		$this->service->send(5);
	}

	public function testSomeoneNoLongerOnTheListIsDropped(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->added->method('findByList')->willReturn([self::row(1, 'dave', 'Ben Jones', 'Milk')]);
		$this->added->expects(self::once())->method('deleteByIds')->with([1]);
		$this->notifications->expects(self::never())->method('notify');

		$this->service->send(5);
	}

	public function testSomeoneWhoTurnedThemOffSinceIsDropped(): void {
		$this->lists->method('find')->willReturn(new ShoppingList());
		$this->optedOut = ['adam'];
		$this->added->method('findByList')->willReturn([self::row(1, 'adam', 'Ben Jones', 'Milk')]);
		$this->added->expects(self::once())->method('deleteByIds')->with([1]);
		$this->notifications->expects(self::never())->method('notify');

		$this->service->send(5);
	}

	public function testADeletedListSendsNothingAndClearsUp(): void {
		$this->lists->method('find')->willThrowException(new DoesNotExistException(''));
		$this->added->expects(self::once())->method('deleteByList')->with(5);
		$this->notifications->expects(self::never())->method('notify');

		$this->service->send(5);
	}

	public function testTheNotificationCarriesAFewNamesAndTheTotals(): void {
		$rows = [];
		foreach (['Milk', 'Eggs', 'Bread', 'Jam', 'Tea', 'Rice', 'Oats'] as $i => $item) {
			$rows[] = self::row($i + 1, 'adam', ['Ben', 'Anna', 'Cara', 'Dev'][$i % 4], $item);
		}

		self::assertSame([
			'actors' => ['Cara', 'Anna', 'Ben'],
			'actorCount' => 4,
			'items' => ['Milk', 'Eggs', 'Bread', 'Jam', 'Tea'],
			'count' => 7,
		], AddedItemNotifications::parameters($rows));
	}
}
