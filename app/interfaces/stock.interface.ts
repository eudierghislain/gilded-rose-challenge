import { InventoryManager } from "@/interfaces/inventory-manager.interface";
import { Item } from "@/interfaces/item.interface";

export class Stock {

    private inventoryManager: InventoryManager;

    constructor(inventoryManager: InventoryManager) {
        this.inventoryManager = inventoryManager;
    }

    public setItems(items: Item[]): void {
        this.inventoryManager.setItems(items);
    }

    public getItems(): Item[] {
        return this.inventoryManager.getItems();
    }

    public getInventoryForDays(days: number[]): void {
        return this.inventoryManager.getInventoryForDays(days);
    }

    public updateQuality(items: Item[]): void {
        return this.inventoryManager.updateQuality(items);
    }

}