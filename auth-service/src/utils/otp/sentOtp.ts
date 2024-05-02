import nodemailer from 'nodemailer'
import { EMAIL, APP_SECRET } from '../../config/envConfig/config'

export const sendOtp = async (email: string, otp: string): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: APP_SECRET
        }
    } as nodemailer.TransportOptions);

    const message = "Dear User,<br><br>Thank you for choosing HireMeUp. To continue with your account setup, please enter the following one-time password (OTP):<br><br>Your OTP: <b>" + otp + "</b><br><br>Please use this OTP within 1 minute(s) to complete your verification process.<br><br>If you didn't request this OTP, please ignore this message.<br><br>Best regards,<br>The HireMeUp Team";

    const mailData = {
        from: "hiremeup1@gmail.com",
        to: email,
        subject: "OTP for HireMeUp Account Verification",
        html: message
    };
    try {
        await transporter.sendMail(mailData)
        console.log('otp sent to user')
        return true
    } catch (error) {
        throw new Error("Error occured while sending opt " + error)
    }





}