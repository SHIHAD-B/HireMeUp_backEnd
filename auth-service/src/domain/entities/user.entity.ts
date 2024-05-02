import { Types } from "mongoose";

enum Role {
    user = 'user'
}



export interface IUserEntity {
    _id: Types.ObjectId,
    username?: string,
    email: string,
    password: string,
    role?: Role,
    otp?: string
}