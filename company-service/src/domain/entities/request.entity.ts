import { Types } from "mongoose";

export interface IRequests extends Document {
    approval: string | null;
    status: string | null;
    _id: Types.ObjectId;
    password?:string;
    viewdocument: {
      registration: boolean,
      license: boolean,
      tin: boolean,
      financialStatements: boolean,
      references: boolean
  }
    companyname?: string | null;
    email: string | null;
    address: string | null;
    registration: string | null,
    license: string | null,
    tin: string | null,
    financialStatements: string | null,
    references: string | null
  }