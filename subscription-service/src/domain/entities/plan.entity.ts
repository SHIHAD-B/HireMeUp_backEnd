import { Types } from "mongoose";

export interface IPlans  {
    _id: Types.ObjectId;
    duration: Number | null;
    description: String | null;
    price: Number | null;
    name: String | null;
    editedAt: Date | null;
    discount: Number | null;
    createdAt: Date | null;
  }