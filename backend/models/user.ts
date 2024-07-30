import mongoose, { PassportLocalDocument } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

export interface IUser extends PassportLocalDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
  status: string;
  role: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name cannot be empty"] },
    surname: { type: String, required: [true, "Surname cannot be empty"] },
    email: { type: String, required: [true, "Email cannot be empty"], unique: true },
    password: { type: String },
    status: {
      type: String,
      required: [true, "Status cannot be empty"],
      enum: ["active", "inactive", "pending"],
      default: "pending"
    },
    role: {
      type: String,
      required: [true, "Role cannot be empty"],
      enum: ["waiter", "manager", "administrator"],
      default: "waiter"
    }
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
