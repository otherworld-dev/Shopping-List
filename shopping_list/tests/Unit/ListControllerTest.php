<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ListController;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ListControllerTest extends TestCase {
	private ListService&MockObject $service;
	private ListController $controller;

	protected function setUp(): void {
		$this->service = $this->createMock(ListService::class);
		$this->controller = new ListController('shopping_list', $this->createMock(IRequest::class), $this->service, 'alice');
	}

	public function testReorderSavesTheGivenOrder(): void {
		$this->service->expects(self::once())->method('reorder')->with([3, 1, 2], 'alice')->willReturn([3, 1, 2]);

		$response = $this->controller->reorder([3, 1, 2]);

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame(['listIds' => [3, 1, 2]], $response->getData());
	}

	public function testAMissingListIdsIsABadRequest(): void {
		$this->service->expects(self::never())->method('reorder');

		$response = $this->controller->reorder();

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public function testANonArrayListIdsIsABadRequest(): void {
		$this->service->expects(self::never())->method('reorder');

		$response = $this->controller->reorder('not-an-array');

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public function testANestedEntryIsABadRequest(): void {
		$this->service->expects(self::never())->method('reorder');

		$response = $this->controller->reorder([[5]]);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public function testANumericStringEntryIsAccepted(): void {
		$this->service->expects(self::once())->method('reorder')->with(['5', 6], 'alice')->willReturn([5, 6]);

		$response = $this->controller->reorder(['5', 6]);

		self::assertSame(Http::STATUS_OK, $response->getStatus());
	}

	public function testANonNumericEntryIsABadRequest(): void {
		$this->service->expects(self::never())->method('reorder');

		$response = $this->controller->reorder([5, 'abc']);

		self::assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public function testANotFoundExceptionBecomesA404(): void {
		$this->service->method('reorder')->willThrowException(new NotFoundException('List not found'));

		$response = $this->controller->reorder([9]);

		self::assertSame(Http::STATUS_NOT_FOUND, $response->getStatus());
		self::assertSame(['message' => 'List not found'], $response->getData());
	}
}
