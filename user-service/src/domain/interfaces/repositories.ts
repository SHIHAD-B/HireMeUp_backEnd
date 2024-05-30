import { IOtp } from "../entities";
import { IUsers } from "../entities/user.entity";
import { IAdmin } from "../entities";


export interface IRepositories {
    addUser: (data: IUsers) => Promise<IUsers | null | boolean>
    blockUser: (email: string) => Promise<boolean | null>
    unBlockUser: (email: string) => Promise<boolean | null>
    deleteUser: (email: string) => Promise<boolean | null>
    recoverUser: (email: string) => Promise<boolean | null>
    fetchUser: (email: string) => Promise<IUsers | null>
    listUser: () => Promise<IUsers[] | null>
    updateUser: (data: IUsers) => Promise<IUsers | null>
    resetPassword: (email: string, password: string) => Promise<boolean | null>
    addOtp: (email:string,otp:string) => Promise<IOtp | null>
    fetchAdmin :(email: string)=> Promise<IAdmin | null>
   
}