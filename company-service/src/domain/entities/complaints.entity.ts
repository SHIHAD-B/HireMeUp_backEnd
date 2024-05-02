import { Types } from "mongoose";

export interface IComplaints{
    _id: Types.ObjectId;
    userId: Types.ObjectId | null;
    comapanyId: Types.ObjectId | null;
    complaint: String | null;
    createdAt: Date | null;
    documents?: String | null;
  }