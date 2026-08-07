import { IUser } from "../models/user/userSchema.ts";

declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request extends Express.Request {
      user?: IUser;
    }
  }
}

export {};