
import { IUserExist } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const emailExistUseCase = (dependencies:IDependencies)=>{
    const {repositories:{emailExist}}=dependencies
    return{
        execute: async(data:IUserExist)=>{
            try {
                return await emailExist(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
     }
}