<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\PublicImageController;
use OCA\Shopping_List\Db\ListShare;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\NotFoundException;
use OCA\Shopping_List\Service\PasswordRequiredException;
use OCA\Shopping_List\Service\PublicShareAccess;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\Files\SimpleFS\InMemoryFile;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class PublicImageControllerTest extends TestCase {
	private PublicShareAccess&MockObject $access;
	private ItemImageService&MockObject $images;
	private PublicImageController $controller;

	protected function setUp(): void {
		$this->access = $this->createMock(PublicShareAccess::class);
		$this->images = $this->createMock(ItemImageService::class);
		$this->controller = new PublicImageController('shopping_list', $this->createMock(IRequest::class), $this->access, $this->images);
	}

	public function testServesThroughTheShareListId(): void {
		$share = new ListShare();
		$share->setListId(5);
		$this->access->method('resolve')->with('tok')->willReturn($share);
		$this->images->expects(self::once())->method('getFile')->with(5, 42, 'abcdefabcdefabcd', true)
			->willReturn(new InMemoryFile('42.thumb.jpg', 'x'));

		$response = $this->controller->thumbnail('tok', 42, 'abcdefabcdefabcd');

		self::assertInstanceOf(FileDisplayResponse::class, $response);
		self::assertSame('image/jpeg', $response->getHeaders()['Content-Type']);
	}

	public function testALockedLinkAnswersPasswordRequired(): void {
		$this->access->method('resolve')->willThrowException(new PasswordRequiredException('Password required'));

		$response = $this->controller->show('tok', 42, 'abcdefabcdefabcd');

		self::assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
		self::assertTrue($response->getData()['passwordRequired']);
	}

	public function testAnUnknownTokenIsNotFound(): void {
		$this->access->method('resolve')->willThrowException(new NotFoundException('Share not found'));

		self::assertSame(Http::STATUS_NOT_FOUND, $this->controller->show('tok', 42, 'abcdefabcdefabcd')->getStatus());
	}
}
