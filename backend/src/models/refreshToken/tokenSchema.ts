import mongoose from "mongoose";


export interface IRefreshToken extends mongoose.Document {
    token: String,
    user: mongoose.Types.ObjectId,
    expiresAt: Date,
}

export const refreshTokenSchema = new mongoose.Schema<IRefreshToken>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });