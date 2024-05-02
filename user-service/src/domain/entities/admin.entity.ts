import { Types } from "mongoose";

export interface IAdmin{
    _id: Types.ObjectId;
    Password: String | null;
    Email: String | null;
    Access: String | null;
    Role: String | null;
    Blocked: Boolean | null;
    CreatedAt: Date | null;
}