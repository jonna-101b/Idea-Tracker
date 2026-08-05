import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import { applyUserMethods } from "./userMethods.js";
import type { IUser } from "./userSchema.js";
import { applyUserStatics } from "./userStatics.js";

export interface IUserModel extends mongoose.Model<IUser> {
  signup(data: Pick<IUser, "name" | "email" | "password">): Promise<IUser>;
  login(data: Pick<IUser, "email" | "password">): Promise<IUser>;
}

applyUserMethods(userSchema);
applyUserStatics(userSchema);

export const User = mongoose.model<IUser, IUserModel>("User", userSchema);