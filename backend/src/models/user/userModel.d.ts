import mongoose from "mongoose";
import type { IUser } from "./userSchema.js";
export interface IUserModel extends mongoose.Model<IUser> {
    _id: mongoose.Types.ObjectId;
    signup(name: string, email: string, password: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}
export declare const User: IUserModel;
//# sourceMappingURL=userModel.d.ts.map