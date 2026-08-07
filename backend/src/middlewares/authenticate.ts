import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import type { IUser } from "../models/user/userSchema.js";
import { APIError } from "../errors/APIError.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) : void => {
    passport.authenticate("jwt", { session: false }, (error: Error | null, user: IUser) => {
        if (error) {
            return next(error)
        }

        if (!user) {
            return next(APIError.unauthorized("Unauthorized access. Invalid or missing token.", ""))
        }

        req.user = user;
        next()
    })(req, res, next);
};