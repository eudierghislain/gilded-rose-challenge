import { InventoryManager } from "@/interfaces/inventory-manager.interface";
import { Item } from "@/interfaces/item.interface";
import { isNotLastDay, showDayIndication } from "@/utils/index";

export class InventoryManagerUtil {
    public static getInventoryForDays(inventoryManager: InventoryManager, requestedDays: number[]): Item [] {
        console.log("OMGHAI!");
        const items: Item[] = inventoryManager.getItems();
        requestedDays.forEach((currentDay: number, dayIndex: number): void => {
            showDayIndication(currentDay, requestedDays);
            console.table(items);
            if (isNotLastDay(dayIndex, requestedDays)) inventoryManager.updateQuality(items);
        });
        return items;
    }
}
