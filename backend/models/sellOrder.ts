import mongoose, { Schema, Document } from "mongoose";
import Item, { IItem } from "./item";

export interface ISellOrderItems {
  id: mongoose.Types.ObjectId | IItem;
  quantity: number;
}

export interface ISellOrder extends Document {
  items: ISellOrderItems[];
  comment: string;
  status: "pending" | "complete" | "cancelled" | "hidden" | "void";
  type: "delivery" | "dine-in";
  tableNumber: number;
  customerNumber: number;
  address: string;
  city: string;
  region: string;
  country: string;
  total: number;
}

const sellOrderSchema = new Schema<ISellOrder>(
  {
    type: {
      type: String,
      enum: ["delivery", "dine-in"],
      required: true
    },
    items: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, required: true }
      }
    ],
    status: {
      type: String,
      enum: ["pending", "complete", "cancelled", "hidden", "void"],
      default: "pending"
    },
    total: {
      type: Number,
      default: 0
    },
    comment: {
      type: String,
      default: ""
    },
    tableNumber: {
      type: Number,
      required: function (this: ISellOrder) {
        return this.type === "dine-in";
      }
    },
    customerNumber: {
      type: Number,
      required: function (this: ISellOrder) {
        return this.type === "dine-in";
      }
    },
    address: {
      type: String,
      required: function (this: ISellOrder) {
        return this.type === "delivery";
      }
    },
    city: {
      type: String,
      required: function (this: ISellOrder) {
        return this.type === "delivery";
      }
    },
    region: {
      type: String,
      required: function (this: ISellOrder) {
        return this.type === "delivery";
      }
    },
    country: {
      type: String,
      required: function (this: ISellOrder) {
        return this.type === "delivery";
      }
    }
  },
  { timestamps: true }
);

sellOrderSchema.pre<ISellOrder>("save", async function (next) {
  const itemIds = this.items.map((item) => (item.id instanceof mongoose.Types.ObjectId ? item.id : item.id._id));
  const items = await Item.find({ _id: { $in: itemIds } });
  const total = this.items.reduce((accumulator, orderItem) => {
    const item = items.find((item) =>
      item._id.equals(orderItem.id instanceof mongoose.Types.ObjectId ? orderItem.id : orderItem.id._id)
    )!;
    return accumulator + item.price * orderItem.quantity;
  }, 0);
  this.total = total;
  next();
});

const SellOrder = mongoose.model<ISellOrder>("SellOrder", sellOrderSchema);
export { ISellOrder as SellOrderItem, SellOrder };
