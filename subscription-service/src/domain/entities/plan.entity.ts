import { Types } from "mongoose";

export interface IPlans  {
    _id?: Types.ObjectId;
    duration?:number ;
    description: string ;
    price: number ;
    name: string ;
    editedAt?: Date ;
    discount: number ;
    createdAt?: Date ;
  }