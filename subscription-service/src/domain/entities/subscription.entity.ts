import { Types } from "mongoose";

export interface ISubscriptions {
    _id: Types.ObjectId;
    UserId: Types.ObjectId | null;
    PlanId: Types.ObjectId | null;
    End_date: Date | null;
    Start_date: Date | null;
    CreatedAt: Date | null;
    Status: String | null;
  }