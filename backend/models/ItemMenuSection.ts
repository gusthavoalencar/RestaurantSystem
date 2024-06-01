import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IIitemMenuSection extends mongoose.Document {
  name: string;
  active: boolean;
  createdBy: string;
}

const itemMenuSectionSchema = new Schema(
  {
    name: { type: String, required: [true, "Item menu section name cannot be empty"] },
    active: { type: Boolean, required: [true, "Active cannot be null "] }
  },
  { timestamps: true }
);

const IIitemMenuSection = mongoose.model<IIitemMenuSection>("ItemMenuSection", itemMenuSectionSchema);

export default IIitemMenuSection;
