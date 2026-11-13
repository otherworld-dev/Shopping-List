<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Notification;

use OCA\Shopping_List\AppInfo\Application;
use OCA\Shopping_List\Service\AddedItemNotifications;
use OCA\Shopping_List\Service\ListService;
use OCA\Shopping_List\Service\NotFoundException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\AlreadyProcessedException;
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
		private ListService $listService,
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

			case AddedItemNotifications::SUBJECT:
				return $this->prepareItemsAdded($notification, $l);

			default:
				throw new UnknownNotificationException();
		}
	}

	/**
	 * "Sam added 3 items to Weekly shop", with the first few item names
	 * underneath, opening the list in the web app. The list's title is read
	 * now, so a rename shows; a list that has gone, or that the user can no
	 * longer see, takes the notification away.
	 */
	private function prepareItemsAdded(INotification $notification, IL10N $l): INotification {
		$listId = (int)$notification->getObjectId();
		try {
			$title = $this->listService->find($listId, $notification->getUser())->getTitle();
		} catch (NotFoundException) {
			throw new AlreadyProcessedException();
		}

		$params = $notification->getSubjectParameters();
		$count = max(1, (int)($params['count'] ?? 1));
		$actorCount = (int)($params['actorCount'] ?? 1);
		// A guest on a link who gave no name is stored with an empty one
		$actors = array_map(
			fn ($name) => (string)$name !== '' ? (string)$name : $l->t('A guest'),
			(array)($params['actors'] ?? []),
		);
		$first = $actors[0] ?? $l->t('Someone');

		if ($actorCount <= 1) {
			$subject = $l->n('%1$s added an item to %2$s', '%1$s added %n items to %2$s', $count, [$first, $title]);
		} elseif ($actorCount === 2 && isset($actors[1])) {
			$subject = $l->n('%1$s and %2$s added an item to %3$s', '%1$s and %2$s added %n items to %3$s', $count, [$first, $actors[1], $title]);
		} else {
			$subject = $l->n('%1$s and others added an item to %2$s', '%1$s and others added %n items to %2$s', $count, [$first, $title]);
		}
		$notification->setParsedSubject($subject);

		$items = array_map('strval', (array)($params['items'] ?? []));
		if ($items !== []) {
			$message = implode(', ', $items);
			$more = $count - count($items);
			if ($more > 0) {
				$message .= ' ' . $l->n('and %n more', 'and %n more', $more);
			}
			$notification->setParsedMessage($message);
		}

		$notification->setIcon($this->urlGenerator->getAbsoluteURL(
			$this->urlGenerator->imagePath(Application::APP_ID, 'app.svg'),
		));
		$notification->setLink($this->urlGenerator->linkToRouteAbsolute('shopping_list.page.index', ['list' => $listId]));
		return $notification;
	}
}
