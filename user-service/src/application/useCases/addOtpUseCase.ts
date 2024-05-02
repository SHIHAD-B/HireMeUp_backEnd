
import { IDependencies } from "../../domain/interfaces";

export const addOtpUseCase = (dependencies: IDependencies) => {
    const { repositories: { addOtp } } = dependencies
    return {
        execute: async (email:string,otp:string) => {
            try {
                return await addOtp(email,otp)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}