import { Types } from "mongoose";

export interface IAdmin {
    _id?: Types.ObjectId;
    name: string | null;
    password: String | null;
    email: String | null;
    access: String | null;
    role: String | null;
    blocked: Boolean | null;
    createdAt: Date | null;
}