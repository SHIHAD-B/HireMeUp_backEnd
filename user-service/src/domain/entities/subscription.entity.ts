import { Types } from "mongoose";

export interface ISubscription {
    _id?:Types.ObjectId,
    subscriptionId:Types.ObjectId
    planId: Types.ObjectId,
    userId: Types.ObjectId,
    name: string,
    start_date: Date,
    end_date: Date
}