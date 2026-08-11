import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user/userModel.js";
import { generateAccessToken, generateRefreshToken, verifyToken, type Payload } from "../utils/auth.js";
import { APIError } from "../errors/APIError.js";
import RefreshTokenmodel from "../models/refreshToken/tokenModel.js";
import type { IUser } from "../models/user/userSchema.js";


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'strict' as const,
};

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try{
        const user = await User.signup( name, email, password );
        const accessToken = generateAccessToken({ _id: user._id.toString(), role: "user" });
        const refreshToken = generateRefreshToken({ _id: user._id.toString(), role: "user" });

        // The refresh/profile handlers validate cookies against this collection.
        // Saving the token here makes a newly-issued refresh cookie usable after
        // a browser reload.
        await RefreshTokenmodel.create({
            token: refreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 minutes
        res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log("Login request received with email:", email); // Debugging line

    try{
        const user = await User.login( email, password );
        const accessToken = generateAccessToken({ _id: user._id.toString(), role: "user" });
        const refreshToken = generateRefreshToken({ _id: user._id.toString(), role: "user" });

        await RefreshTokenmodel.create({
            token: refreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 minutes
        res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["refreshToken"];

        if (!token) {
            return next(APIError.unauthorized('Refresh token missing'));
        }

        const refreshToken = await RefreshTokenmodel.findOne({ token }).populate("user");

        if ( !refreshToken || refreshToken.expiresAt < new Date() ) {
            return next(APIError.unauthorized('Invalid or expired refresh token'));
        }

        const user = refreshToken.user as unknown as IUser;

        const newAccessToken = generateAccessToken({
            _id: user._id.toString(),
            role: user.role,
        });

        res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });  // 15 minutes
        return res.status(200).json({ success: true, message: 'Access token refreshed successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies["refreshToken"];

        if (refreshToken) {
            await RefreshTokenmodel.deleteOne({ token: refreshToken });
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshTokenCookie = req.cookies["refreshToken"];
        const accessTokenCookie = req.cookies["accessToken"];

        const refreshToken = await RefreshTokenmodel.findOne({ token: refreshTokenCookie });
        if ( !refreshToken || refreshToken.expiresAt < new Date() ) {
            return next(APIError.unauthorized('Invalid or expired refresh token'));
        }

        const { _id } = verifyToken(accessTokenCookie) as Payload;
        const user = await User.findOne({ _id }) as IUser;

        res.status(200).json(user);
    }
    catch (error: any) {
        next(error);
    }
};
