import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import { applyUserMethods } from "./userMethods.js";
import { applyUserStatics } from "./userStatics.js";
applyUserMethods(userSchema);
applyUserStatics(userSchema);
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=userModel.js.map