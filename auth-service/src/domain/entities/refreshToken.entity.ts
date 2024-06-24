import mongoose from "mongoose";

export interface IRefreshToken extends Document {
    token: string;
    coreId: mongoose.Types.ObjectId;
    expiryDate: Date;
}