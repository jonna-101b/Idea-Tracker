import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import type { IUser } from "./userSchema.js";
import type { IUserModel } from "./userModel.js";

export const applyUserMethods = (schema: Schema<IUser, IUserModel>): void => {
  schema.methods.comparePassword = async function (this: any, password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return match;
  };
};