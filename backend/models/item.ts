import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IItem extends mongoose.Document {
  name: string;
  type: ["starter", "main", "dessert", "drink"];
  price: number;
  stockAmount: number;
}

const itemSchema = new Schema(
  {
    name: { type: String, required: [true, "Name cannot be empty"] },
    type: { type: String, required: [true, "Item type is required"] },
    price: {
      type: Number,
      required: [true, "Price must be a positive number"]
    },
    stockAmount: {
      type: Number,
      required: [true, "Stock amount must be a non-negative number"]
    }
  },
  { timestamps: true }
);

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
