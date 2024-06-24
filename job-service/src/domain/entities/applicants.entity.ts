import { Types } from "mongoose";

export interface IApplicants {
    _id: Types.ObjectId;
    jobId: Types.ObjectId ;
    schedule: {
       date: Date ;
       feedback: string ;
       status: string ;
       time: string ;
       title: string ;
    }[];
    userId: Types.ObjectId ;
    createdAt: Date ;
    hiring_status: string ;
    resume: string ;
    answers: object[],
    hiring_info: {
       name: string ;
       notes: string ;
    }[];
  }