import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../composables/useApi'

// Default keyword mappings — used when user has no saved preferences
const DEFAULT_KEYWORDS: Record<string, string[]> = {
	'Produce': [
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
	],
	'Dairy': [
		'milk', 'cheese', 'butter', 'cream', 'yoghurt', 'yogurt', 'egg', 'eggs',
		'sour cream', 'cream cheese', 'cottage cheese', 'mozzarella', 'cheddar',
		'parmesan', 'feta', 'brie', 'ricotta', 'gouda', 'mascarpone',
		'whipping cream', 'double cream', 'single cream', 'clotted cream',
		'buttermilk', 'ghee', 'margarine', 'custard',
	],
	'Bakery': [
		'bread', 'roll', 'rolls', 'baguette', 'croissant', 'muffin', 'muffins',
		'bagel', 'bagels', 'tortilla', 'tortillas', 'pita', 'naan', 'focaccia',
		'ciabatta', 'sourdough', 'brioche', 'crumpet', 'crumpets', 'scone', 'scones',
		'cake', 'pastry', 'pastries', 'doughnut', 'doughnuts',
	],
	'Meat & Seafood': [
		'chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'veal', 'venison',
		'bacon', 'ham', 'sausage', 'sausages', 'mince', 'ground beef', 'steak',
		'ribs', 'chop', 'chops', 'fillet', 'breast', 'thigh', 'wing', 'wings',
		'salmon', 'tuna', 'cod', 'prawns', 'shrimp', 'crab', 'lobster', 'mussel',
		'mussels', 'clam', 'clams', 'oyster', 'oysters', 'anchovy', 'anchovies',
		'sardine', 'sardines', 'mackerel', 'trout', 'sea bass', 'haddock',
		'fish', 'squid', 'octopus', 'scallop', 'scallops',
	],
	'Frozen': [
		'frozen', 'ice cream', 'ice lolly', 'fish fingers', 'frozen peas',
		'frozen pizza', 'frozen chips', 'frozen berries', 'sorbet',
	],
	'Beverages': [
		'juice', 'water', 'soda', 'cola', 'lemonade', 'tea', 'coffee',
		'beer', 'wine', 'spirits', 'whisky', 'vodka', 'gin', 'rum',
		'sparkling water', 'tonic', 'kombucha', 'smoothie', 'cordial', 'squash drink',
	],
	'Snacks': [
		'chips', 'crisps', 'popcorn', 'nuts', 'peanuts', 'almonds', 'cashews',
		'walnuts', 'trail mix', 'granola bar', 'biscuit', 'biscuits', 'cookie',
		'cookies', 'cracker', 'crackers', 'pretzel', 'pretzels', 'chocolate',
		'candy', 'sweets', 'gummy', 'dried fruit', 'raisins',
	],
	'Household': [
		'toilet paper', 'kitchen roll', 'paper towel', 'bin bag', 'bin bags',
		'trash bag', 'cling film', 'foil', 'aluminium foil', 'plastic wrap',
		'detergent', 'dish soap', 'washing up liquid', 'laundry', 'bleach',
		'sponge', 'cloth', 'batteries', 'light bulb', 'candle', 'candles',
		'matches', 'air freshener',
	],
	'Personal Care': [
		'shampoo', 'conditioner', 'soap', 'body wash', 'toothpaste', 'toothbrush',
		'deodorant', 'razor', 'shaving', 'moisturizer', 'moisturiser', 'sunscreen',
		'lotion', 'tissue', 'tissues', 'cotton', 'plaster', 'plasters',
		'paracetamol', 'ibuprofen', 'vitamins',
	],
	'Other': [
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
	],
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null

export const useAreaKeywordsStore = defineStore('areaKeywords', () => {
	const keywords = ref<Record<string, string[]>>(structuredClone(DEFAULT_KEYWORDS))
	const loaded = ref(false)

	async function fetchFromServer() {
		try {
			const response = await api.preferences.getKeywords()
			const data = response.data.ocs.data
			if (data && typeof data === 'object' && Object.keys(data).length > 0) {
				keywords.value = data
			}
			// If null/empty, keep defaults
		} catch {
			// Server error — keep defaults
		}
		loaded.value = true
	}

	function saveToServer() {
		// Debounce saves to avoid spamming the API on rapid edits
		if (saveTimeout) clearTimeout(saveTimeout)
		saveTimeout = setTimeout(async () => {
			try {
				await api.preferences.setKeywords(keywords.value)
			} catch {
				console.error('[ShoppingList] Failed to save area keywords')
			}
		}, 1000)
	}

	function getKeywords(areaName: string): string[] {
		return keywords.value[areaName] ?? []
	}

	function setKeywords(areaName: string, words: string[]) {
		keywords.value[areaName] = words.map(w => w.toLowerCase().trim()).filter(w => w)
		saveToServer()
	}

	function addKeyword(areaName: string, word: string) {
		if (!keywords.value[areaName]) {
			keywords.value[areaName] = []
		}
		const lower = word.toLowerCase().trim()
		if (lower && !keywords.value[areaName].includes(lower)) {
			keywords.value[areaName].push(lower)
			saveToServer()
		}
	}

	function removeKeyword(areaName: string, word: string) {
		if (!keywords.value[areaName]) return
		const lower = word.toLowerCase().trim()
		keywords.value[areaName] = keywords.value[areaName].filter(w => w !== lower)
		saveToServer()
	}

	function resetToDefaults() {
		keywords.value = structuredClone(DEFAULT_KEYWORDS)
		saveToServer()
	}

	return {
		keywords,
		loaded,
		fetchFromServer,
		getKeywords,
		setKeywords,
		addKeyword,
		removeKeyword,
		resetToDefaults,
	}
})
