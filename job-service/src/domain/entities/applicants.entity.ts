import { Types } from "mongoose";

export interface IApplicants {
    _id: Types.ObjectId;
    jobId: Types.ObjectId | null;
    schedule: {
       date: Date | null;
       feedback: String | null;
       status: String | null;
       time: String | null;
       title: String | null;
    }[];
    userId: Types.ObjectId | null;
    createdAt: Date | null;
    hiring_status: String | null;
    resume: String | null;
    hiring_info: {
       date: Date | null;
       interviewer: String | null;
       notes: String | null;
       status: String | null;
    }[];
  }