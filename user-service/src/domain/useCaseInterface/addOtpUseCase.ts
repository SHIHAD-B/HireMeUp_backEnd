import { IOtp } from "../entities"

export interface IAddOtpUseCase {
    execute(email:string,otp:string): Promise<IOtp | null>
}