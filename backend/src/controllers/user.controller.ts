import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user/userModel.js";
import { APIError } from "../errors/APIError.js";

export const getUsers = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error)
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return next(APIError.notFound('User not found'));
        }

        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error)
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role },
        { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
        return next(APIError.notFound('User not found'));
        }

        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error)
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(APIError.notFound('User not found'));
        }

        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error)
    }
};