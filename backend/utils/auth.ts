import jwt from "jsonwebtoken";
import { config } from "../config/environments.js";
import bcrypt from "bcryptjs";

export interface Payload {
    _id : string,
    role: "user" | "admin",
}

export const createToken = async (payload: Payload) : Promise<string> => {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
    return token;
}; 

export const hashPassword = async (password: string, salt: number) : Promise<string> => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};