import { Types } from "mongoose";

export interface ICompany {
    _id?: Types.ObjectId;
    email?: string | null;
    password: string ;
    website?: string | null;
    description?: string | null;
    status?: string | null;
    tech_stack?: string[] | null;
    images?: string[] | null;
    titile?: string | null;
    approval?: string | null;
    noOfEmployees?: Number | null;
    contact?: {
       email: string | null;
       facebook: string | null;
       instagram: string | null;
       linkedin: string | null;
       phone: Number | null;
       twitter: string | null;
       youtube: string | null;
    };
    industry?: string | null;
    benefits?: {
    }[];
    icon?: string | null;
    location?: string[] | null;
    founded?: Date | null;
    companyname?: string | null;
    employees?: Types.ObjectId[] | null;
    createdAt?: Date | null;
    otp?:string;
    document?:string
  }
  