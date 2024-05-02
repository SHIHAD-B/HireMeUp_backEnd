
import { IDependencies } from "../../domain/interfaces";

export const emailExistUseCase = (dependencies:IDependencies)=>{
    const {repositories:{emailExist}}=dependencies
    return{
        execute: async(email:string)=>{
            try {
                return await emailExist(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
     }
}