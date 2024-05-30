import { Types } from "mongoose";

export interface IUsers  {
    _id: Types.ObjectId;
    phone: number ;
    username: string ;
    gender: string ;
    password: string ;
    email: string ;
    dob: Date ;
    profile: string ;
    skills: string[] ;
    education: {
       description: string ;
       from: string ;
       grade: string ;
       to: string ;
    };
    cv: string ;
    about: string ;
    experiences: {
       description: string ;
       designation: string ;
       from: Date ;
       location: string ;
       to: Date ;
    };
    contacts: {
       email: string ;
       instagram: string ;
       linkedin: string ;
       phone: string ;
       portfolio: string ;
       twitter: string ;
    };
    onlineStatus: string ;
    blocked: Boolean ;
    deleted: Boolean ;
    subscription: {
       subscriptionId: Types.ObjectId ;
    }[];
  }