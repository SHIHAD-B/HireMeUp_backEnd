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
exports.resetPassword = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const resetPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !password) {
            return null;
        }
        const user = yield userSchema_1.default.findOne({ email: email });
        if (!user) {
            return false;
        }
        const reset = yield userSchema_1.default.updateOne({ email: email }, { $set: { password: password } });
        if (reset.modifiedCount == 1) {
            return true;
        }
        return null;
    }
    catch (error) {
        console.error('Error resetting password:', error.message);
        throw new Error('Failed to reset password.');
    }
});
exports.resetPassword = resetPassword;
