<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Notification;

use OCA\Shopping_List\AppInfo\Application;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;

class Notifier implements INotifier {
	/** Google Play listing for the companion Android app. */
	public const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=dev.otherworld.shoppinglist';

	/** Subject identifier for the "Android app is available" notification. */
	public const SUBJECT_ANDROID_APP = 'android_app';

	public function __construct(
		private IFactory $l10nFactory,
		private IURLGenerator $urlGenerator,
	) {
	}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return $this->l10nFactory->get(Application::APP_ID)->t('Shopping List');
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== Application::APP_ID) {
			throw new UnknownNotificationException();
		}

		$l = $this->l10nFactory->get(Application::APP_ID, $languageCode);

		switch ($notification->getSubject()) {
			case self::SUBJECT_ANDROID_APP:
				$notification->setParsedSubject($l->t('Shopping List is now on Android'));
				$notification->setParsedMessage($l->t('Take your lists shopping — a companion Android app is now available on Google Play.'));

				$notification->setIcon($this->urlGenerator->getAbsoluteURL(
					$this->urlGenerator->imagePath(Application::APP_ID, 'app.svg'),
				));

				// Whole-notification click target.
				$notification->setLink(self::ANDROID_APP_URL);

				$action = $notification->createAction();
				$action->setLabel('view')
					->setParsedLabel($l->t('Get it on Google Play'))
					->setLink(self::ANDROID_APP_URL, 'WEB')
					->setPrimary(true);
				$notification->addParsedAction($action);

				return $notification;

			default:
				throw new UnknownNotificationException();
		}
	}
}
