# Gilded Rose Inventory Management System

Welcome to the Gilded Rose Inventory Management System! This TypeScript application helps manage the inventory of the Gilded Rose tavern by updating the quality and sellIn values of items according to specific business rules.

## About The Gilded Rose

The Gilded Rose is a small tavern in a prominent city run by the friendly innkeeper Allison. We pride ourselves on buying and selling only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell-by date.

Our system was originally developed by Leeroy, who has now moved on to new adventures. Your mission is to add new functionality to our system to handle a new category of items.

## System Overview

Each item in our inventory has two properties:

- `sellIn`: The number of days we have to sell the item
- `quality`: How valuable the item is

At the end of each day, our system automatically updates both of these values for every item.

## Business Rules

Our inventory management follows these specific rules:

- Once the sell-by date has passed, quality degrades twice as fast
- The quality of an item can never be negative
- "Aged Brie" actually increases in quality as it gets older
- The quality of an item is never more than 50
- "Sulfuras" is a legendary item that never has to be sold and never decreases in quality
- "Backstage passes" increase in quality as the sellIn value approaches:
  - Quality increases by 2 when there are 10 days or less
  - Quality increases by 3 when there are 5 days or less
  - Quality drops to 0 after the concert

### New Requirement

We've recently signed a supplier contract for "Conjured" items. These items degrade in quality twice as fast as normal items.

## Technical Constraints

You can make any changes to the `updateQuality` method and add any new code as long as everything still works correctly. However, you may not alter the `Item` class or its properties, as this was created by a goblin in the corner who will insta-rage and kill you if you change his code. You've been warned!

Note: While an item can never have its quality increase above 50, "Sulfuras" is a legendary item with a quality of 80 that never changes.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application:

```
npm run start
```

By default, it will run for 2 days. You can specify a different number of days:

```
npm run start 5
```

### Running Tests

To run all tests:

```
npm run test
```

To run specific tests:

```
npm run test utils
```

## Project Structure

```
app/
├── core/
│   ├── inventory-manager-utils.ts
│   └── quality-update-strategy.ts
├── interfaces/
│   ├── inventory-manager.interface.ts
│   ├── stock.interface.ts
│   └── item.interface.ts
├── utils/
│   └── index.ts
├── stores/
│   ├── other-store.ts
│   └── gilded-rose.ts
└── main.ts
...
```

## Architecture

This project uses composition as its primary design pattern rather than inheritance. This approach follows the "composition over inheritance" principle, which makes the code more flexible and maintainable.

Key composition aspects:
- The `Stock` class is composed with an `InventoryManager` implementation
- The `GildedRoseStore` delegates functionality to specialized utility classes
- Strategy patterns are used for different quality update rules
- Dependency injection is used in specific places, such as when the `InventoryManager` is passed to `Stock` and when `InventoryManagerUtil.getInventoryForDays()` receives an `InventoryManager` instance

This design allows for easy extension of the system with new item types or business rules without modifying existing code, adhering to the Open/Closed Principle.

## Technologies Used

- TypeScript
- Jest (for testing)
- ts-node (for running TypeScript files)

## License

This project is licensed under the MIT License