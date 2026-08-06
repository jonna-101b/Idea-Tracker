import { Schema } from "mongoose";
import validator from "validator";
import type { IUser } from "./userSchema.js";
import type { IUserModel } from "./userModel.js";
import { hashPassword } from "../../utils/auth.js";
import { APIError } from "../../errors/APIError.js";

export const applyUserStatics = (schema: Schema<IUser, IUserModel>) : void => {
    schema.statics.login = async function (this: any, email: string, password: string): Promise<any> {
        if (!email.trim() || !password.trim()) {
            throw APIError.badRequest("Email and password are required");
        }

        const user = await this.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            throw APIError.unauthorized("Invalid email or password");
        }
        const match = await user.comparePassword(password);

        if (!match) {
            throw APIError.unauthorized("Invalid email or password");
        }

        return user;
    }

    schema.statics.signup = async function (this: any, name: string, email: string, password: string): Promise<any> {
        if (!name.trim() || !email.trim() || !password.trim()) {
            throw APIError.badRequest("Name, email, and password are required");
        }

        const normalizedEmail = email.toLowerCase().trim();
        const exists = await this.findOne({ email: normalizedEmail });

        if (exists) {
            throw APIError.badRequest("A user with this email already exists");
        }

        if (!validator.isEmail(email)) {
            throw APIError.badRequest("Enter a valid email!");
        }

        if (!validator.isStrongPassword(password)) {
            throw APIError.badRequest("Password is not strong enough");
        }

        const hashed = await hashPassword(password, 10);

        const user = this.create({ name: name.trim(), email: normalizedEmail, password: hashed });

        return user
    }
};
