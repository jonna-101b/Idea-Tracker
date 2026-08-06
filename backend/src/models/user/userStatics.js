import { Schema } from "mongoose";
import validator from "validator";
import { hashPassword } from "../../utils/auth.js";
export const applyUserStatics = (schema) => {
    schema.statics.login = async function (email, password) {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email and password are required");
        }
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error("No such user with this email, try signing up!");
        }
        const match = await user.comparePassword(password);
        if (!match) {
            throw new Error("Password doesn't match!");
        }
        return user;
    };
    schema.statics.signup = async function (name, email, password) {
        if (!name.trim() || !email.trim() || !password.trim()) {
            throw new Error("Email and password are required");
        }
        const exists = await this.findOne({ email });
        if (exists) {
            throw new Error("User already signed up, try logging in!");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Enter a valid email!");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Password not strong enough!");
        }
        const hashed = await hashPassword(password, 10);
        const user = this.create({ name, email, password: hashed });
        return user;
    };
};
//# sourceMappingURL=userStatics.js.map