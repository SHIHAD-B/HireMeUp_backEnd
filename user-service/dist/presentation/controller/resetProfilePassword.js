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
exports.resetProfilePasswordController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const hashpassword_1 = require("../../utils/hash/hashpassword");
const bcrypt_1 = require("bcrypt");
const profilePassworValidation_1 = require("../../utils/validation/profilePassworValidation");
/**
 * resetProfilePasswordController - Controller function to reset user's profile password.
 *
 * This controller:
 * 1. Retrieves email, current password, and new password from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Fetches the user using `fetchUserUseCase` based on the provided email.
 *    - Returns a not found error if user is not found.
 * 3. Compares the provided current password with the hashed password stored in the database.
 *    - Returns a bad request error if current password is incorrect.
 * 4. Validates the new password using `profilePasswordValidation` utility.
 *    - Returns a bad request error if validation fails.
 * 5. Hashes the new password using `hashPassword` utility.
 *    - Returns an internal server error if hashing fails.
 * 6. Calls the `resetPasswordUseCase` to execute resetting the user's password.
 *    - Returns an internal server error if resetting fails.
 *    - Returns a success response if password is reset successfully.
 * 7. Handles and logs any caught errors during the execution.
 */
const resetProfilePasswordController = (dependencies) => {
    const { useCases: { fetchUserUseCase, resetPasswordUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, newPassword, email } = req.body;
            if (!email) {
                return next(errorResponse_1.default.badRequest("User email is missing."));
            }
            const user = yield fetchUserUseCase(dependencies).execute(email);
            if (!user) {
                return next(errorResponse_1.default.notFound("User not found or unable to fetch user."));
            }
            if (!password || !newPassword) {
                return next(errorResponse_1.default.badRequest("Current or new password is missing."));
            }
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                return next(errorResponse_1.default.badRequest("Incorrect current password."));
            }
            const { error } = profilePassworValidation_1.profilePasswordValidation.validate({ password: password, newPassword: newPassword });
            if (error) {
                return next(errorResponse_1.default.badRequest(error.message));
            }
            const hashedPassword = yield (0, hashpassword_1.hashPassword)(newPassword);
            if (!hashedPassword) {
                return next(errorResponse_1.default.internalError("Error in hashing the password."));
            }
            const resetPassword = yield resetPasswordUseCase(dependencies).execute(email, String(hashedPassword));
            if (!resetPassword) {
                return next(errorResponse_1.default.internalError("Error occurred in resetting the user's password."));
            }
            return res.status(200).send({
                success: true,
                message: "User password reset successfully."
            });
        }
        catch (error) {
            console.error("Error resetting user password:", error);
            return next(errorResponse_1.default.internalError("Failed to reset user password."));
        }
    });
};
exports.resetProfilePasswordController = resetProfilePasswordController;
