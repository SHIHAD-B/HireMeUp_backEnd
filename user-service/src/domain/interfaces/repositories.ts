import { IOtp } from "../entities";
import { IUsers } from "../entities/user.entity";

export interface IRepositories {
    addUser: (data: IUsers) => Promise<IUsers | null>
    blockUser: (id: string) => Promise<boolean | null>
    deleteUser: (id: string) => Promise<boolean | null>
    fetchUser: (id: string) => Promise<IUsers | null>
    listUser: () => Promise<IUsers[] | null>
    updateUser: (data: IUsers) => Promise<IUsers | null>
    resetPassword: (email: string, password: string) => Promise<boolean | null>
    addOtp: (email:string,otp:string) => Promise<IOtp | null>
}