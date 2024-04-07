import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IItemType extends mongoose.Document {
  name: string;
  active: boolean;
  createdBy: string;
}

const itemTypeSchema = new Schema(
  {
    name: { type: String, required: [true, "Item type name cannot be empty"] },
    active: { type: Boolean, required: [true, "Active cannot be null "] },
    //future implementation
    createdBy: { type: String, required: [false, ""] }
  },
  { timestamps: true }
);

const ItemType = mongoose.model<IItemType>("ItemType", itemTypeSchema);

export default ItemType;
