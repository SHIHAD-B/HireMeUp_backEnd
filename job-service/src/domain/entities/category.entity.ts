
import { Types } from "mongoose";

export interface ICategory  {
    _id: Types.ObjectId;
    description: String | null;
    category: String | null;
    createdAt: Date | null;
    editedAt: Date | null;
  }