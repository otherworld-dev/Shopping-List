<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCP\AppFramework\OCSController;
use OCP\IRequest;

class PreferencesController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
	) {
		parent::__construct($appName, $request);
	}
}
