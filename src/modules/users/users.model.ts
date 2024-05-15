import mongoose, { Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../shared/helpers/AppError";
import config from "../../shared/config/config";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  correctPassword(candidatePassword: string): Promise<boolean>;
  generateToken(): Promise<string>;
}

interface UserModel extends Model<IUser> {
  login: (email: string, password: string) => Promise<any>;
  verifyToken: (token: string) => Promise<JwtPayload>;
}

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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password!, 12);
  next();
});

userSchema.statics.login = async (email, password) => {
  // check if user is exist.
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw AppError.NotFoundException("User doest not exist");

  // validate password.
  const checkPassword = await user.correctPassword(password);
  if (!checkPassword)
    throw AppError.InvalidDataException("Wrong Password, try again...");

  //delete password
  delete user.password;
  return user;
};

userSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
};

userSchema.statics.verifyToken = async function (token): Promise<JwtPayload> {
  if (!token) throw new AppError("Error: Token is required", 400);
  const decodedToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
  if (!decodedToken.id) throw AppError.NotFoundException("id doest not exist");

  const user = await UserModel.findById(decodedToken.id).select("_id role");
  if (!user) throw AppError.NotFoundException("user doest not exist");

  return { user, decodedToken };
};

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const UserModel = mongoose.model<IUser, UserModel>("User", userSchema);

export default UserModel;
