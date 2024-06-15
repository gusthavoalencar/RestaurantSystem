import mongoose, { Schema, Document } from "mongoose";

export interface ISellOrderItems {
  id: mongoose.Types.ObjectId;
  name: string;
  menuCategory: string;
  quantity: number;
  isMultiOptions: boolean;
  selectedOption?: string;
  price: number;
}

export interface ISellOrder extends Document {
  items: ISellOrderItems[];
  comment: string;
  status: "pending" | "complete" | "cancelled" | "hidden" | "void";
  type: "delivery" | "dine-in";
  tableNumber: number;
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
        name: { type: String, required: true },
        menuCategory: { type: String, required: true },
        price: { type: Number, required: true },
        isMultiOptions: { type: Boolean, required: true },
        selectedOption: { type: String },
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

const SellOrder = mongoose.model<ISellOrder>("SellOrder", sellOrderSchema);
export { ISellOrder as SellOrderItem, SellOrder };
