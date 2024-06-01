import { Request, Response } from "express";
import Item from "../../models/item";
import ItemCategory from "../../models/ItemMenuSection";

const itemControllers = {
  //Gets all items
  getItems: async (req: Request, res: Response) => {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Creates an item for the inventory
  // Example of a request object to create:
  // {
  //     "name": "Fruit Salad",
  //     "amount": 5,
  //     "isMenuItem": true,
  //     "itemCategories": ["favorites", "salads"],
  //      "price": 9.99,
  //      "active": true
  // }
  createItem: async (req: Request, res: Response) => {
    try {
      const item = req.body;

      const existingItem = await Item.findOne({ name: item.name });

      if (existingItem) {
        return res.status(400).json({ error: "Item already exists" });
      }

      const existingCategories = await ItemCategory.find({ name: { $in: item.itemCategories } });

      if (existingCategories.length !== item.itemCategories.length) {
        const missingCategories = item.itemCategories.filter(
          (categoryName: string) => !existingCategories.some((dbCategory) => dbCategory.name == categoryName)
        );
        return res.status(400).json({ error: `Item Category not found: ${missingCategories.join(", ")}` });
      }

      const savedItem = await new Item(item).save();

      return res.status(200).json(savedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Deletes an item
  //Add the Id as a query to the URL
  deleteItem: async (req: Request, res: Response) => {
    try {
      const itemId = req.query.id;
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(400).json({ error: "Item not found" });
      }

      return res.status(200).json(deletedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default itemControllers;
