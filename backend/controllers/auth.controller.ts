import type { NextFunction, Request, Response } from "express";
import { User, type IUserModel } from "../models/user/userModel.js";
import { createToken } from "../utils/auth.js";

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try{
        const user = await User.signup({ name, email, password });
        const token = createToken({ _id: user._id.toString(), role: "user" });
        return res.status(200).json({name, email, token});
    }
    catch (error) {
        next(error)
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try{
        const user = await User.login({ email, password });
        const token = createToken({ _id: user._id.toString(), role: user.role });
        return res.status(200).json({name: user.name, email, token});
    }
    catch (error) {
        next(error)
    }
};