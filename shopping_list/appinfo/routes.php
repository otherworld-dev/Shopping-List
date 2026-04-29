<?php

declare(strict_types=1);

return [
	'routes' => [
		['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
		['name' => 'public_page#index', 'url' => '/s/{token}', 'verb' => 'GET'],
	],
	'ocs' => [
		// Lists
		['name' => 'list#index', 'url' => '/api/v1/lists', 'verb' => 'GET'],
		['name' => 'list#show', 'url' => '/api/v1/lists/{id}', 'verb' => 'GET'],
		['name' => 'list#create', 'url' => '/api/v1/lists', 'verb' => 'POST'],
		['name' => 'list#update', 'url' => '/api/v1/lists/{id}', 'verb' => 'PUT'],
		['name' => 'list#destroy', 'url' => '/api/v1/lists/{id}', 'verb' => 'DELETE'],

		// Items — static routes before parameterized ones
		['name' => 'item#index', 'url' => '/api/v1/lists/{listId}/items', 'verb' => 'GET'],
		['name' => 'item#create', 'url' => '/api/v1/lists/{listId}/items', 'verb' => 'POST'],
		['name' => 'item#reorder', 'url' => '/api/v1/lists/{listId}/items/reorder', 'verb' => 'POST'],
		['name' => 'item#clearChecked', 'url' => '/api/v1/lists/{listId}/items/checked', 'verb' => 'DELETE'],
		['name' => 'item#uncheckAll', 'url' => '/api/v1/lists/{listId}/items/uncheck-all', 'verb' => 'POST'],
		['name' => 'item#update', 'url' => '/api/v1/lists/{listId}/items/{id}', 'verb' => 'PUT'],
		['name' => 'item#check', 'url' => '/api/v1/lists/{listId}/items/{id}/check', 'verb' => 'PUT'],
		['name' => 'item#destroy', 'url' => '/api/v1/lists/{listId}/items/{id}', 'verb' => 'DELETE'],

		// Shares
		['name' => 'share#index', 'url' => '/api/v1/lists/{listId}/shares', 'verb' => 'GET'],
		['name' => 'share#create', 'url' => '/api/v1/lists/{listId}/shares', 'verb' => 'POST'],
		['name' => 'share#update', 'url' => '/api/v1/shares/{id}', 'verb' => 'PUT'],
		['name' => 'share#destroy', 'url' => '/api/v1/shares/{id}', 'verb' => 'DELETE'],

		// Link shares (authenticated, for owners)
		['name' => 'share#createLink', 'url' => '/api/v1/lists/{listId}/shares/link', 'verb' => 'POST'],
		['name' => 'share#updateLink', 'url' => '/api/v1/shares/{id}/link', 'verb' => 'PUT'],
		['name' => 'share#destroyLink', 'url' => '/api/v1/shares/{id}/link', 'verb' => 'DELETE'],

		// Public API (unauthenticated, token-based)
		['name' => 'public_list#show', 'url' => '/api/v1/public/{token}', 'verb' => 'GET'],
		['name' => 'public_list#auth', 'url' => '/api/v1/public/{token}/auth', 'verb' => 'POST'],
		['name' => 'public_list#items', 'url' => '/api/v1/public/{token}/items', 'verb' => 'GET'],
		['name' => 'public_list#createItem', 'url' => '/api/v1/public/{token}/items', 'verb' => 'POST'],
		['name' => 'public_list#reorder', 'url' => '/api/v1/public/{token}/items/reorder', 'verb' => 'POST'],
		['name' => 'public_list#updateItem', 'url' => '/api/v1/public/{token}/items/{id}', 'verb' => 'PUT'],
		['name' => 'public_list#checkItem', 'url' => '/api/v1/public/{token}/items/{id}/check', 'verb' => 'PUT'],
		['name' => 'public_list#deleteItem', 'url' => '/api/v1/public/{token}/items/{id}', 'verb' => 'DELETE'],
		['name' => 'public_list#areas', 'url' => '/api/v1/public/{token}/areas', 'verb' => 'GET'],

		// Shop Areas (list-scoped)
		['name' => 'shop_area#index', 'url' => '/api/v1/lists/{listId}/areas', 'verb' => 'GET'],
		['name' => 'shop_area#create', 'url' => '/api/v1/lists/{listId}/areas', 'verb' => 'POST'],
		['name' => 'shop_area#update', 'url' => '/api/v1/lists/{listId}/areas/{id}', 'verb' => 'PUT'],
		['name' => 'shop_area#destroy', 'url' => '/api/v1/lists/{listId}/areas/{id}', 'verb' => 'DELETE'],

		// Tags
		['name' => 'tag#index', 'url' => '/api/v1/tags', 'verb' => 'GET'],
		['name' => 'tag#create', 'url' => '/api/v1/tags', 'verb' => 'POST'],
		['name' => 'tag#destroy', 'url' => '/api/v1/tags/{id}', 'verb' => 'DELETE'],
	],
];
