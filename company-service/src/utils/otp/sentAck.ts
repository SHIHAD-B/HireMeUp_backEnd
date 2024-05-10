import nodemailer from 'nodemailer'
import { EMAIL, APP_SECRET } from '../../config/envConfig/config'

export const sendApprovalNotification = async (email: string): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: APP_SECRET
        }
    } as nodemailer.TransportOptions);

    const message = "Dear User,<br><br>Thank you for choosing HireMeUp. We are pleased to inform you that your company signup request has been approved by the admin. You can now proceed to login to your account.<br><br>If you have any questions or need further assistance, feel free to contact us.<br><br>Best regards,<br>The HireMeUp Team";

    const mailData = {
        from: "hiremeup1@gmail.com",
        to: email,
        subject: "Approval for HireMeUp Company Signup",
        html: message
    };
    try {
        await transporter.sendMail(mailData)
        console.log('Approval notification sent to user')
        return true
    } catch (error) {
        throw new Error("Error occurred while sending approval notification: " + error)
    }
}
