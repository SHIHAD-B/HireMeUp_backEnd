import Otp from "../model/otpSchema";
import { IOtp } from "../../../../domain/entities";

export const checkOtp = async (email: string, otp: string): Promise<IOtp | null> => {
    try {
        if (!email || !otp) {
            return null; 
        }

        const userOtp = await Otp.findOne({ email: email });
        if (!userOtp) {
            return null;
        }

        if (userOtp.code === otp) {
            return userOtp; 
        }

        return null;
    } catch (error: any) {
        console.error('Error checking OTP:', error);
        throw new Error('Failed to check OTP.'); 
    } 
}
