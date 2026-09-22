<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use GdImage;

/**
 * Turns whatever a client uploads into the two JPEGs the app stores: the
 * photo, scaled so its longest side is at most MAX_SIDE, and a square
 * thumbnail of THUMB_SIDE. Re-encoding through GD drops every EXIF tag, the
 * GPS position included, and the orientation tag is applied before it goes.
 *
 * Plain GD rather than OCP\Image: that class changed its parent and its
 * constructor between Nextcloud 30 and 35, reads the orientation of in-memory
 * data only through a method that is not on IImage, and re-emits the input
 * format from data(). GD itself is a hard requirement of the server.
 */
class ImageProcessor {
	public const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
	public const MAX_PIXELS = 25_000_000;
	public const MAX_SIDE = 1280;
	public const THUMB_SIDE = 160;
	public const JPEG_QUALITY = 82;

	/** Image types GD can decode here. HEIC is not among them. */
	private const DECODABLE = [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF, IMAGETYPE_WEBP, IMAGETYPE_BMP];

	/**
	 * @throws ImageTooLargeException over the byte, pixel or memory limit
	 * @throws InvalidImageException not an image GD can read
	 */
	public function process(string $raw): ProcessedImage {
		if ($raw === '') {
			throw new InvalidImageException('Empty upload');
		}
		if (strlen($raw) > self::MAX_UPLOAD_BYTES) {
			throw new ImageTooLargeException('Image is larger than ' . IniSize::human(self::MAX_UPLOAD_BYTES));
		}

		// Reads the header only: no GD and no full decode yet.
		$info = @getimagesizefromstring($raw);
		if ($info === false) {
			throw new InvalidImageException('Not an image');
		}
		[$width, $height, $type] = $info;
		if (!in_array($type, self::DECODABLE, true) || !$this->gdSupports($type)) {
			throw new InvalidImageException('Unsupported image type');
		}
		if ($width * $height > self::MAX_PIXELS) {
			throw new ImageTooLargeException('Image has too many pixels');
		}
		$this->assertMemoryFor($width, $height, strlen($raw));

		$source = @imagecreatefromstring($raw);
		if (!$source instanceof GdImage) {
			throw new InvalidImageException('Could not decode image');
		}

		$full = $this->scaleDown($source, self::MAX_SIDE);
		// When the original was larger than MAX_SIDE this frees it before
		// rotating; otherwise $full is the same image and nothing is lost.
		unset($source);
		if ($type === IMAGETYPE_JPEG) {
			$full = $this->applyOrientation($full, $this->orientation($raw));
		}
		$thumb = $this->centreCrop($full, self::THUMB_SIDE);

		$flatten = $type !== IMAGETYPE_JPEG;
		return new ProcessedImage(
			$this->encodeJpeg($full, $flatten),
			$this->encodeJpeg($thumb, $flatten),
			imagesx($full),
			imagesy($full),
		);
	}

	private function gdSupports(int $type): bool {
		return match ($type) {
			IMAGETYPE_WEBP => (imagetypes() & IMG_WEBP) !== 0,
			IMAGETYPE_BMP => (imagetypes() & IMG_BMP) !== 0,
			default => true,
		};
	}

	/**
	 * GD holds a truecolor image at 4 bytes a pixel. Refusing up front turns
	 * what would be a fatal "allowed memory size exhausted" into a 413.
	 */
	private function assertMemoryFor(int $width, int $height, int $rawBytes): void {
		$limit = IniSize::bytes(ini_get('memory_limit'));
		if ($limit === null) {
			return;
		}
		$needed = $width * $height * 4 + $rawBytes * 3 + 16 * 1024 * 1024;
		if (memory_get_usage(true) + $needed > $limit) {
			throw new ImageTooLargeException('Image is too large for this server to process');
		}
	}

	/** EXIF orientation 1 to 8, or 1 when there is none or ext-exif is missing. */
	private function orientation(string $raw): int {
		if (!function_exists('exif_read_data')) {
			return 1;
		}
		$exif = @exif_read_data('data://image/jpeg;base64,' . base64_encode($raw));
		$orientation = is_array($exif) ? (int)($exif['Orientation'] ?? 1) : 1;
		return $orientation >= 1 && $orientation <= 8 ? $orientation : 1;
	}

	private function applyOrientation(GdImage $image, int $orientation): GdImage {
		// The same mapping Nextcloud's own image class uses. imagerotate turns
		// anticlockwise, so a photo tagged 6 (needs a quarter turn clockwise)
		// is rotated by 270.
		[$rotate, $flip] = match ($orientation) {
			2 => [0, true],
			3 => [180, false],
			4 => [180, true],
			5 => [90, true],
			6 => [270, false],
			7 => [270, true],
			8 => [90, false],
			default => [0, false],
		};
		if ($flip) {
			imageflip($image, IMG_FLIP_HORIZONTAL);
		}
		if ($rotate !== 0) {
			$rotated = imagerotate($image, $rotate, 0);
			if ($rotated instanceof GdImage) {
				return $rotated;
			}
		}
		return $image;
	}

	private function scaleDown(GdImage $image, int $maxSide): GdImage {
		$width = imagesx($image);
		$height = imagesy($image);
		if ($width <= $maxSide && $height <= $maxSide) {
			return $image;
		}
		$scale = $maxSide / max($width, $height);
		$scaled = imagescale(
			$image,
			max(1, (int)round($width * $scale)),
			max(1, (int)round($height * $scale)),
			IMG_BICUBIC,
		);
		if (!$scaled instanceof GdImage) {
			throw new InvalidImageException('Could not scale image');
		}
		return $scaled;
	}

	private function centreCrop(GdImage $image, int $size): GdImage {
		$width = imagesx($image);
		$height = imagesy($image);
		$side = min($width, $height);
		$x = intdiv($width - $side, 2);
		$y = intdiv($height - $side, 2);

		$thumb = imagecreatetruecolor($size, $size);
		if (!$thumb instanceof GdImage) {
			throw new InvalidImageException('Could not create thumbnail');
		}
		// Copy the alpha channel as it is; encodeJpeg paints it onto white.
		imagealphablending($thumb, false);
		imagesavealpha($thumb, true);
		imagecopyresampled($thumb, $image, 0, 0, $x, $y, $size, $size, $side, $side);
		return $thumb;
	}

	private function encodeJpeg(GdImage $image, bool $flatten): string {
		if ($flatten) {
			// JPEG has no transparency. Paint PNG, GIF and WebP alpha onto
			// white rather than letting imagejpeg turn it black.
			$canvas = imagecreatetruecolor(imagesx($image), imagesy($image));
			if ($canvas instanceof GdImage) {
				$white = imagecolorallocate($canvas, 255, 255, 255);
				imagefill($canvas, 0, 0, $white === false ? 0xFFFFFF : $white);
				imagecopy($canvas, $image, 0, 0, 0, 0, imagesx($image), imagesy($image));
				$image = $canvas;
			}
		}
		imageinterlace($image, true);
		ob_start();
		$ok = imagejpeg($image, null, self::JPEG_QUALITY);
		$bytes = ob_get_clean();
		if (!$ok || $bytes === false || $bytes === '') {
			throw new InvalidImageException('Could not encode image');
		}
		return $bytes;
	}
}
