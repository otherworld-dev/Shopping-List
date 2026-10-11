<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\InviteCode;
use PHPUnit\Framework\TestCase;

class InviteCodeTest extends TestCase {
	public function testGeneratedCodesUseOnlyTheAlphabet(): void {
		for ($i = 0; $i < 200; $i++) {
			$code = InviteCode::generate();
			self::assertMatchesRegularExpression('/^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{8}$/', $code);
			self::assertSame($code, InviteCode::normalise($code));
		}
	}

	public function testTheAlphabetLeavesOutLookAlikes(): void {
		self::assertSame(31, strlen(InviteCode::ALPHABET));
		foreach (['0', 'O', '1', 'I', 'L'] as $c) {
			self::assertStringNotContainsString($c, InviteCode::ALPHABET);
		}
	}

	public function testTypedCodesAreNormalised(): void {
		self::assertSame('K7QM3XPD', InviteCode::normalise('K7QM-3XPD'));
		self::assertSame('K7QM3XPD', InviteCode::normalise('k7qm-3xpd'));
		self::assertSame('K7QM3XPD', InviteCode::normalise(' K7QM 3XPD '));
		self::assertSame('K7QM3XPD', InviteCode::normalise("k7qm\t3xpd"));
	}

	public function testAnythingElseIsRejected(): void {
		foreach (['', 'K7QM3XP', 'K7QM3XPDA', 'K7QM3XP0', 'K7QM3XPO', 'K7QM3XP1', 'K7QM3XPI', 'K7QM3XPL',
			'K7QM/3XPD', '../../etc', str_repeat('A', 500), 'K7QM3XPÉ'] as $input) {
			self::assertNull(InviteCode::normalise($input), $input);
		}
	}
}
