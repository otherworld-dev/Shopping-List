<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ListController;
use OCA\Shopping_List\Db\ShoppingList;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NoPermissionException;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/** PUT /lists/{id}/default-area */
class ListControllerDefaultAreaTest extends TestCase {
	private ListService&MockObject $service;

	protected function setUp(): void {
		$this->service = $this->createMock(ListService::class);
	}

	/** @param array<string, mixed> $body what the client sent */
	private function controller(array $body): ListController {
		$request = $this->createMock(IRequest::class);
		$request->method('getParams')->willReturn($body + ['id' => '1']);
		return new ListController('shopping_list', $request, $this->service, 'alice');
	}

	public function testAnAreaIdIsSavedAndTheListComesBack(): void {
		$list = new ShoppingList();
		$list->setDefaultAreaId(12);
		$this->service->expects(self::once())->method('setDefaultArea')->with(1, 12, 'alice')->willReturn($list);

		$response = $this->controller(['shopAreaId' => 12])->setDefaultArea(1);

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame($list, $response->getData());
	}

	public function testAnIdSentAsTextIsReadAsANumber(): void {
		$this->service->expects(self::once())->method('setDefaultArea')->with(1, 12, 'alice')->willReturn(new ShoppingList());

		self::assertSame(Http::STATUS_OK, $this->controller(['shopAreaId' => '12'])->setDefaultArea(1)->getStatus());
	}

	public function testNullClearsIt(): void {
		$this->service->expects(self::once())->method('setDefaultArea')->with(1, null, 'alice')->willReturn(new ShoppingList());

		self::assertSame(Http::STATUS_OK, $this->controller(['shopAreaId' => null])->setDefaultArea(1)->getStatus());
	}

	public function testARequestWithNoAreaAtAllChangesNothing(): void {
		// Leaving the field out must not read as "clear it".
		$this->service->expects(self::never())->method('setDefaultArea');

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller([])->setDefaultArea(1)->getStatus());
	}

	public function testSomethingThatIsNotAnIdIsABadRequest(): void {
		$this->service->expects(self::never())->method('setDefaultArea');

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller(['shopAreaId' => 'dairy'])->setDefaultArea(1)->getStatus());
		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller(['shopAreaId' => [12]])->setDefaultArea(1)->getStatus());
	}

	public function testAnAreaThatIsNotTheListsIsABadRequest(): void {
		$this->service->method('setDefaultArea')->willThrowException(new \InvalidArgumentException('Invalid shop area'));

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller(['shopAreaId' => 40])->setDefaultArea(1)->getStatus());
	}

	public function testWithoutWriteAccessItIsForbidden(): void {
		$this->service->method('setDefaultArea')->willThrowException(new NoPermissionException('No write access'));

		self::assertSame(Http::STATUS_FORBIDDEN, $this->controller(['shopAreaId' => 12])->setDefaultArea(1)->getStatus());
	}

	public function testAListTheUserCannotSeeIsNotFound(): void {
		$this->service->method('setDefaultArea')->willThrowException(new NotFoundException('List not found'));

		self::assertSame(Http::STATUS_NOT_FOUND, $this->controller(['shopAreaId' => 12])->setDefaultArea(1)->getStatus());
	}
}
