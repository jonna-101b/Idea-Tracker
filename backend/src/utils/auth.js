import jwt from "jsonwebtoken";
import { config } from "../config/environments.js";
import bcrypt from "bcryptjs";
export const createToken = (payload) => {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
    return token;
};
export const hashPassword = async (password, salt) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};
//# sourceMappingURL=auth.js.map