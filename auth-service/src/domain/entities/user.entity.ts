import { Types } from "mongoose";

enum Role {
    user = 'user'
}



export interface IUserEntity {
    _Id: IUserEntity | null;
    _id: Types.ObjectId,
    username?: string,
    phone?: Number,
    email: string,
    password: string,
    role?: Role,
    otp?: string,
    blocked?:Boolean,
    deleted?:Boolean
}