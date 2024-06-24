import { Types } from "mongoose";

export interface IUsers {
   _id?: string;
   phone: number;
   username: string;
   gender: string;
   password: string;
   email: string;
   dob: Date;
   profile: string;
   skills: string[];
   education?: {
      university: string;
      course: string;
      description: string;
      from: string;
      grade: string;
      to: string;
   };
   cv?: string;
   about?: string;
   experiences?: [{
      description: string;
      designation: string;
      company: string;
      from: Date;
      location: string;
      to: Date;
   }];
   contacts?: {
      email: string;
      instagram: string;
      linkedin: string;
      phone: string;
      portfolio: string;
      twitter: string;
   };
   onlineStatus: string;
   blocked: Boolean;
   deleted: Boolean;
   subscription: {
      _id?: Types.ObjectId,
      subscriptionId: Types.ObjectId
      planId: Types.ObjectId,
      userId: Types.ObjectId,
      name: string,
      start_date: Date,
      end_date: Date
   },
   expiredSubscriptions: [{
      _id?: Types.ObjectId,
      subscriptionId: Types.ObjectId
      planId: Types.ObjectId,
      userId: Types.ObjectId,
      name: string,
      start_date: Date,
      end_date: Date
   }]
}