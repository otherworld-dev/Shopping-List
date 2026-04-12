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
		['General', 9, '#795548', [
			'rice', 'pasta', 'noodles', 'couscous', 'quinoa', 'oats', 'cereal',
			'spaghetti', 'penne', 'fusilli', 'linguine', 'tagliatelle', 'macaroni',
			'lasagne', 'risotto', 'polenta', 'breadcrumbs', 'panko',
			'flour', 'baking powder', 'baking soda', 'yeast', 'cornflour', 'cornstarch',
			'sugar', 'salt', 'pepper', 'honey', 'maple syrup', 'jam', 'peanut butter',
			'nutella', 'stock', 'broth', 'bouillon',
			'canned', 'tinned', 'beans', 'lentils', 'chickpeas',
			'tomato paste', 'passata', 'chopped tomatoes',
			'coconut milk', 'condensed milk', 'evaporated milk',
			'olive oil', 'vegetable oil', 'coconut oil', 'sesame oil', 'vinegar',
			'soy sauce', 'fish sauce', 'worcestershire', 'hot sauce', 'ketchup',
			'mustard', 'mayonnaise', 'mayo',
			'olives', 'capers', 'pickles', 'gherkins', 'relish', 'chutney',
			'spice', 'cinnamon', 'cumin', 'paprika', 'turmeric', 'oregano',
			'sumac', 'cayenne', 'nutmeg', 'clove', 'cardamom', 'coriander',
			'curry powder', 'chili powder', 'red pepper flakes',
		]],
		['Pets', 10, '#8D6E63', [
			'dog food', 'cat food', 'pet food', 'kibble', 'wet food',
			'cat litter', 'kitty litter', 'litter tray', 'poo bags',
			'dog treats', 'cat treats', 'pet treats', 'dental sticks',
			'flea treatment', 'wormer', 'worming', 'tick treatment',
			'pet shampoo', 'pet bed', 'collar', 'leash', 'lead',
			'bird seed', 'fish food', 'hay', 'rabbit food',
			'chew toy', 'catnip', 'scratching post',
		]],
		['Other', 11, '#9E9E9E', []],
	];

	/**
	 * Seed default areas for a list. Only creates if list has zero areas.
	 */
	public function seedDefaults(int $listId): void {
		if ($this->mapper->countByList($listId) > 0) {
			return;
		}

		foreach (self::DEFAULTS as [$name, $sortOrder, $color, $keywords]) {
			$area = new ShopArea();
			$area->setListId($listId);
			$area->setName($name);
			$area->setSortOrder($sortOrder);
			$area->setColor($color);
			$area->setKeywordsArray($keywords);
			$this->mapper->insert($area);
		}
	}

	/**
	 * Get all areas for a list.
	 *
	 * @return ShopArea[]
	 */
	public function findAll(int $listId): array {
		return $this->mapper->findByList($listId);
	}

	public function find(int $id): ShopArea {
		try {
			return $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}
	}

	public function create(int $listId, string $name, ?string $color, ?array $keywords): ShopArea {
		$area = new ShopArea();
		$area->setListId($listId);
		$area->setName($name);
		$area->setColor($color);
		$area->setSortOrder(0);
		if ($keywords !== null) {
			$area->setKeywordsArray($keywords);
		}

		return $this->mapper->insert($area);
	}

	public function update(int $id, int $listId, ?string $name, ?string $color, ?int $sortOrder, ?array $keywords): ShopArea {
		try {
			$area = $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getListId() !== $listId) {
			throw new NoPermissionException('Area does not belong to this list');
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

	public function delete(int $id, int $listId): void {
		try {
			$area = $this->mapper->find($id);
		} catch (\OCP\AppFramework\Db\DoesNotExistException) {
			throw new NotFoundException('Shop area not found');
		}

		if ($area->getListId() !== $listId) {
			throw new NoPermissionException('Area does not belong to this list');
		}

		// Nullify shop_area_id on affected items within this list
		$qb = $this->db->getQueryBuilder();
		$qb->update('shopping_list_items')
			->set('shop_area_id', $qb->createNamedParameter(null, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_NULL))
			->where($qb->expr()->eq('shop_area_id', $qb->createNamedParameter($id, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('list_id', $qb->createNamedParameter($listId, \OCP\DB\QueryBuilder\IQueryBuilder::PARAM_INT)))
			->executeStatement();

		$this->mapper->delete($area);
	}
}
