import { Types } from "mongoose";

export interface IJobs {
    _id: Types.ObjectId;
    companyId: Types.ObjectId ;
    description: string ;
    salary_from: number ;
    responsibilities: string ;
    questions: string[] ;
    required_skills: string[] ;
    requirements: string ;
    category: Types.ObjectId ;
    salary_to: string ;
    job_title: string ;
    type: string ;
    benifts: {
       description: string ;
       icon: number ;
       name: string ;
    }[];
    qualification: string ;
    slot: number ;
    start_date: Date ;
    end_date: Date ;
    level: string ;
  }