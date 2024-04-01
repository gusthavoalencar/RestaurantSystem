import { Request, Response } from "express";
import Item from "../../models/item";

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
  //     "name": "Salad",
  //      "price": 9.99,
  //      "stockAmount": 10,
  //      "type": "starter"
  // }
  createItem: async (req: Request, res: Response) => {
    try {
      const item = req.body;

      const existingItem = await Item.findOne({ name: item.name });

      if (existingItem) {
        return res.status(400).json({ error: "Item already exists" });
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
        return res.status(404).json({ error: "Item not found" });
      }

      return res.status(200).json(deletedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default itemControllers;
