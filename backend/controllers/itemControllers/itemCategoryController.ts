import { Request, Response } from "express";
import ItemCategory from "../../models/itemCategory";

const itemCategoryControllers = {
  //Gets all itemCategories
  getItemCategories: async (req: Request, res: Response) => {
    try {
      const itemCategories = await ItemCategory.find();

      return res.status(200).json(itemCategories);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Create ItemCategory
  createItemCategory: async (req: Request, res: Response) => {
    try {
      const itemCategory = req.body;

      const existingItemCategory = await ItemCategory.findOne({ name: itemCategory.name });

      if (existingItemCategory) {
        return res.status(400).json({ error: "Item Category already exists" });
      }

      const savedItem = await new ItemCategory(itemCategory).save();

      return res.status(200).json(savedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Deletes an itemCategory
  //Add the Id as a query to the URL
  deleteItemCategory: async (req: Request, res: Response) => {
    try {
      const itemCategoryId = req.query.id;
      const itemCategory = await ItemCategory.findByIdAndDelete(itemCategoryId);
      if (!itemCategory) {
        return res.status(404).json({ error: "Item Category not found" });
      }

      return res.status(200).json(itemCategory);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default itemCategoryControllers;
