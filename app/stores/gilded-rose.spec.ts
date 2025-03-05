import { GildedRoseStore } from "./gilded-rose";
import { Item } from "../interfaces/item.interface";
import { QualityUpdate } from "../core/quality-update-strategy";
import { InventoryManagerUtil } from "../core/inventory-manager-utils";

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
            { name: "item1", sellIn: 10, quality: 20 },
            { name: "item2", sellIn: 5, quality: 30 }
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

        it("should return all items after they are set", () => {
            store.setItems(testItems);
            const items = store.getItems();

            expect(items.length).toBe(2);
            expect(items[0].name).toBe("item1");
            expect(items[1].name).toBe("item2");
        });

        it("should return a reference to the internal items array", () => {
            store.setItems(testItems);
            const items = store.getItems();

            // Modify the returned array
            items[0].quality = 99;

            // The internal state should be modified
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

    describe("getInventoryForDays", () => {
        it("should call InventoryManagerUtil.getInventoryForDays with store and requested days", () => {
            const requestedDays = [1, 2, 3];
            const mockReturnValue = [{ name: "test", sellIn: 5, quality: 10 }];

            (InventoryManagerUtil.getInventoryForDays as jest.Mock).mockReturnValue(mockReturnValue);

            store.setItems(testItems);
            const result = store.getInventoryForDays(requestedDays);

            expect(InventoryManagerUtil.getInventoryForDays).toHaveBeenCalledTimes(1);
            expect(InventoryManagerUtil.getInventoryForDays).toHaveBeenCalledWith(store, requestedDays);
            expect(result).toBe(mockReturnValue);
        });
    });
});