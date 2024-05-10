import { Types } from "mongoose";

export interface IUsersResult  {
    _id?: Types.ObjectId;
    phone?: Number | null;
    name?: String | null;
    gender?: String | null;
    password?: String | null;
    email?: String | null;
    dob?: Date | null;
    profile?: String | null;
    skills?: String[] | null;
    education?: {
       description?: String | null;
       from?: String | null;
       grade?: String | null;
       to?: String | null;
    };
    cv?: String | null;
    about?: String | null;
    experiences?: {
       description?: String | null;
       designation?: String | null;
       from?: Date | null;
       location?: String | null;
       to?: Date | null;
    };
    contacts?: {
       email?: String | null;
       instagram?: String | null;
       linkedin?: String | null;
       phone?: String | null;
       portfolio?: String | null;
       twitter?: String | null;
    };
    onlineStatus?: String | null;
    blocked?: Boolean | null;
    deleted?: Boolean | null;
    subscription?: {
       subscriptionId?: Types.ObjectId | null;
    }[];
  }