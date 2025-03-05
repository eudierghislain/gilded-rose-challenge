import { Item } from "@/interfaces/item.interface";

export interface InventoryManager {
    setItems(items: Item[]): void;
    getItems(): Item[];
    getInventoryForDays(days: number[]): void;
    updateQuality(items : Item []) : void
}
