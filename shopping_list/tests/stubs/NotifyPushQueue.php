<?php

declare(strict_types=1);

// notify_push's queue interface, as the app looks it up when notify_push is installed
namespace OCA\NotifyPush\Queue;

interface IQueue {
	public function push(string $channel, $message): void;

	public function set(string $key, $value): void;

	public function get(string $key);
}
