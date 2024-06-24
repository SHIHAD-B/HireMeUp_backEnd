import { Types } from "mongoose";


export interface IContact {
    userId:Types.ObjectId;
    instagram: string;
    linkedIn: string;
    twitter: string;
}