import { Item, ItemType } from './item.interface';

describe('Item', () => {
    it('should create an instance of Item with given properties', () => {
        const item = new Item('Aged Brie', 10, 20);
        expect(item.name).toBe('Aged Brie');
        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(20);
    });

    it('should create an instance of Item with different properties', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
        expect(item.name).toBe('Sulfuras, Hand of Ragnaros');
        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(80);
    });
});

describe('ItemType', () => {
    it('should have the correct enum values', () => {
        expect(ItemType.NORMAL).toBe('NORMAL');
        expect(ItemType.AGED_BRIE).toBe('Aged Brie');
        expect(ItemType.BACKSTAGE_PASSES).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(ItemType.SULFURAS).toBe('Sulfuras, Hand of Ragnaros');
        expect(ItemType.CONJURED).toBe('Conjured Mana Cake');
        expect(ItemType.ELIXIR).toBe('Elixir of the Mongoose');
        expect(ItemType.DEXTERITY_VEST).toBe('+5 Dexterity Vest');
    });
});