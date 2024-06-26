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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
/**
 * logout - Handles user logout process.
 *
 * This controller:
 * 1. Clears the cookies for 'user_token', 'Company_token', and 'admin_token'.
 * 2. Returns a success response indicating the user has logged out successfully.
 * 3. Catches any errors during the process and passes them to the next middleware.
 */
const logout = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie('user_token');
            res.clearCookie('Company_token');
            res.clearCookie('admin_token');
            res.status(200).json({ success: true, message: "User logged out successfully" });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.logout = logout;
