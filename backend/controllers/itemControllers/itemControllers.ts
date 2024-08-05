import { Request, Response } from "express";
import Item from "../../models/item";
import ItemMenuSection from "../../models/ItemMenuSection";

const itemControllers = {
  //Gets all items
  getItems: async (req: Request, res: Response) => {
    try {
      const query = req.query;
      let items;

      if (query.isMenuItem !== undefined) {
        const isMenuItem = query.isMenuItem === "true";
        items = await Item.find({ isMenuItem });
      } else {
        items = await Item.find();
      }
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Creates an item for the inventory
  createItem: async (req: Request, res: Response) => {
    try {
      const item = req.body;
      delete item._id;

      const existingItem = await Item.findOne({ name: item.name });

      if (existingItem) {
        return res.status(400).json({ error: "Item already exists" });
      }

      const existingMenuSections = await ItemMenuSection.find({ name: { $in: item.menuSections } });

      if (existingMenuSections.length !== item.menuSections.length) {
        const missingMenuSections = item.menuSections.filter(
          (menuSectionName: string) =>
            !existingMenuSections.some((dbMenuSection) => dbMenuSection.name == menuSectionName)
        );
        return res.status(400).json({ error: `Item Menu Sections not found: ${missingMenuSections.join(", ")}` });
      }

      const savedItem = await new Item(item).save();

      return res.status(200).json(savedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Edits an item
  editItem: async (req: Request, res: Response) => {
    try {
      const itemId = req.body._id;
      if (!itemId) {
        return res.status(400).json({ error: "Item ID must be provided" });
      }

      const updateData = req.body;

      const existingItem = await Item.findById(itemId);
      if (!existingItem) {
        return res.status(400).json({ error: "Item not found" });
      }

      // Check if menu sections exist
      if (updateData.menuSections) {
        const existingMenuSections = await ItemMenuSection.find({ name: { $in: updateData.menuSections } });
        if (existingMenuSections.length !== updateData.menuSections.length) {
          const missingMenuSections = updateData.menuSections.filter(
            (menuSectionName: string) =>
              !existingMenuSections.some((dbMenuSection) => dbMenuSection.name == menuSectionName)
          );
          return res.status(400).json({ error: `Item Menu Sections not found: ${missingMenuSections.join(", ")}` });
        }
      }

      const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
      if (!updatedItem) {
        return res.status(500).json({ error: "Failed to update item" });
      }

      return res.status(200).json(updatedItem);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  //Deletes an item by id
  deleteItem: async (req: Request, res: Response) => {
    try {
      const itemId = req.body._id;
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
