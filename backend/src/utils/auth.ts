import jwt from "jsonwebtoken";
import { config } from "../config/environments.js";
import bcrypt from "bcryptjs";
import { APIError } from "../errors/APIError.js";

export interface Payload {
    _id : string,
    role: "user" | "admin",
}

export const generateAccessToken = (payload: Payload) : string => {
    const token = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: "15m" });
    return token;
}; 

export const generateRefreshToken = (payload: Payload) : string => {
    const token = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "30d" });
    return token;
}; 

export const hashPassword = async (password: string, salt: number) : Promise<string> => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};

export const verifyToken = (token: string) : Payload => {
    try {
        const verify = jwt.verify(token, config.jwtAccessSecret) as Payload;
        return verify;
    }
    catch (error: any) {
        throw APIError.unauthorized("Invalid or expired access token");
    }
};