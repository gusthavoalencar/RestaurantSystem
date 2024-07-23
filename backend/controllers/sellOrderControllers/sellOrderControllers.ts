import { Request, Response } from "express";
import { ISellOrderItems, SellOrder } from "../../models/sellOrder";
import { fetchItemsInSellOrder } from "./sellOrderControllers.utils";

const sellOrderControllers = {
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
        country
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
      } = req.body;

      if (items.length < 1) {
        return res.status(400).json({ error: "Items array must contain at least one item" });
      }

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
        total: orderItems.reduce((acc, item) => acc + item.price, 0)
      });
      await sellOrder.save();

      return res.status(200).json(sellOrder);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  getSellOrders: async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      const query = status ? { status } : {};

      const sellOrders = await SellOrder.find(query);

      return res.status(200).json(sellOrders);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default sellOrderControllers;
