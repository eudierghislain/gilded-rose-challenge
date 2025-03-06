import { QualityUpdate } from "./quality-update-strategy";
import { Item, ItemType } from "../interfaces/item.interface";

describe("QualityUpdate", () => {
    describe("applyGildedRoseStrategy", () => {
        // Test for normal items
        it("should degrade the quality and sellIn of normal items", () => {
            const items: Item[] = [
                { name: "normal item", sellIn: 10, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(19);
        });

        // Test for quality degrading twice as fast after sell by date
        it("should degrade quality twice as fast after the sell by date", () => {
            const items: Item[] = [
                { name: "normal item", sellIn: 0, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].sellIn).toBe(-1);
            expect(items[0].quality).toBe(18); // -2 because expired
        });

        // Test for quality never being negative
        it("should not allow quality to become negative", () => {
            const items: Item[] = [
                { name: "normal item", sellIn: 10, quality: 0 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].quality).toBe(0);
        });

        // Test for Aged Brie increasing in quality over time
        it("should increase the quality of 'Aged Brie' over time", () => {
            const items: Item[] = [
                { name: ItemType.AGED_BRIE, sellIn: 10, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(21);
        });

        // Test for Aged Brie increasing in quality twice as fast after expiration
        it("should increase the quality of 'Aged Brie' twice as fast after expiration", () => {
            const items: Item[] = [
                { name: ItemType.AGED_BRIE, sellIn: 0, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].sellIn).toBe(-1);
            expect(items[0].quality).toBe(22); // +2 because expired
        });

        // Test for quality never exceeding 50
        it("should not allow quality to exceed 50", () => {
            const items: Item[] = [
                { name: ItemType.AGED_BRIE, sellIn: 10, quality: 50 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].quality).toBe(50);
        });

        // Test for Sulfuras never changing
        it("should not modify 'Sulfuras'", () => {
            const items: Item[] = [
                { name: ItemType.SULFURAS, sellIn: 10, quality: 80 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            expect(items[0].sellIn).toBe(10); // Does not change
            expect(items[0].quality).toBe(80); // Does not change
        });

        // Tests for Backstage passes
        describe("Backstage passes", () => {
            it("should increase quality normally when there are more than 10 days left", () => {
                const items: Item[] = [
                    { name: ItemType.BACKSTAGE_PASSES, sellIn: 11, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(10);
                expect(items[0].quality).toBe(21); // +1 normal
            });

            it("should increase quality by 2 when there are 10 days or less left", () => {
                const items: Item[] = [
                    { name: ItemType.BACKSTAGE_PASSES, sellIn: 10, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(9);
                expect(items[0].quality).toBe(22); // +2 because 10 days or less
            });

            it("should increase quality by 3 when there are 5 days or less left", () => {
                const items: Item[] = [
                    { name: ItemType.BACKSTAGE_PASSES, sellIn: 5, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(4);
                expect(items[0].quality).toBe(23); // +3 because 5 days or less
            });

            it("should drop quality to 0 after the concert", () => {
                const items: Item[] = [
                    { name: ItemType.BACKSTAGE_PASSES, sellIn: 0, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(-1);
                expect(items[0].quality).toBe(0); // drops to 0 after the concert
            });

            it("should not exceed the maximum quality of 50", () => {
                const items: Item[] = [
                    { name: ItemType.BACKSTAGE_PASSES, sellIn: 5, quality: 49 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].quality).toBe(50); // Capped at 50 despite +3
            });
        });

        // Tests for Conjured items
        describe("Conjured items", () => {
            it("should degrade 'Conjured' items twice as fast", () => {
                const items: Item[] = [
                    { name: ItemType.CONJURED, sellIn: 10, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(9);
                expect(items[0].quality).toBe(18); // -2 because Conjured
            });

            it("should degrade 'Conjured' items four times as fast after expiration", () => {
                const items: Item[] = [
                    { name: ItemType.CONJURED, sellIn: 0, quality: 20 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].sellIn).toBe(-1);
                expect(items[0].quality).toBe(16); // -4 because Conjured and expired
            });

            it("should not allow quality to become negative for 'Conjured' items", () => {
                const items: Item[] = [
                    { name: ItemType.CONJURED, sellIn: 0, quality: 3 }
                ];

                QualityUpdate.applyGildedRoseStrategy(items);

                expect(items[0].quality).toBe(0); // Quality never negative
            });
        });

        // Test for multiple items at once
        it("should handle multiple items correctly in one pass", () => {
            const items: Item[] = [
                { name: "normal item", sellIn: 10, quality: 20 },
                { name: ItemType.AGED_BRIE, sellIn: 10, quality: 20 },
                { name: ItemType.BACKSTAGE_PASSES, sellIn: 10, quality: 20 },
                { name: ItemType.SULFURAS, sellIn: 10, quality: 80 },
                { name: ItemType.CONJURED, sellIn: 10, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            // Normal item
            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(19);

            // Aged Brie
            expect(items[1].sellIn).toBe(9);
            expect(items[1].quality).toBe(21);

            // Backstage passes
            expect(items[2].sellIn).toBe(9);
            expect(items[2].quality).toBe(22);

            // Sulfuras
            expect(items[3].sellIn).toBe(10);
            expect(items[3].quality).toBe(80);

            // Conjured
            expect(items[4].sellIn).toBe(9);
            expect(items[4].quality).toBe(18);
        });

        // Other types of items (Dexterity Vest, Elixir...)
        it("should handle standard items as normal items", () => {
            const items: Item[] = [
                { name: ItemType.DEXTERITY_VEST, sellIn: 10, quality: 20 },
                { name: ItemType.ELIXIR, sellIn: 10, quality: 20 }
            ];

            QualityUpdate.applyGildedRoseStrategy(items);

            // Dexterity Vest
            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(19);

            // Elixir
            expect(items[1].sellIn).toBe(9);
            expect(items[1].quality).toBe(19);
        });
    });

    describe("applyOtherStockStrategy", () => {
        it("should log 'Not implemented'", () => {
            const consoleSpy = jest.spyOn(console, 'log');
            QualityUpdate.applyOtherStockStrategy([]);
            expect(consoleSpy).toHaveBeenCalledWith('Not implemented');
            consoleSpy.mockRestore();
        });
    });

    describe("QualityUpdate", () => {
        describe("Sulfuras after expiration", () => {
            it("should log 'No change' for expired Sulfuras items", () => {
                const items: Item[] = [
                    { name: ItemType.SULFURAS, sellIn: 0, quality: 80 }
                ];

                // Mock console.log
                const consoleSpy = jest.spyOn(console, 'log');

                // Cet appel devrait déclencher le console.log dans le cas d'un Sulfuras expiré
                QualityUpdate.applyGildedRoseStrategy(items);

                // Vérifier que le console.log a été appelé avec 'No change'
                expect(consoleSpy).toHaveBeenCalledWith('No change');

                // Vérifier également que les propriétés de l'item n'ont pas changé
                expect(items[0].sellIn).toBe(0);
                expect(items[0].quality).toBe(80);

                // Restaurer console.log
                consoleSpy.mockRestore();
            });
        });
    });
});