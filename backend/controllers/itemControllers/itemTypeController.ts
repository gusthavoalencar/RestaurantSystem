import { Request, Response } from "express";
import ItemType from "../../models/itemType";

const itemTypeControllers = {
  //Gets all itemTypes
  getItemTypes: async (req: Request, res: Response) => {
    try {
      const itemTypes = await ItemType.find();

      return res.status(200).json(itemTypes);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Create ItemType
  createItemType: async (req: Request, res: Response) => {
    try {
      const itemType = req.body;

      const existingItemType = await ItemType.findOne({ name: itemType.name });

      if (existingItemType) {
        return res.status(400).json({ error: "Item Type already exists" });
      }

      const savedItem = await new ItemType(itemType).save();

      return res.status(200).json(savedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Deletes an itemType
  //Add the Id as a query to the URL
  deleteItemType: async (req: Request, res: Response) => {
    try {
      const itemTypeId = req.query.id;
      const itemType = await ItemType.findByIdAndDelete(itemTypeId);
      if (!itemType) {
        return res.status(404).json({ error: "Item Type not found" });
      }

      return res.status(200).json(itemType);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default itemTypeControllers;
