import { Types } from "mongoose";

export interface IRequests extends Document {
    approval: String | null;
    status: String | null;
    _id: Types.ObjectId;
    companyName: String | null;
    email: String | null;
    address: String | null;
    documents: String | null;
  }