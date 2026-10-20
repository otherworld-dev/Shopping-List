<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

use OCA\Shopping_List\Db\Item;
use OCA\Shopping_List\Db\ItemMapper;
use OCA\Shopping_List\Service\Parsing\IngredientParser;
use OCA\Shopping_List\Service\Parsing\ItemMerge;
use OCA\Shopping_List\Service\Parsing\ParsingPack;
use OCA\Shopping_List\Service\Parsing\SpokenNumbers;
use OCP\IL10N;

/**
 * Items from one line of text, for apps that only have what the user said
 * or typed (Home Assistant). The line is read, merged and filed the way the
 * web app's add box does it in the browser (src/stores/items.ts), then
 * handed to ItemService, so attribution, remembered amounts and photos,
 * and push all work as for any other add.
 */
class TextInputService {
	public function __construct(
		private ItemService $items,
		private ItemMapper $mapper,
		private ListService $lists,
		private ShopAreaService $areas,
		private IL10N $l,
	) {
	}

	/**
	 * @throws \InvalidArgumentException when no item name is left after the amount
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function addFromText(int $listId, string $text, string $userId, ?string $via): TextAddResult {
		$this->lists->assertWriteAccess($listId, $userId);

		$language = $this->l->getLanguageCode();
		$pack = ParsingPack::forLanguage($language);
		$parsed = $this->readLine($pack, $language, $text);
		$name = $parsed['name'];
		$quantity = $parsed['quantity'];

		// A ticked line ("[x] Milk") records something bought, never more of
		// something still needed, so it is always its own item.
		if (!$parsed['checked']) {
			$merge = new ItemMerge($pack);
			$onList = $this->mapper->findAllByList($listId);

			$open = $merge->findOpenMatch($onList, $name);
			if ($open !== null) {
				// A bare name counts as one more. The total isn't a typed
				// amount, so it is not remembered for the name.
				$merged = $merge->mergeQuantities($open->getQuantity(), $quantity ?? '1');
				$fields = ['quantity' => $merged];
				$before = self::leadingNumber($open->getQuantity());
				$after = self::leadingNumber($merged);
				if ($before !== null && $after !== null && $before <= 1 && $after > 1) {
					$plural = $merge->pluralizeName($open->getName());
					if ($plural !== $open->getName()) {
						$fields['name'] = $plural;
					}
				}
				return new TextAddResult($this->items->update($open->getId(), $fields, $userId), TextAddResult::MERGED);
			}

			// Ticked off already: bring that one back rather than add another
			// beside it. A typed amount replaces its old one; a bare name keeps it.
			$ticked = $merge->findCheckedMatch($onList, $name);
			if ($ticked !== null) {
				if ($quantity !== null) {
					$this->items->update($ticked->getId(), ['quantity' => $quantity, 'quantityExplicit' => true], $userId);
				}
				return new TextAddResult($this->items->check($ticked->getId(), false, $userId), TextAddResult::RESTORED);
			}
		}

		$item = $this->items->create(
			$listId,
			$name,
			$quantity,
			null,
			// No keyword match leaves it to the list's default area, which create() applies
			$this->areas->detectArea($listId, $name),
			$userId,
			false,
			$parsed['checked'],
			$quantity !== null,
			$via,
		);
		return new TextAddResult($item, TextAddResult::CREATED);
	}

	/**
	 * Change an item's name and amount from one line ("3 pints Milk"), as
	 * when its text is edited in an app that shows it that way. No amount in
	 * the line clears the amount. The item's area is left alone.
	 *
	 * @throws \InvalidArgumentException when no item name is left after the amount
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function updateFromText(int $id, string $text, string $userId): Item {
		$language = $this->l->getLanguageCode();
		$parsed = $this->readLine(ParsingPack::forLanguage($language), $language, $text);
		$fields = ['name' => $parsed['name'], 'quantity' => $parsed['quantity']];
		if ($parsed['quantity'] !== null) {
			$fields['quantityExplicit'] = true;
		}
		return $this->items->update($id, $fields, $userId);
	}

	/**
	 * Change only an item's amount ("three pints"). The name is never
	 * touched, so a word the parser doesn't know can't end up in it: anything
	 * left over after the amount and its unit refuses the change instead.
	 *
	 * @throws \InvalidArgumentException when the text isn't just an amount
	 * @throws NotFoundException
	 * @throws NoPermissionException
	 */
	public function updateAmount(int $id, string $amountText, string $userId): Item {
		$language = $this->l->getLanguageCode();
		$parser = new IngredientParser(ParsingPack::forLanguage($language));
		$amount = $parser->parseAmount(SpokenNumbers::normalise($amountText, $language, true));
		if ($amount === null) {
			throw new \InvalidArgumentException('That is not an amount');
		}
		return $this->items->update($id, ['quantity' => $amount, 'quantityExplicit' => true], $userId);
	}

	/**
	 * Spoken numbers, then the parser.
	 *
	 * @return array{name: string, quantity: ?string, checked: bool}
	 * @throws \InvalidArgumentException when no item name is left after the amount
	 */
	private function readLine(ParsingPack $pack, string $language, string $text): array {
		$parser = new IngredientParser($pack);
		// The user's language, not the pack's: English number words are no use to a Bulgarian user
		$line = SpokenNumbers::normalise($text, $language);
		$parsed = $parser->parse($line);
		// The parser falls back to the whole line as the name, so "2" or
		// "[x] 2" would otherwise become an item called "2".
		if ($parsed['name'] === '' || $parser->parseAmount($parser->stripListMarkup($line)) !== null) {
			throw new \InvalidArgumentException('The line has no item name');
		}
		return $parsed;
	}

	/** The number an amount starts with, as parseFloat reads it in the web app */
	private static function leadingNumber(?string $quantity): ?float {
		return preg_match('/^\s*(\d+(?:\.\d+)?)/', $quantity ?? '', $m) ? (float)$m[1] : null;
	}
}
