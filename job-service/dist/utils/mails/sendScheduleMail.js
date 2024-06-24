"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendScheduleMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config/envConfig/config");
const sendScheduleMail = (email, interviewTime) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config_1.EMAIL,
            pass: config_1.APP_SECRET
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
        yield transporter.sendMail(mailData);
        console.log('Reminder email sent to user');
        return true;
    }
    catch (error) {
        console.error('Error occurred while sending reminder email:', error);
        throw new Error("Error occurred while sending reminder email: " + error);
    }
});
exports.sendScheduleMail = sendScheduleMail;
