import type { IUserModel } from "../models/user/userModel.ts";
import { IUser } from "../models/user/userSchema";

declare global {
  namespace Express {
    interface User extends IUser, IUserModel {}
  }
}

export {};