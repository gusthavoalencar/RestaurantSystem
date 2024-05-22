import { ISellOrderItems } from "../../models/sellOrder";
import Item from "../../models/item";

const fetchItemsInSellOrder = async (items: ISellOrderItems[]): Promise<ISellOrderItems[]> => {
  try {
    const itemIds = items.map((item) => item.id);
    const foundItems = await Item.find({ _id: { $in: itemIds } });
    const foundItemIds = foundItems.map((item) => item._id.toString());
    const missingItemIds = itemIds.filter((itemId) => !foundItemIds.includes(itemId.toString()));

    if (missingItemIds.length > 0) {
      throw new Error(`The following items were not found in the database: ${missingItemIds.join(", ")}`);
    }

    const orderItems = items.map((item) => ({
      id: item.id,
      quantity: item.quantity
    }));

    return orderItems;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("There was an error fetching the items in the order: " + error.message);
    }
    throw new Error("There was an error fetching the items in the order");
  }
};

export { fetchItemsInSellOrder };
