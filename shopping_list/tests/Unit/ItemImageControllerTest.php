<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Controller\ItemImageController;
use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Service\ImageTooLargeException;
use OCA\Shopping_List\Service\InvalidImageException;
use OCA\Shopping_List\Service\ItemImageService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\AppFramework\Http;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class ItemImageControllerTest extends TestCase {
	private IRequest&MockObject $request;
	private ItemImageService&MockObject $service;
	private ItemImageController $controller;
	/** @var string[] */
	private array $tempFiles = [];

	protected function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->service = $this->createMock(ItemImageService::class);
		$this->controller = new ItemImageController('shopping_list', $this->request, $this->service, 'alice');
	}

	protected function tearDown(): void {
		foreach ($this->tempFiles as $path) {
			@unlink($path);
		}
	}

	/** A $_FILES entry backed by a real temp file, as PHP would hand it over. */
	private function upload(string $bytes, int $error = UPLOAD_ERR_OK): array {
		$path = tempnam(sys_get_temp_dir(), 'sl-img');
		file_put_contents($path, $bytes);
		$this->tempFiles[] = $path;
		return ['name' => 'photo.jpg', 'type' => 'image/jpeg', 'tmp_name' => $path, 'error' => $error, 'size' => strlen($bytes)];
	}

	public function testNoFileIsABadRequest(): void {
		$this->request->method('getUploadedFile')->with('image')->willReturn(null);
		$this->request->method('getHeader')->with('Content-Length')->willReturn('10');

		self::assertSame(Http::STATUS_BAD_REQUEST, $this->controller->upload(5, 42)->getStatus());
	}

	public function testABodyOverThePhpLimitIsTooLarge(): void {
		$this->request->method('getUploadedFile')->willReturn(null);
		$this->request->method('getHeader')->with('Content-Length')->willReturn('999999999999');

		$response = $this->controller->upload(5, 42);

		self::assertSame(Http::STATUS_REQUEST_ENTITY_TOO_LARGE, $response->getStatus());
		self::assertStringContainsString('server limit', $response->getData()['message']);
	}

	public function testAnIniSizeErrorIsTooLarge(): void {
		$this->request->method('getUploadedFile')->willReturn($this->upload('', UPLOAD_ERR_INI_SIZE));

		self::assertSame(Http::STATUS_REQUEST_ENTITY_TOO_LARGE, $this->controller->upload(5, 42)->getStatus());
	}

	public function testAGoodUploadReachesTheServiceAndReturnsTheItem(): void {
		$item = new Item();
		$item->setId(42);
		$this->request->method('getUploadedFile')->willReturn($this->upload('BYTES'));
		$this->service->expects(self::once())->method('attach')->with(5, 42, 'BYTES', 'alice')->willReturn($item);

		$response = $this->controller->upload(5, 42);

		self::assertSame(Http::STATUS_OK, $response->getStatus());
		self::assertSame($item, $response->getData());
	}

	public function testAnUnreadableImageIsUnsupportedMedia(): void {
		$this->request->method('getUploadedFile')->willReturn($this->upload('BYTES'));
		$this->service->method('attach')->willThrowException(new InvalidImageException('Not an image'));

		$response = $this->controller->upload(5, 42);

		self::assertSame(Http::STATUS_UNSUPPORTED_MEDIA_TYPE, $response->getStatus());
		self::assertSame('Not an image', $response->getData()['message']);
	}

	public function testAnOversizeImageIsTooLarge(): void {
		$this->request->method('getUploadedFile')->willReturn($this->upload('BYTES'));
		$this->service->method('attach')->willThrowException(new ImageTooLargeException('Image has too many pixels'));

		self::assertSame(Http::STATUS_REQUEST_ENTITY_TOO_LARGE, $this->controller->upload(5, 42)->getStatus());
	}

	public function testRemoveOnAMissingItemIsNotFound(): void {
		$this->service->method('remove')->willThrowException(new NotFoundException('Item not found'));

		self::assertSame(Http::STATUS_NOT_FOUND, $this->controller->remove(5, 42)->getStatus());
	}
}
