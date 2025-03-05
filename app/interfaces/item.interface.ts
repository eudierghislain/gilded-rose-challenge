export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export enum ItemType {
    NORMAL = "NORMAL",
    AGED_BRIE = "Aged Brie",
    BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert",
    SULFURAS = "Sulfuras, Hand of Ragnaros",
    CONJURED = "Conjured Mana Cake",
    ELIXIR = "Elixir of the Mongoose",
    DEXTERITY_VEST = "+5 Dexterity Vest"
}
