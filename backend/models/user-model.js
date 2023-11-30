import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 10],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("User", UserSchema);
const createNewUser = async ({ name, password, email, avatarUrl }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const NewUserInfo = {
    name,
    password: hashedPassword,
    email,
    avatarUrl,
    isAdmin: name === "admin",
  };

  const user = await UserModel.create(NewUserInfo);
  return user;
};

const getOneUser = async ({ id }) => {
  const user = await UserModel.findById(id);
  return user;
};

export const getUserByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  return null;
};

export const updateUser = async (id, datos) => {
  const user = await UserModel.findByIdAndUpdate(id, datos, { new: true });
  return user;
};
export const deleteUser = async (id) => {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
};
export const userModel = {
  createNewUser,
  getOneUser,
  getUserByEmail,
  loginUser,
  updateUser,
  deleteUser,
};

export default User;
