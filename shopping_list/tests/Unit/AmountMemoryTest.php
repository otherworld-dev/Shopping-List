<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Db\Amount;
use OCA\Shopping_List\Db\AmountMapper;
use OCA\Shopping_List\Service\AmountMemory;
use OCP\DB\Exception as DbException;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class AmountMemoryTest extends TestCase {
	private AmountMapper&MockObject $amounts;
	private AmountMemory $memory;

	protected function setUp(): void {
		$this->amounts = $this->createMock(AmountMapper::class);
		$this->memory = new AmountMemory($this->amounts);
	}

	private function stored(string $quantity): Amount {
		$amount = new Amount();
		$amount->setListId(5);
		$amount->setNameKey('rice');
		$amount->setQuantity($quantity);
		return $amount;
	}

	public function testRecallsTheAmountForTheNameInThatList(): void {
		$this->amounts->expects(self::once())->method('findForList')
			->with(5, 'rice')->willReturn($this->stored('500 g'));
		self::assertSame('500 g', $this->memory->recall(5, '  Rice '));
	}

	public function testRecallsNothingForANameNeverGivenAnAmount(): void {
		$this->amounts->method('findForList')->willReturn(null);
		self::assertNull($this->memory->recall(5, 'Rice'));
	}

	public function testABlankNameIsNeverLookedUp(): void {
		$this->amounts->expects(self::never())->method('findForList');
		self::assertNull($this->memory->recall(5, '   '));
	}

	public function testRemembersANewName(): void {
		$this->amounts->method('findForList')->willReturn(null);
		$this->amounts->expects(self::once())->method('insert')->with(self::callback(
			fn (Amount $a) => $a->getListId() === 5 && $a->getNameKey() === 'rice' && $a->getQuantity() === '500 g',
		))->willReturnArgument(0);
		$this->memory->remember(5, 'Rice', ' 500 g ');
	}

	public function testANewAmountReplacesTheOldOne(): void {
		$amount = $this->stored('500 g');
		$this->amounts->method('findForList')->willReturn($amount);
		$this->amounts->expects(self::never())->method('insert');
		$this->amounts->expects(self::once())->method('update')->with($amount)->willReturnArgument(0);
		$this->memory->remember(5, 'Rice', '1 kg');
		self::assertSame('1 kg', $amount->getQuantity());
	}

	public function testClearingTheAmountForgetsIt(): void {
		$amount = $this->stored('500 g');
		$this->amounts->method('findForList')->willReturn($amount);
		$this->amounts->expects(self::once())->method('delete')->with($amount)->willReturnArgument(0);
		$this->amounts->expects(self::never())->method('update');
		$this->memory->remember(5, 'Rice', null);
	}

	public function testClearingANameWithNothingRememberedDoesNothing(): void {
		$this->amounts->method('findForList')->willReturn(null);
		$this->amounts->expects(self::never())->method('delete');
		$this->amounts->expects(self::never())->method('insert');
		$this->memory->remember(5, 'Rice', '  ');
	}

	public function testAnOverlongAmountIsCutToTheColumn(): void {
		$this->amounts->method('findForList')->willReturn(null);
		$this->amounts->expects(self::once())->method('insert')->with(self::callback(
			fn (Amount $a) => mb_strlen($a->getQuantity()) === 32,
		))->willReturnArgument(0);
		$this->memory->remember(5, 'Rice', str_repeat('9', 40));
	}

	public function testAParallelAddOfTheSameNameUpdatesTheRowItMade(): void {
		$amount = $this->stored('1 kg');
		$this->amounts->method('findForList')->willReturnOnConsecutiveCalls(null, $amount);
		$duplicate = $this->createMock(DbException::class);
		$duplicate->method('getReason')->willReturn(DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION);
		$this->amounts->method('insert')->willThrowException($duplicate);
		$this->amounts->expects(self::once())->method('update')->with($amount)->willReturnArgument(0);
		$this->memory->remember(5, 'Rice', '500 g');
		self::assertSame('500 g', $amount->getQuantity());
	}

	public function testAnyOtherDatabaseFailureIsNotSwallowed(): void {
		$this->amounts->method('findForList')->willReturn(null);
		$failure = $this->createMock(DbException::class);
		$failure->method('getReason')->willReturn(null);
		$this->amounts->method('insert')->willThrowException($failure);
		$this->expectException(DbException::class);
		$this->memory->remember(5, 'Rice', '500 g');
	}
}
