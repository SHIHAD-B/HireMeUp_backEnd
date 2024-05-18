import { Types } from "mongoose";

export interface IJobs {
    _id: Types.ObjectId;
    companyId: Types.ObjectId | null;
    description: String | null;
    salary_from: Number | null;
    responsibilities: String | null;
    required_skills: String | null;
    requirements: String | null;
    category: Types.ObjectId | null;
    salary_to: String | null;
    job_title: String | null;
    type: String | null;
    benifts: {
       description: String | null;
       icon: number | null;
       name: String | null;
    }[];
    qualification: String | null;
    slot: Number | null;
    start_date: Date | null;
    end_date: Date | null;
    level: String | null;
  }