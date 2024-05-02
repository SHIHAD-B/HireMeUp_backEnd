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
exports.addOtp = void 0;
const otpSchema_1 = __importDefault(require("../model/otpSchema"));
const addOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !otp) {
            return null;
        }
        const existingOtp = yield otpSchema_1.default.findOne({ email: email });
        if (existingOtp) {
            yield otpSchema_1.default.deleteMany({ email: email });
        }
        const data = {
            email: email,
            code: otp
        };
        const userOtp = yield otpSchema_1.default.create(data);
        return userOtp;
    }
    catch (error) {
        console.error('Error adding otp:', error);
        throw new Error('Failed to add otp..');
    }
});
exports.addOtp = addOtp;
