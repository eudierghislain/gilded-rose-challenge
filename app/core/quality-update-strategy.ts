import { Item, ItemType } from "@/interfaces/item.interface";

export class QualityUpdate {

    public static applyOtherStockStrategy(items: Item[]) {
        console.log('Not implemented');
    }

    public static applyGildedRoseStrategy(items: Item[]): void {

        const daysLeftBeforeExpiration = (limit: number) => (item: Item) => item.sellIn <= limit;
        const isExpired = (item: Item) => item.sellIn <= 0;
        const itemHasMaximumQuality = (item: Item) => item.quality < 50;
        const preventQualityZero = (item: Item) => {
            if (item.quality < 0) item.quality = 0;
        };
        const decrementQuality = (item: Item) => {
            if (item.quality > 0) item.quality--;
        };
        const incrementQuality = (item: Item) => {
            if (itemHasMaximumQuality(item)) item.quality++;
        };

        items.forEach((item) => {
            const itemType = item.name;

            if (isExpired(item)) {
                switch (itemType) {
                    case ItemType.AGED_BRIE:
                        incrementQuality(item);  // Increase quality
                        incrementQuality(item);  // Extra increase when expired
                        break;

                    case ItemType.BACKSTAGE_PASSES:
                        item.quality = 0;  // Quality drops to 0 after the concert
                        break;

                    case ItemType.SULFURAS:
                        console.log('No change')
                        break;  // No change for Sulfuras

                    case ItemType.CONJURED:
                        item.quality -= 4;  // Quality degrades twice as fast after expiration
                        break;

                    default:
                        decrementQuality(item);  // Decrease quality normally
                        decrementQuality(item);  // Extra decrease when expired
                        break;
                }
            } else {
                switch (itemType) {
                    case ItemType.AGED_BRIE:
                        incrementQuality(item);  // Increase quality over time
                        break;

                    case ItemType.BACKSTAGE_PASSES:
                        incrementQuality(item);  // Normal increase
                        if (daysLeftBeforeExpiration(10)(item)) incrementQuality(item);  // +2 if 10 days or less
                        if (daysLeftBeforeExpiration(5)(item)) incrementQuality(item);  // +3 if 5 days or less
                        break;

                    case ItemType.CONJURED:
                        item.quality -= 2;  // Degrades twice as fast before expiration
                        break;

                    case ItemType.SULFURAS:
                        break;  // No change for Sulfuras

                    default:
                        decrementQuality(item);  // Decrease quality normally
                        break;
                }
            }

            // Decrement sellIn for all items except Sulfuras
            if (itemType !== ItemType.SULFURAS) {
                item.sellIn -= 1;
            }

            // Apply the minimum quality limit
            preventQualityZero(item);
        });
    }
}