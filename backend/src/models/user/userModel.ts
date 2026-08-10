import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import { applyUserMethods } from "./userMethods.js";
import type { IUser } from "./userSchema.js";
import { applyUserStatics } from "./userStatics.js";

export interface IUserModel extends mongoose.Model<IUser> {
    _id?: mongoose.Types.ObjectId;
    signup(name: string, email: string, password: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}

applyUserMethods(userSchema);
applyUserStatics(userSchema);

export const User = mongoose.model<IUser, IUserModel>("User", userSchema);