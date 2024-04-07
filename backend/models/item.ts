import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IItem extends mongoose.Document {
  name: string;
  amount: number;
  isMenuItem: boolean;
  itemCategories: string[];
  price: number;
  active: boolean;
}

const itemSchema = new Schema(
  {
    name: { type: String, required: [true, "Name cannot be empty"] },
    amount: {
      type: Number,
      required: false
    },
    isMenuItem: { type: Boolean, required: [true, "isMenuItem boolean value is required"] },
    itemCategories: { type: [String], required: false },
    price: {
      type: Number,
      required: false
    },
    active: { type: Boolean, required: [true, "Active status boolean value is required"] }
  },
  { timestamps: true }
);

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
