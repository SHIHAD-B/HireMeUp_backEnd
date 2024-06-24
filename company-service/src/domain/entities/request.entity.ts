import { Types } from "mongoose";

export interface IRequests extends Document {
    approval: String | null;
    status: String | null;
    _id: Types.ObjectId;
    password?:string;
    companyname?: String | null;
    email: String | null;
    address: String | null;
    documents: String | null;
  }