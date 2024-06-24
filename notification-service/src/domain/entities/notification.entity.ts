import { Types } from "mongoose";


export interface INotification extends Document {
    _id?: Types.ObjectId;
    recipient: Types.ObjectId | null;
    message: String | null;
    sender: Types.ObjectId | null;
    type: String | null;
    read: Boolean | null;
    createdAt: Date | null;
  }
  