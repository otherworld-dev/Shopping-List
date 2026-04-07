<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\ShopArea;
use OCA\Shopping_List\Db\ShopAreaMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDBConnection;

class ShopAreaService {
	public function __construct(
		private ShopAreaMapper $mapper,
		private IDBConnection $db,
	) {
	}

	private const DEFAULTS = [
		['Produce', 0, '#4CAF50', [
			'lettuce', 'tomato', 'tomatoes', 'potato', 'potatoes', 'onion', 'onions',
			'garlic', 'ginger', 'carrot', 'carrots', 'celery', 'cucumber', 'pepper',
			'peppers', 'broccoli', 'spinach', 'kale', 'cabbage', 'mushroom', 'mushrooms',
			'avocado', 'corn', 'bean sprouts', 'radish', 'radishes', 'spring onion',
			'spring onions', 'green onion', 'green onions', 'scallion', 'scallions',
			'herbs', 'basil', 'cilantro', 'parsley', 'mint', 'rosemary', 'thyme',
			'dill', 'chive', 'chives', 'lemon', 'lime', 'limes', 'orange', 'apple',
			'banana', 'berries', 'strawberry', 'strawberries', 'blueberry', 'blueberries',
			'grape', 'grapes', 'melon', 'watermelon', 'pear', 'peach', 'mango',
			'pineapple', 'kiwi', 'plum', 'cherry', 'cherries', 'zucchini', 'courgette',
			'aubergine', 'eggplant', 'beetroot', 'turnip', 'parsnip', 'leek', 'leeks',
			'asparagus', 'artichoke', 'fennel', 'chard', 'rocket', 'arugula',
			'watercress', 'endive', 'shallot', 'shallots', 'chilli', 'chili',
			'jalapeno', 'habanero', 'squash', 'pumpkin', 'sweet potato',
		]],
		['Dairy', 1, '#2196F3', [
			'milk', 'cheese', 'butter', 'cream', 'yoghurt', 'yogurt', 'egg', 'eggs',
			'sour cream', 'cream cheese', 'cottage cheese', 'mozzarella', 'cheddar',
			'parmesan', 'feta', 'brie', 'ricotta', 'gouda', 'mascarpone',
			'whipping cream', 'double cream', 'single cream', 'clotted cream',
			'buttermilk', 'ghee', 'margarine', 'custard',
		]],
		['Bakery', 2, '#FF9800', [
			'bread', 'roll', 'rolls', 'baguette', 'croissant', 'muffin', 'muffins',
			'bagel', 'bagels', 'tortilla', 'tortillas', 'pita', 'naan', 'focaccia',
			'ciabatta', 'sourdough', 'brioche', 'crumpet', 'crumpets', 'scone', 'scones',
			'cake', 'pastry', 'pastries', 'doughnut', 'doughnuts',
		]],
		['Meat & Seafood', 3, '#F44336', [
			'chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'veal', 'venison',
			'bacon', 'ham', 'sausage', 'sausages', 'mince', 'ground beef', 'steak',
			'ribs', 'chop', 'chops', 'fillet', 'breast', 'thigh', 'wing', 'wings',
			'salmon', 'tuna', 'cod', 'prawns', 'shrimp', 'crab', 'lobster', 'mussel',
			'mussels', 'clam', 'clams', 'oyster', 'oysters', 'anchovy', 'anchovies',
			'sardine', 'sardines', 'mackerel', 'trout', 'sea bass', 'haddock',
			'fish', 'squid', 'octopus', 'scallop', 'scallops',
		]],
		['Frozen', 4, '#00BCD4', [
			'frozen', 'ice cream', 'ice lolly', 'fish fingers', 'frozen peas',
			'frozen pizza', 'frozen chips', 'frozen berries', 'sorbet',
		]],
		['Beverages', 5, '#9C27B0', [
			'juice', 'water', 'soda', 'cola', 'lemonade', 'tea', 'coffee',
			'beer', 'wine', 'spirits', 'whisky', 'vodka', 'gin', 'rum',
			'sparkling water', 'tonic', 'kombucha', 'smoothie', 'cordial', 'squash drink',
		]],
		['Snacks', 6, '#FF5722', [
			'chips', 'crisps', 'popcorn', 'nuts', 'peanuts', 'almonds', 'cashews',
			'walnuts', 'trail mix', 'granola bar', 'biscuit', 'biscuits', 'cookie',
			'cookies', 'cracker', 'crackers', 'pretzel', 'pretzels', 'chocolate',
			'candy', 'sweets', 'gummy', 'dried fruit', 'raisins',
		]],
		['Household', 7, '#607D8B', [
			'toilet paper', 'kitchen roll', 'paper towel', 'bin bag', 'bin bags',
			'trash bag', 'cling film', 'foil', 'aluminium foil', 'plastic wrap',
			'detergent', 'dish soap', 'washing up liquid', 'laundry', 'bleach',
			'sponge', 'cloth', 'batteries', 'light bulb', 'candle', 'candles',
			'matches', 'air freshener',
		]],
		['Personal Care', 8, '#E91E63', [
			'shampoo', 'conditioner', 'soap', 'body wash', 'toothpaste', 'toothbrush',
			'deodorant', 'razor', 'shaving', 'moisturizer', 'moisturiser', 'sunscreen',
			'lotion', 'tissue', 'tissues', 'cotton', 'plaster', 'plasters',
			'paracetamol', 'ibuprofen', 'vitamins',
		]],
		['Other', 9, '#9E9E9E', [
			'olive oil', 'vegetable oil', 'coconut oil', 'sesame oil', 'vinegar',
			'soy sauce', 'fish sauce', 'worcestershire', 'hot sauce', 'ketchup',
			'mustard', 'mayonnaise', 'mayo', 'salt', 'pepper', 'sugar',
			'flour', 'baking powder', 'baking soda', 'yeast', 'cornflour',
			'cornstarch', 'rice', 'pasta', 'noodles', 'couscous', 'quinoa',
			'oats', 'cereal', 'honey', 'maple syrup', 'jam', 'peanut butter',
			'nutella', 'stock', 'broth', 'bouillon', 'canned', 'tinned',
			'beans', 'lentils', 'chickpeas', 'tomato paste', 'passata',
			'chopped tomatoes', 'coconut milk', 'condensed milk', 'evaporated milk',
			'olives', 'capers', 'pickles', 'gherkins', 'relish', 'chutney',
			'spice', 'cinnamon', 'cumin', 'paprika', 'turmeric', 'oregano',
			'sumac', 'cayenne', 'nutmeg', 'clove', 'cardamom', 'coriander',
			'curry powder', 'chili powder', 'red pepper flakes', 'spaghetti',
			'penne', 'fusilli', 'linguine', 'tagliatelle', 'macaroni', 'lasagne',
			'risotto', 'polenta', 'breadcrumbs', 'panko',
		]],
	];

	/**
	 * Seed default areas for a user. Only creates if user has zero areas.
	 */
	public function seedDefaults(string $userId): void {
		if ($this->mapper->countByUser($userId) > 0) {
			return;
		}

		foreach (self::DEFAULTS as [$name, $sortOrder, $color, $keywords]) {
			$area = new ShopArea();
			$area->setUserId($userId);
			$area->setName($name);
			$area->setSortOrder($sortOrder);
			$area->setColor($color);
			$area->setKeywordsArray($keywords);
			$this->mapper->insert($area);
		}
	}

	/**
	 * Get areas for the current user.
	 *
	 * @return ShopArea[]
	 */
	public function findAll(string $userId): array {
		return $this->mapper->findByUser($userId);
	}

	public function create(string $name, ?string $color, ?array $keywords, string $userId): ShopArea {
		$area = new ShopArea();
		$area->setUserId($userId);
		$area->setName($name);
		$area->setColor($color);
		$area->setSortOrder(0);
		if ($keywords !== null) {
			$area->setKeywordsArray($keywords);
		}

		return $this->mapper->insert($area);
	}

	public function update(int $id, ?string $name, ?string $color, ?int $sortOrder, ?array $keywords, string $userId): ShopArea {
		try {
			$area = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getUserId() !== $userId) {
			throw new NoPermissionException('Cannot edit another user\'s areas');
		}

		if ($name !== null) {
			$area->setName($name);
		}
		if ($color !== null) {
			$area->setColor($color);
		}
		if ($sortOrder !== null) {
			$area->setSortOrder($sortOrder);
		}
		if ($keywords !== null) {
			$area->setKeywordsArray($keywords);
		}

		return $this->mapper->update($area);
	}

	public function delete(int $id, string $userId): void {
		try {
			$area = $this->mapper->find($id);
		} catch (DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getUserId() !== $userId) {
			throw new NoPermissionException('Cannot delete another user\'s areas');
		}

		// Nullify shop_area_id on affected items
		$qb = $this->db->getQueryBuilder();
		$qb->update('shopping_list_items')
			->set('shop_area_id', $qb->createNamedParameter(null))
			->where($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($id)))
			->executeStatement();

		$this->mapper->delete($area);
	}
}
