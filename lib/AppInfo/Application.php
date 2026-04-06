<?php

declare(strict_types=1);

namespace OCA\ShoppingList\AppInfo;

use OCA\ShoppingList\Service\ShopAreaService;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;

class Application extends App implements IBootstrap {
	public const APP_ID = 'shoppinglist';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void {
	}

	public function boot(IBootContext $context): void {
		$context->injectFn(function (ShopAreaService $shopAreaService) {
			$shopAreaService->seedDefaults();
		});
	}
}
