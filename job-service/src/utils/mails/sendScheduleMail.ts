import nodemailer from 'nodemailer';
import { EMAIL, APP_SECRET } from '../../config/envConfig/config';

export const sendScheduleMail = async (email:string, interviewTime:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: APP_SECRET
        }
    });

    const message = `
        Dear User,<br><br>
        This is a reminder for your upcoming interview scheduled at:<br><br>
        <b>${new Date(interviewTime).toLocaleString()}</b><br><br>
        Please ensure you are prepared and join the interview on time.<br><br>
        If you have any questions or need to reschedule, please contact respective company as soon as possible.<br><br>
        Best regards,<br>
        The HireMeUp Team
    `;

    const mailData = {
        from: "hiremeup1@gmail.com",
        to: email,
        subject: "Reminder: Your Upcoming Interview",
        html: message
    };

    try {
        await transporter.sendMail(mailData);
        console.log('Reminder email sent to user');
        return true;
    } catch (error) {
        console.error('Error occurred while sending reminder email:', error);
        throw new Error("Error occurred while sending reminder email: " + error);
    }
};
