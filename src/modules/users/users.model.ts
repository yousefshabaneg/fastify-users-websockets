import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<IUser> {}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "the name is required"],
    },
    email: {
      type: String,
      required: [true, "the email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "the password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser, UserModel>("User", userSchema);

export default UserModel;
