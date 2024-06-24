
import { Types } from "mongoose";

export interface ISchedule  {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId ;
    jobId?:Types.ObjectId ;
    companyId?: Types.ObjectId ;
    date?: string ;
    title?: string ;
    interviewer?:string;
    status?: string ;
    createdAt?: Date ;
    editedAt?: Date ;
  }

