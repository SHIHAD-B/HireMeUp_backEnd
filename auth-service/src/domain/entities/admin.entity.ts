import { Types } from "mongoose";

enum Role {
    superAdmin = 'superAdmin',
    subAdmin = 'subAdmin'
}

export interface IAdminEntity {
    _id: Types.ObjectId,
    email: string,
    password: string
    role?: Role
}