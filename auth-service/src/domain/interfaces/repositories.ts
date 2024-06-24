import { IUserEntity, IUserExist, IUsersResult,IAdminEntity, IRefreshToken} from "../entities";

import { ICompany } from "../entities/company.entity";
import { ICompanySignin } from "../entities/companySignin.enitity";

export interface IRepositories {
    userSignin: (data: IUserEntity) => Promise<IUserEntity | boolean | null>
    userSignup: (data: IUserEntity) => Promise<IUserEntity | null>
    verifyOtp: (email: string, otp: string) => Promise<boolean | null>
    emailExist: (data: IUserExist) => Promise<IUsersResult | boolean | null>
    companySignup: (data: ICompany) => Promise<ICompany | boolean | null>
    companyEmailExist: (email: string) => Promise<boolean | null>
    companySignin: (data: ICompanySignin) => Promise<ICompany | boolean | null>
    adminSignin :(data: IAdminEntity)=> Promise<IAdminEntity | boolean | null>
    storeRefreshToken:(data: IRefreshToken)=> Promise<IRefreshToken | boolean | null>
}