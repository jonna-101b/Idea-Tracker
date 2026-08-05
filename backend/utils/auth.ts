import jwt from "jsonwebtoken";
import { config } from "../config/environments.js";

export interface Payload {
    _id : string,
    role: "user" | "admin",
}

export const createToken = async (payload: Payload) : Promise<string> => {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
    return token;
}; 