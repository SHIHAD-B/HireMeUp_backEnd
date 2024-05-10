import { Types } from "mongoose";

export interface ICompanySignin {
    _id?: Types.ObjectId;
    email: string ;
    password: string ;
   
  }
  