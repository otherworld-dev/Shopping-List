<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Tests\Unit;

use OCA\Shopping_List\Service\ImageProcessor;
use OCA\Shopping_List\Service\ImageTooLargeException;
use OCA\Shopping_List\Service\InvalidImageException;
use PHPUnit\Framework\Attributes\RequiresPhpExtension;
use PHPUnit\Framework\TestCase;

class ImageProcessorTest extends TestCase {
	private ImageProcessor $processor;

	protected function setUp(): void {
		$this->processor = new ImageProcessor();
	}

	public function testRejectsAnEmptyUpload(): void {
		$this->expectException(InvalidImageException::class);
		$this->processor->process('');
	}

	public function testRejectsBytesOverTheLimitBeforeLookingAtThem(): void {
		$this->expectException(ImageTooLargeException::class);
		$this->processor->process(str_repeat('a', ImageProcessor::MAX_UPLOAD_BYTES + 1));
	}

	public function testRejectsSomethingThatIsNotAnImage(): void {
		$this->expectException(InvalidImageException::class);
		$this->expectExceptionMessage('Not an image');
		$this->processor->process('hello world');
	}

	public function testRejectsTooManyPixelsWithoutDecoding(): void {
		// A PNG signature and IHDR claiming 10000 x 10000, and nothing else.
		// getimagesizefromstring reads the header and stops, so this never
		// reaches GD; a real decode of this would fail for other reasons.
		$png = "\x89PNG\r\n\x1a\n" . "\x00\x00\x00\x0dIHDR" . pack('NN', 10000, 10000) . "\x08\x06\x00\x00\x00";
		$this->expectException(ImageTooLargeException::class);
		$this->expectExceptionMessage('too many pixels');
		$this->processor->process($png);
	}

	#[RequiresPhpExtension('gd')]
	public function testScalesToTheBoundsAndEncodesBothAsJpeg(): void {
		$result = $this->processor->process($this->png(3000, 1500));

		self::assertSame(1280, $result->width);
		self::assertSame(640, $result->height);
		self::assertStringStartsWith("\xFF\xD8\xFF", $result->full);
		self::assertSame([1280, 640, IMAGETYPE_JPEG], array_slice(getimagesizefromstring($result->full), 0, 3));
		self::assertSame([160, 160, IMAGETYPE_JPEG], array_slice(getimagesizefromstring($result->thumb), 0, 3));
	}

	#[RequiresPhpExtension('gd')]
	public function testLeavesASmallImageAtItsOwnSize(): void {
		$result = $this->processor->process($this->png(300, 200));

		self::assertSame(300, $result->width);
		self::assertSame(200, $result->height);
		self::assertSame([160, 160], array_slice(getimagesizefromstring($result->thumb), 0, 2));
	}

	#[RequiresPhpExtension('gd')]
	public function testFlattensTransparencyOntoWhite(): void {
		$source = imagecreatetruecolor(200, 200);
		imagealphablending($source, false);
		imagesavealpha($source, true);
		imagefill($source, 0, 0, imagecolorallocatealpha($source, 0, 0, 0, 127));
		ob_start();
		imagepng($source);
		$png = ob_get_clean();

		$result = $this->processor->process($png);
		$decoded = imagecreatefromstring($result->full);
		$rgb = imagecolorsforindex($decoded, imagecolorat($decoded, 100, 100));

		self::assertGreaterThan(250, $rgb['red']);
		self::assertGreaterThan(250, $rgb['green']);
		self::assertGreaterThan(250, $rgb['blue']);
	}

	private function png(int $width, int $height): string {
		$source = imagecreatetruecolor($width, $height);
		imagefill($source, 0, 0, imagecolorallocate($source, 200, 30, 30));
		ob_start();
		imagepng($source);
		return ob_get_clean();
	}
}
