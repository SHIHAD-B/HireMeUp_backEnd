
import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  description: String;
  deleted: boolean
  category: String;
  createdAt: Date;
  editedAt: Date;
}