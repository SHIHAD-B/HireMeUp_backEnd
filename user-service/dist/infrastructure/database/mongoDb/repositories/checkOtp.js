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
exports.checkOtp = void 0;
const otpSchema_1 = __importDefault(require("../model/otpSchema"));
const checkOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !otp) {
            return null;
        }
        const userOtp = yield otpSchema_1.default.findOne({ email: email });
        if (!userOtp) {
            return null;
        }
        if (userOtp.code === otp) {
            return userOtp;
        }
        return null;
    }
    catch (error) {
        console.error('Error checking OTP:', error);
        throw new Error('Failed to check OTP.');
    }
});
exports.checkOtp = checkOtp;
