import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the item schema
export interface IItem extends mongoose.Document {
  name: string;
  amount: number;
  isMenuItem: boolean;
  menuSections: string[];
  menuCategory: string;
  isMultiOptions: boolean;
  options: string[];
  price: number;
  active: boolean;
}

// Create the item schema
const itemSchema = new Schema(
  {
    name: { type: String, required: [true, "Name cannot be empty"] },
    amount: {
      type: Number,
      required: false
    },
    isMenuItem: { type: Boolean, required: [true, "isMenuItem boolean value is required"] },
    isMultiOptions: { type: Boolean, required: [true, "isMultiOptions boolean value is required"] },
    menuSections: { type: [String], required: false },
    options: { type: [String], required: false },
    menuCategory: {
      type: String,
      required: function (this: IItem) {
        return this.isMenuItem ? [true, "MenuCategory is required if isMenuItem is true"] : false;
      }
    },
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
