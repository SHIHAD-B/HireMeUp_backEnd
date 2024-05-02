import { IUserEntity } from "../entities";
import { ICompany } from "../entities/company.entity";

export interface IRepositories {
    userSignin: (data: IUserEntity) => Promise<IUserEntity | boolean | null>
    userSignup: (data: IUserEntity) => Promise<IUserEntity | null>
    verifyOtp: (email: string, otp: string) => Promise<boolean | null>
    emailExist: (email: string) => Promise<boolean | null>
    companySignup: (data: ICompany) => Promise<ICompany | boolean | null>
    companyEmailExist: (email: string) => Promise<boolean | null>
}