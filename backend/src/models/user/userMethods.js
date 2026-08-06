import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
export const applyUserMethods = (schema) => {
    schema.methods.comparePassword = async function (password) {
        const match = await bcrypt.compare(password, this.password);
        return match;
    };
};
//# sourceMappingURL=userMethods.js.map