import { GildedRoseStore } from "./gilded-rose";
import { Item } from "../interfaces/item.interface";
import { QualityUpdate } from "../core/quality-update-strategy";
import { showDayIndication } from "../utils";

jest.mock("@/core/quality-update-strategy", () => ({
    QualityUpdate: {
        applyGildedRoseStrategy: jest.fn()
    }
}));

jest.mock("@/core/inventory-manager-utils", () => ({
    InventoryManagerUtil: {
        getInventoryForDays: jest.fn()
    }
}));

describe("GildedRoseStore", () => {
    let store: GildedRoseStore;
    let testItems: Item[];

    beforeEach(() => {
        store = new GildedRoseStore();
        testItems = [
            { name: "+5 Dexterity Vest", sellIn: 10, quality: 20 },
            { name: "Aged Brie", sellIn: 2, quality: 0 },
            { name: "Elixir of the Mongoose", sellIn: 5, quality: 7 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49 },
            { name: "Conjured Mana Cake", sellIn: 3, quality: 6 }
        ];

        jest.clearAllMocks();
    });

    describe("setItems", () => {
        it("should set items correctly", () => {
            store.setItems(testItems);
            expect(store.getItems()).toEqual(testItems);
        });

        it("should replace existing items", () => {
            const initialItems = [{ name: "initial", sellIn: 1, quality: 1 }];
            store.setItems(initialItems);

            store.setItems(testItems);
            expect(store.getItems()).toEqual(testItems);
            expect(store.getItems()).not.toEqual(initialItems);
        });
    });

    describe("getItems", () => {
        it("should return empty array initially", () => {
            expect(store.getItems()).toEqual([]);
        });

        it("should return a reference to the internal items array", () => {
            store.setItems(testItems);
            const items = store.getItems();
            items[0].quality = 99;
            expect(store.getItems()[0].quality).toBe(99);
        });
    });

    describe("updateQuality", () => {
        it("should call QualityUpdate.applyGildedRoseStrategy with the items", () => {
            store.setItems(testItems);
            store.updateQuality();

            expect(QualityUpdate.applyGildedRoseStrategy).toHaveBeenCalledTimes(1);
            expect(QualityUpdate.applyGildedRoseStrategy).toHaveBeenCalledWith(testItems);
        });

        it("should call QualityUpdate.applyGildedRoseStrategy with empty array if no items set", () => {
            store.updateQuality();

            expect(QualityUpdate.applyGildedRoseStrategy).toHaveBeenCalledTimes(1);
            expect(QualityUpdate.applyGildedRoseStrategy).toHaveBeenCalledWith([]);
        });
    });

    it("Approval should thirtyDays", () => {
        jest.unmock("@/core/quality-update-strategy");
        const { QualityUpdate } = jest.requireActual("@/core/quality-update-strategy");

        const generateDaysArray = (numberOfDays: number): number[] => {
            return Array.from({ length: numberOfDays + 1 }, (_, i) => i);
        };

        const isNotLastDay = (currentIndex: number, daysArray: number[]): boolean => {
            return currentIndex < daysArray.length - 1;
        };

        const requestedDays = generateDaysArray(30);
        const items: Item[] = JSON.parse(JSON.stringify(testItems));
        let output = "OMGHAI!\n";



        for (let currentDay = 0; currentDay < requestedDays.length; currentDay++) {
            const day = requestedDays[currentDay];

            output += `${showDayIndication(day, requestedDays)}\n`;
            output += "name, sellIn, quality\n";
            items.forEach(item => {
                output += `${item.name}, ${item.sellIn}, ${item.quality}\n`;
            });
            output += "\n";

            if (isNotLastDay(currentDay, requestedDays)) {
                QualityUpdate.applyGildedRoseStrategy(items);
            }
        }

        expect(output).toMatchSnapshot();
    });
});