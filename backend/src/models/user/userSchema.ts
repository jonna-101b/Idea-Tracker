import mongoose from "mongoose";
import type { IUserModel } from "./userModel.js";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export const userSchema = new mongoose.Schema<IUser, IUserModel>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);