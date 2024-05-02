import { randomBytes } from "crypto";

export const generateOtp = async (): Promise<string | null> => {
    try {
        let otp;
        do {
            otp = randomBytes(2).readUInt16BE(); 
        } while (otp < 1000 || otp > 9999);
        return String(otp);
    } catch (error) {
        console.error("Error generating OTP:", error);
        return null; 
    }
};
