<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\UserListPreference;
use OCA\Shopping_List\Db\UserListPreferenceMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * A partial mock of the mapper: find/insert/update are doubled so no real
 * database is needed, while setPinned/setPositions/findOrCreate keep running
 * for real, which is what these tests are about.
 */
class UserListPreferenceMapperTest extends TestCase {
	private IDBConnection&MockObject $db;
	private UserListPreferenceMapper&MockObject $mapper;

	protected function setUp(): void {
		$this->db = $this->createMock(IDBConnection::class);
		$this->mapper = $this->getMockBuilder(UserListPreferenceMapper::class)
			->setConstructorArgs([$this->db])
			->onlyMethods(['find', 'insert', 'update'])
			->getMock();
	}

	private function pref(int $listId, bool $isPinned, ?int $position): UserListPreference {
		$pref = new UserListPreference();
		$pref->setId($listId);
		$pref->setUserId('alice');
		$pref->setListId($listId);
		$pref->setIsPinned($isPinned);
		$pref->setPosition($position);
		$pref->resetUpdatedFields();
		return $pref;
	}

	public function testPinningAnUnpinnedListClearsItsPosition(): void {
		$existing = $this->pref(5, false, 3);
		$this->mapper->method('find')->with('alice', 5)->willReturn($existing);
		$this->mapper->expects(self::once())->method('update')
			->with(self::callback(function (UserListPreference $pref) {
				return $pref->getIsPinned() === true && $pref->getPosition() === null;
			}))
			->willReturnArgument(0);

		$result = $this->mapper->setPinned('alice', 5, true);

		self::assertTrue($result->getIsPinned());
		self::assertNull($result->getPosition());
	}

	public function testRePinningAnAlreadyPinnedListKeepsItsPosition(): void {
		$existing = $this->pref(5, true, 3);
		$this->mapper->method('find')->with('alice', 5)->willReturn($existing);
		$this->mapper->expects(self::once())->method('update')
			->with(self::callback(function (UserListPreference $pref) {
				return $pref->getIsPinned() === true && $pref->getPosition() === 3;
			}))
			->willReturnArgument(0);

		$result = $this->mapper->setPinned('alice', 5, true);

		self::assertTrue($result->getIsPinned());
		self::assertSame(3, $result->getPosition());
	}

	public function testUnpinningAnAlreadyUnpinnedListKeepsItsPosition(): void {
		$existing = $this->pref(5, false, 3);
		$this->mapper->method('find')->with('alice', 5)->willReturn($existing);
		$this->mapper->expects(self::once())->method('update')
			->with(self::callback(function (UserListPreference $pref) {
				return $pref->getIsPinned() === false && $pref->getPosition() === 3;
			}))
			->willReturnArgument(0);

		$result = $this->mapper->setPinned('alice', 5, false);

		self::assertSame(3, $result->getPosition());
	}

	public function testSetPositionsCreatesMissingRowsBeforeTheTransactionThenUpdatesInAscendingListIdOrder(): void {
		$log = [];

		$this->db->expects(self::once())->method('beginTransaction')
			->willReturnCallback(function () use (&$log) {
				$log[] = 'beginTransaction';
			});
		$this->db->expects(self::once())->method('commit');
		$this->db->expects(self::never())->method('rollBack');

		// Lists 10 and 30 already have a row; 20 does not, so it must be
		// created via insert() before the transaction opens.
		$this->mapper->method('find')->willReturnCallback(function (string $userId, int $listId) use (&$log) {
			$log[] = "find:$listId";
			if ($listId === 20) {
				throw new DoesNotExistException('missing');
			}
			return $this->pref($listId, false, null);
		});
		$this->mapper->expects(self::once())->method('insert')
			->willReturnCallback(function (UserListPreference $pref) use (&$log) {
				$log[] = "insert:{$pref->getListId()}";
				return $pref;
			});

		$updateOrder = [];
		$this->mapper->expects(self::exactly(3))->method('update')
			->willReturnCallback(function (UserListPreference $pref) use (&$log, &$updateOrder) {
				$log[] = "update:{$pref->getListId()}:{$pref->getPosition()}";
				$updateOrder[$pref->getListId()] = $pref->getPosition();
				return $pref;
			});

		// Caller's order: 30 first, then 10, then 20 - so their positions
		// should be 0, 1, 2 respectively, no matter the update order.
		$this->mapper->setPositions('alice', [30, 10, 20]);

		self::assertSame(['find:30', 'find:10', 'find:20', 'insert:20', 'beginTransaction', 'update:10:1', 'update:20:2', 'update:30:0'], $log);
		self::assertSame([10 => 1, 20 => 2, 30 => 0], $updateOrder);
	}

	public function testAFailureInsideTheTransactionRollsBack(): void {
		$this->db->expects(self::once())->method('beginTransaction');
		$this->db->expects(self::never())->method('commit');
		$this->db->expects(self::once())->method('rollBack');

		$this->mapper->method('find')->willReturnCallback(fn (string $userId, int $listId) => $this->pref($listId, false, null));
		$this->mapper->method('update')->willThrowException(new \RuntimeException('db gone'));

		$this->expectException(\RuntimeException::class);

		$this->mapper->setPositions('alice', [1, 2]);
	}
}
