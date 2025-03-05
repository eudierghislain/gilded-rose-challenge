import { InventoryManagerUtil } from "@/core/inventory-manager-utils";
import { QualityUpdate } from "@/core/quality-update-strategy";
import { InventoryManager } from "@/interfaces/inventory-manager.interface";
import { Item } from "@/interfaces/item.interface";

export class OtherStore implements InventoryManager {

    private items: Array<Item> = [];

    constructor() { }

    public setItems = (items: Array<Item>): void => {
        this.items = items;
    }

    public getItems = (): Item[] => {
        return this.items;
    }

    public updateQuality(): void {
        QualityUpdate.applyOtherStockStrategy(this.items);
    }

    public getInventoryForDays(requestedDays: number[]): Item[] {
        return InventoryManagerUtil.getInventoryForDays(this, requestedDays);
    }

}