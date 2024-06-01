import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IItem extends mongoose.Document {
  name: string;
  amount: number;
  isMenuItem: boolean;
  menuSection: string[];
  MenuCategory: string;
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
    menuSection: { type: [String], required: false },
    MenuCategory: {
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
