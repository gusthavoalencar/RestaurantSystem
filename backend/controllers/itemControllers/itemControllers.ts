import { Request, Response } from 'express';
import Item from '../../models/item';

const itemControllers = {
  //Gets all items
  getItems: async (req: Request, res: Response) => {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
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
      console.log('Request: ' + req);

      const item = req.body;
      console.log('item: ' + item);

      const existingItem = await Item.findOne({ name: item.name });
      console.log('existingItem: ' + existingItem);

      if (existingItem) {
        return res.status(400).json({ error: 'Item already exists' });
      }

      const savedItem = await new Item(item).save();

      return res.status(200).json(savedItem);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Deletes an item
  //Add the Id as a param to the URL
  deleteItem: async (req: Request, res: Response) => {
    try {
      const itemId = req.params.id;
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      return res.status(200).json(deletedItem);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default itemControllers;
