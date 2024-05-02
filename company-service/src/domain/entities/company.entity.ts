import { Types } from "mongoose";

export interface ICompany {
    _id: Types.ObjectId;
    email: String | null;
    password: String | null;
    website?: String | null;
    description?: String | null;
    status?: String | null;
    tech_stack?: String[] | null;
    images?: String[] | null;
    titile?: String | null;
    approval?: String | null;
    noOfEmployees?: Number | null;
    contact?: {
       email: String | null;
       facebook: String | null;
       instagram: String | null;
       linkedin: String | null;
       phone: Number | null;
       twitter: String | null;
       youtube: String | null;
    };
    industry?: String | null;
    benefits?: {
    }[];
    icon?: String | null;
    location?: String[] | null;
    founded?: Date | null;
    company_name?: String | null;
    employees?: Types.ObjectId[] | null;
    createdAt?: Date | null;
  }
  