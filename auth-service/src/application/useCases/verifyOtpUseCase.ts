import { IDependencies } from "../../domain/interfaces";

export const verifyOtpUseCase=(dependencies:IDependencies)=>{
 const {repositories:{verifyOtp}}=dependencies

 return{
    execute: async(email:string,otp:string)=>{
        try {
            return await verifyOtp(email,otp)
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
 }
}