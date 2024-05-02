
import { IDependencies } from "../../domain/interfaces";

export const companyEmailExistUseCase = (dependencies:IDependencies)=>{
    const {repositories:{companyEmailExist}}=dependencies
    return{
        execute: async(email:string)=>{
            try {
                return await companyEmailExist(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
     }
}