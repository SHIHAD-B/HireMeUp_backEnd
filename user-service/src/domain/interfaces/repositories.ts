import { IOtp } from "../entities";
import { IUsers } from "../entities/user.entity";
import { IAdmin } from "../entities";
import { IExperience } from "../entities/experience.entity";
import { IEducation } from "../entities/education.entities";
import { ISocialLink } from "../entities/socialLink.entity";
import { IAddress } from "../entities/address.entity";


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
    addOtp: (email: string, otp: string) => Promise<IOtp | null>
    fetchAdmin: (email: string) => Promise<IAdmin | null>
    updateProfile: (id: string, data: string, field: string) => Promise<IUsers | null>
    addExperience: (id: string, data: IExperience) => Promise<IUsers | null>
    deleteExperience: (userId: string, id: string) => Promise<IUsers | null>
    editExperience: (id: string, data: IExperience) => Promise<IUsers | null>
    editEducation: (id: string, data: IEducation) => Promise<IUsers | null>
    deleteEducation: (userId: string, id: string) => Promise<IUsers | null>
    addEducation: (id: string, data: IEducation) => Promise<IUsers | null>
    deleteSkill: (userId: string, skill: string) => Promise<IUsers | null>
    addSkill: (id: string, skill: string) => Promise<IUsers | null>
    deleteLanguage: (id: string, lang: string) => Promise<IUsers | null>
    addLanguage: (id: string, lang: string) => Promise<IUsers | null>
    editSocialLink: (id: string, data: ISocialLink) => Promise<IUsers | null>
    addResume: (id: string, resume: string) => Promise<IUsers | null>
    addAddress: (id: string, data: IAddress) => Promise<IUsers | null>
    editAdmin: (data: IAdmin) => Promise<IAdmin | null>
    listAdmin: () => Promise<IAdmin[] | null>
    addAdmin: (data: IAdmin) => Promise<IAdmin | null | boolean>
    blockUnblockAdmin :(email: string)=> Promise<boolean | null> 

}