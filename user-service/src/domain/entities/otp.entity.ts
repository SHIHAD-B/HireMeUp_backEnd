import { Types } from "mongoose";

export interface IOtp {
    _id: Types.ObjectId;
    email: String | null;
    createdAt: Date | null;
    code: string | null;
}