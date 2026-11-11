<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

require_once __DIR__ . '/../stubs/NotifyPushQueue.php';

use OCA\NotifyPush\Queue\IQueue;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Db\ListShareMapper;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Db\ShoppingListMapper;
use OCA\Shopping_List\Service\PushService;
use OCP\IGroupManager;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;

/** Live updates through notify_push to everyone on a list. */
class PushServiceTest extends TestCase {
	/** @var list<array{user: string, message: string}> */
	private array $pushed = [];

	private function service(string $via = ''): PushService {
		$list = new ShoppingList();
		$list->setId(4);
		$list->setUserId('adam');
		$lists = $this->createMock(ShoppingListMapper::class);
		$lists->method('find')->willReturn($list);

		$share = new ListShare();
		$share->setListId(4);
		$share->setSharedWith('ben');
		$share->setSharedWithType(0);
		$shares = $this->createMock(ListShareMapper::class);
		$shares->method('findByList')->willReturn([$share]);

		$queue = $this->createMock(IQueue::class);
		$queue->method('push')->willReturnCallback(function (string $channel, $message): void {
			$this->pushed[] = ['user' => $message['user'], 'message' => $message['message']];
		});
		$container = $this->createMock(ContainerInterface::class);
		$container->method('get')->with('OCA\NotifyPush\Queue\IQueue')->willReturn($queue);

		$request = $this->createMock(IRequest::class);
		$request->method('getHeader')->willReturnCallback(fn (string $name) => $name === 'X-Shopping-List-Via' ? $via : '');

		return new PushService($lists, $shares, $this->createMock(IGroupManager::class), $container, $request);
	}

	public function testPushesToEveryoneOnTheListButWhoeverMadeTheChange(): void {
		$this->service()->notifyItemUpdate(4, 7, 'created', 'adam');
		self::assertSame([['user' => 'ben', 'message' => 'shopping_list_item_update']], $this->pushed);
	}

	public function testAChangeThroughAnAppReachesTheAccountItUsedToo(): void {
		// Home Assistant signed in as adam: adam's open web app didn't make the change, so it needs telling
		$this->service('Home Assistant')->notifyItemUpdate(4, 7, 'created', 'adam');
		self::assertEqualsCanonicalizing(['adam', 'ben'], array_column($this->pushed, 'user'));
	}

	public function testListUpdatesAreSentToo(): void {
		$this->service()->notifyListUpdate(4, 'adam');
		self::assertSame([['user' => 'ben', 'message' => 'shopping_list_list_update']], $this->pushed);
	}
}
