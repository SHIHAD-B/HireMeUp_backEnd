import { Types } from "mongoose";

export interface IRating {
    _id: Types.ObjectId;
    rating: Number | null;
    experience: String | null;
    companyId: Types.ObjectId | null;
    userId: Types.ObjectId | null;
}