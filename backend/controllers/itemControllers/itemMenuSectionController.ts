import { Request, Response } from "express";
import ItemMenuSection from "../../models/ItemMenuSection";

const itemMenuSectionControllers = {
  //Gets all itemMenuSection
  getItemMenuSections: async (req: Request, res: Response) => {
    try {
      const itemMenuSections = await ItemMenuSection.find();

      return res.status(200).json(itemMenuSections);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Create itemMenuSection
  createItemMenuSection: async (req: Request, res: Response) => {
    try {
      const itemMenuSection = req.body;

      const existingItemCategory = await ItemMenuSection.findOne({ name: itemMenuSection.name });

      if (existingItemCategory) {
        return res.status(400).json({ error: "Item Menu Section already exists" });
      }

      const savedItem = await new ItemMenuSection(itemMenuSection).save();

      return res.status(200).json(savedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Deletes an itemMenuSection
  //Add the Id as a query to the URL
  deleteItemMenuSection: async (req: Request, res: Response) => {
    try {
      const itemMenuSectionId = req.query.id;
      const itemMenuSection = await ItemMenuSection.findByIdAndDelete(itemMenuSectionId);
      if (!itemMenuSection) {
        return res.status(400).json({ error: "Item Menu Section not found" });
      }

      return res.status(200).json(itemMenuSection);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default itemMenuSectionControllers;
