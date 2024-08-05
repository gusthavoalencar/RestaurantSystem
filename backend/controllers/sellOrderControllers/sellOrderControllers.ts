import { Request, Response } from "express";
import { ISellOrderItems, SellOrder } from "../../models/sellOrder";
import { fetchItemsInSellOrder } from "./sellOrderControllers.utils";

const sellOrderControllers = {
  // Create a sell order
  createSellOrder: async (req: Request, res: Response) => {
    try {
      const {
        items,
        comment,
        status,
        type,
        tableNumber,
        address,
        city,
        region,
        country,
        total
      }: {
        items: ISellOrderItems[];
        comment?: string;
        status: string;
        type: "delivery" | "dine-in";
        tableNumber?: number;
        address?: string;
        city?: string;
        region?: string;
        country?: string;
        total: number;
      } = req.body;

      if (items.length < 1) {
        return res.status(400).json({ error: "Items array must contain at least one item" });
      }

      // Fetch items in sell order
      const orderItems = await fetchItemsInSellOrder(items);

      const sellOrder = new SellOrder({
        items: orderItems,
        comment,
        status,
        type,
        tableNumber,
        address,
        city,
        region,
        country,
        total
      });
      await sellOrder.save();

      return res.status(200).json(sellOrder);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Get sell orders
  getSellOrders: async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      const query = status ? { status } : {};

      const sellOrders = await SellOrder.find(query);

      return res.status(200).json(sellOrders);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Get sell order by ID
  getSellOrderById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing 'id' parameter" });
      }

      const sellOrder = await SellOrder.findById(id);

      if (!sellOrder) {
        return res.status(404).json({ error: "Sell order not found" });
      }

      return res.status(200).json(sellOrder);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Edit sell order
  editSellOrder: async (req: Request, res: Response) => {
    try {
      const sellOrderId = req.body._id;
      const updateData = req.body;

      if (!sellOrderId) {
        return res.status(400).json({ error: "sellOrder ID must be provided" });
      }

      const existingSellOrder = await SellOrder.findById(sellOrderId);

      if (!existingSellOrder) {
        return res.status(400).json({ error: "Sell Order not found" });
      }

      const updatedSellOrder = await SellOrder.findByIdAndUpdate(sellOrderId, updateData, { new: true });
      if (!updatedSellOrder) {
        return res.status(500).json({ error: "Failed to update sell order" });
      }

      return res.status(200).json(updatedSellOrder);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Delete sell order
  deleteSellOrder: async (req: Request, res: Response) => {
    try {
      const id = req.body._id;

      if (!id) {
        return res.status(400).json({ error: "Missing 'id' parameter" });
      }

      const sellOrder = await SellOrder.findByIdAndDelete(id);

      if (!sellOrder) {
        return res.status(404).json({ error: "Sell order not found" });
      }

      return res.status(200).json({ message: "Sell order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default sellOrderControllers;
