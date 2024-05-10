import nodemailer from 'nodemailer'
import { EMAIL, APP_SECRET } from '../../config/envConfig/config'

export const sendRejectionNotification = async (email: string): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: APP_SECRET
        }
    } as nodemailer.TransportOptions);

    const message = `Dear User,<br><br>We regret to inform you that your company signup request for HireMeUp has been rejected by the admin.<br><br>If you have any further questions or need assistance, please feel free to reach out to us.<br><br>Best regards,<br>The HireMeUp Team`;

    const mailData = {
        from: "hiremeup1@gmail.com",
        to: email,
        subject: "Rejection for HireMeUp Company Signup",
        html: message
    };
    try {
        await transporter.sendMail(mailData)
        console.log('Rejection notification sent to user')
        return true
    } catch (error) {
        throw new Error("Error occurred while sending rejection notification: " + error)
    }
}
