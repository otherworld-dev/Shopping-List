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
		$source = imagecreatetruecolor(2000, 2000);
		imagealphablending($source, false);
		imagesavealpha($source, true);
		imagefill($source, 0, 0, imagecolorallocatealpha($source, 0, 0, 0, 127));
		ob_start();
		imagepng($source);
		$png = ob_get_clean();

		$result = $this->processor->process($png);

		self::assertSame(1280, $result->width);
		foreach ([$result->full, $result->thumb] as $jpeg) {
			$decoded = imagecreatefromstring($jpeg);
			$centre = intdiv(imagesx($decoded), 2);
			$rgb = imagecolorsforindex($decoded, imagecolorat($decoded, $centre, $centre));

			self::assertGreaterThan(250, $rgb['red']);
			self::assertGreaterThan(250, $rgb['green']);
			self::assertGreaterThan(250, $rgb['blue']);
		}
	}

	#[RequiresPhpExtension('gd')]
	#[RequiresPhpExtension('exif')]
	public function testAppliesTheExifOrientation(): void {
		// 300 x 200, red on the left and blue on the right, tagged as orientation
		// 6 (the camera was turned a quarter clockwise). Once applied the photo
		// is 200 x 300 with the red half on top.
		$source = imagecreatetruecolor(300, 200);
		imagefilledrectangle($source, 0, 0, 149, 199, imagecolorallocate($source, 220, 20, 20));
		imagefilledrectangle($source, 150, 0, 299, 199, imagecolorallocate($source, 20, 20, 220));
		ob_start();
		imagejpeg($source, null, 95);
		$jpeg = $this->withExifOrientation(ob_get_clean(), 6);

		$result = $this->processor->process($jpeg);

		self::assertSame([200, 300], [$result->width, $result->height]);
		$decoded = imagecreatefromstring($result->full);
		$top = imagecolorsforindex($decoded, imagecolorat($decoded, 100, 50));
		$bottom = imagecolorsforindex($decoded, imagecolorat($decoded, 100, 250));
		self::assertGreaterThan($top['blue'], $top['red']);
		self::assertGreaterThan($bottom['red'], $bottom['blue']);
	}

	public function testRejectsAnImageTypeGdCannotDecode(): void {
		// A Photoshop file header: getimagesizefromstring reads it, GD cannot decode it.
		$psd = '8BPS' . "\x00\x01" . str_repeat("\x00", 6) . "\x00\x03" . pack('NN', 100, 100) . "\x00\x08\x00\x03";
		$this->expectException(InvalidImageException::class);
		$this->expectExceptionMessage('Unsupported image type');
		$this->processor->process($psd);
	}

	public function testRefusesWhatWouldNotFitInMemoryBeforeDecoding(): void {
		// 4999 x 4999 stays under the pixel cap but needs about 100 MB decoded.
		$png = "\x89PNG\r\n\x1a\n" . "\x00\x00\x00\x0dIHDR" . pack('NN', 4999, 4999) . "\x08\x06\x00\x00\x00";
		$previous = (string)ini_get('memory_limit');
		ini_set('memory_limit', (string)(memory_get_usage(true) + 32 * 1024 * 1024));
		try {
			$this->expectException(ImageTooLargeException::class);
			$this->expectExceptionMessage('too large for this server');
			$this->processor->process($png);
		} finally {
			ini_set('memory_limit', $previous);
		}
	}

	private function png(int $width, int $height): string {
		$source = imagecreatetruecolor($width, $height);
		imagefill($source, 0, 0, imagecolorallocate($source, 200, 30, 30));
		ob_start();
		imagepng($source);
		return ob_get_clean();
	}

	/**
	 * Insert an APP1 EXIF segment carrying only an Orientation tag straight
	 * after the JPEG's SOI marker. GD cannot write EXIF, so it is built by
	 * hand: little-endian TIFF header, one IFD with one SHORT entry, no next IFD.
	 */
	private function withExifOrientation(string $jpeg, int $orientation): string {
		$tiff = "II*\x00" . pack('V', 8)
			. pack('v', 1)
			. pack('vvVv', 0x0112, 3, 1, $orientation) . "\x00\x00"
			. pack('V', 0);
		$payload = "Exif\x00\x00" . $tiff;
		$app1 = "\xFF\xE1" . pack('n', strlen($payload) + 2) . $payload;
		return substr($jpeg, 0, 2) . $app1 . substr($jpeg, 2);
	}
}
