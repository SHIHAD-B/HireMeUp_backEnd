import { Types } from "mongoose";

export interface IEmployee {
    _id?: string;
    companyId: Types.ObjectId
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    deleted: boolean;
    isActive: boolean;
    profile: string;

}