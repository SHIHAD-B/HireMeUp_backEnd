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
exports.sendApprovalNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config/envConfig/config");
const sendApprovalNotification = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config_1.EMAIL,
            pass: config_1.APP_SECRET
        }
    });
    const message = "Dear User,<br><br>Thank you for choosing HireMeUp. We are pleased to inform you that your company signup request has been approved by the admin. You can now proceed to login to your account.<br><br>If you have any questions or need further assistance, feel free to contact us.<br><br>Best regards,<br>The HireMeUp Team";
    const mailData = {
        from: "hiremeup1@gmail.com",
        to: email,
        subject: "Approval for HireMeUp Company Signup",
        html: message
    };
    try {
        yield transporter.sendMail(mailData);
        console.log('Approval notification sent to user');
        return true;
    }
    catch (error) {
        throw new Error("Error occurred while sending approval notification: " + error);
    }
});
exports.sendApprovalNotification = sendApprovalNotification;
