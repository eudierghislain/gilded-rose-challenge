import { GildedRoseStore } from '@/stores/gilded-rose';
import { Item, ItemType } from '@/interfaces/item.interface';
import { Stock } from '@/interfaces/stock.interface';
import { getUserInput } from '@/utils';

/** DEFINE ITEMS IN GILDED ROSE STOCK */
const items: Item[] = [
  new Item(ItemType.DEXTERITY_VEST, 10, 20),
  new Item(ItemType.AGED_BRIE, 2, 0),
  new Item(ItemType.ELIXIR, 5, 7),
  new Item(ItemType.SULFURAS, 0, 80),
  new Item(ItemType.SULFURAS, -1, 80),
  new Item(ItemType.BACKSTAGE_PASSES, 15, 20),
  new Item(ItemType.BACKSTAGE_PASSES, 10, 49),
  new Item(ItemType.BACKSTAGE_PASSES, 5, 49),
  new Item(ItemType.CONJURED, 3, 6)
];

/** GET USER INPUT */
const days = getUserInput();

/** DEFINE A NEW STOCK */
const gildedRoseStore = new GildedRoseStore();
const gildedRoseStock: Stock = new Stock(gildedRoseStore);

/** SET ITEMS IN GILDED ROSE STOCK*/
gildedRoseStock.setItems(items);

/** GET GILDED ROSE INVENTORY */
gildedRoseStock.getInventoryForDays(days);