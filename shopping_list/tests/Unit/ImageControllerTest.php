<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ImageController;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\Files\SimpleFS\InMemoryFile;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ImageControllerTest extends TestCase {
	private ListService&MockObject $lists;
	private ItemImageService&MockObject $images;
	private ImageController $controller;

	protected function setUp(): void {
		$this->lists = $this->createMock(ListService::class);
		$this->images = $this->createMock(ItemImageService::class);
		$this->controller = new ImageController('shopping_list', $this->createMock(IRequest::class), $this->lists, $this->images, 'alice');
	}

	public function testServesTheThumbnailAsAnImmutableJpeg(): void {
		$file = new InMemoryFile('42.thumb.jpg', 'JPEGBYTES');
		$this->lists->expects(self::once())->method('assertAccess')->with(5, 'alice');
		$this->images->method('getFile')->with(5, 42, 'abcdefabcdefabcd', true)->willReturn($file);

		$response = $this->controller->thumbnail(5, 42, 'abcdefabcdefabcd');

		self::assertInstanceOf(FileDisplayResponse::class, $response);
		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame('image/jpeg', $response->getHeaders()['Content-Type']);
		self::assertSame('private, max-age=31536000, immutable', $response->getHeaders()['Cache-Control']);
	}

	public function testShowAsksForTheFullImage(): void {
		$this->images->expects(self::once())->method('getFile')->with(5, 42, 'abcdefabcdefabcd', false)
			->willReturn(new InMemoryFile('42.jpg', 'x'));

		$this->controller->show(5, 42, 'abcdefabcdefabcd');
	}

	public function testNoAccessToTheListIsNotFound(): void {
		$this->lists->method('assertAccess')->willThrowException(new NotFoundException('List not found'));
		$this->images->expects(self::never())->method('getFile');

		self::assertSame(Http::STATUS_NOT_FOUND, $this->controller->show(5, 42, 'abcdefabcdefabcd')->getStatus());
	}

	public function testAWrongKeyIsNotFound(): void {
		$this->images->method('getFile')->willThrowException(new NotFoundException('Image not found'));

		self::assertSame(Http::STATUS_NOT_FOUND, $this->controller->thumbnail(5, 42, '0000000000000000')->getStatus());
	}
}
