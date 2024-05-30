import { Types } from "mongoose";

export interface ICompany {
    _id: Types.ObjectId;
    email: string ;
    password: string ;
    website?: string ;
    description?: string ;
    status?: string ;
    tech_stack?: string[] ;
    images?: string[] ;
    titile?: string ;
    approval?: string ;
    noOfEmployees?: Number ;
    contact?: {
       email: string ;
       facebook: string ;
       instagram: string ;
       linkedin: string ;
       phone: Number ;
       twitter: string ;
       youtube: string ;
    };
    industry?: string ;
    benefits?: {
    }[];
    icon?: string ;
    location?: string[] ;
    founded?: Date ;
    company_name?: string ;
    employees?: Types.ObjectId[] ;
    createdAt?: Date ;
  }
  