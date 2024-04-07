import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IItemCategory extends mongoose.Document {
  name: string;
  active: boolean;
  createdBy: string;
}

const itemCategorySchema = new Schema(
  {
    name: { type: String, required: [true, "Item category name cannot be empty"] },
    active: { type: Boolean, required: [true, "Active cannot be null "] }
  },
  { timestamps: true }
);

const IItemCategory = mongoose.model<IItemCategory>("ItemCategory", itemCategorySchema);

export default IItemCategory;
