import { Types } from "mongoose";

export interface ISubscriptions {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId ;
    planId?: Types.ObjectId ;
    end_date?: Date ;
    start_date?: Date ;
    paymentId?:string;
    createdAt?: Date ;
    status?: String ;
  }