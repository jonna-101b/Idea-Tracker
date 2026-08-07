import jwt from "jsonwebtoken";
import { config } from "../config/environments.js";
import bcrypt from "bcryptjs";

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