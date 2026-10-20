<?php

declare(strict_types=1);

namespace OCA\Shopping_List\Service;

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
		$parser = new IngredientParser($pack);
		$line = SpokenNumbers::normalise($text, $language);
		$parsed = $parser->parse($line);
		// The parser falls back to the whole line as the name, so "2" would
		// otherwise become an item called "2".
		if ($parsed['name'] === '' || $parser->parseAmount($line) !== null) {
			throw new \InvalidArgumentException('The line has no item name');
		}
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

	/** The number an amount starts with, as parseFloat reads it in the web app */
	private static function leadingNumber(?string $quantity): ?float {
		return preg_match('/^\s*(\d+(?:\.\d+)?)/', $quantity ?? '', $m) ? (float)$m[1] : null;
	}
}
