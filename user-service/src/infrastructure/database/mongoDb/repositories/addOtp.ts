import { IOtp } from "../../../../domain/entities";
import Otp from "../model/otpSchema";

export const addOtp = async (email: string, otp: string): Promise<IOtp | null> => {
    try {
        if (!email || !otp) {
            return null
        }
        const existingOtp = await Otp.findOne({ email: email })
        if (existingOtp) {
            await Otp.deleteMany({ email: email })
        }
        const data = {
            email: email,
            code: otp
        };
        const userOtp = await Otp.create(data);
        return userOtp;
    } catch (error: any) {
        console.error('Error adding otp:', error);
        throw new Error('Failed to add otp..');
    }
};
