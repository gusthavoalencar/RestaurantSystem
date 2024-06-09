import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  status: string;
  password: string;
  role: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name cannot be empty"] },
    surname: { type: String, required: [true, "Surname cannot be empty"] },
    email: { type: String, required: [true, "Email cannot be empty"], unique: true },
    status: { type: String, required: [true, "Status cannot be empty"] },
    role: { type: String, required: [true, "Role cannot be empty"] }
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
