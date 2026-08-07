import mongoose from "mongoose";
import { type IRefreshToken, refreshTokenSchema } from "./tokenSchema.js";

const RefreshTokenmodel = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);
export default RefreshTokenmodel;