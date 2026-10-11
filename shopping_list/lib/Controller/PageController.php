<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Controller;

use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Service\UserSettingsService;
use OCP\App\IAppManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\IRequest;
use OCP\Util;

class PageController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private IInitialState $initialState,
		private UserSettingsService $settings,
		private IAppManager $appManager,
		private ?string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[NoCSRFRequired]
	public function index(): TemplateResponse {
		// The user's settings ride along with the page, so the app knows
		// whether to show photos before its first request comes back.
		$this->initialState->provideInitialState(
			'settings',
			$this->userId === null ? ['showImages' => false, 'listSort' => 'updated', 'showOwnName' => false, 'whatsNewSeen' => ''] : $this->settings->forUser($this->userId),
		);
		// With whatsNewSeen above, tells the app whether this user has had
		// the release notes for the installed version (src/whatsNew.json).
		$this->initialState->provideInitialState('version', $this->appManager->getAppVersion(Application::APP_ID));
		Util::addScript(Application::APP_ID, 'shopping_list-main');
		Util::addStyle(Application::APP_ID, 'shopping_list-main');
		return new TemplateResponse(Application::APP_ID, 'index');
	}
}
