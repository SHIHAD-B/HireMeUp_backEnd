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
exports.resetPasswordController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const hashpassword_1 = require("../../utils/hash/hashpassword");
const passwordValidation_1 = require("../../utils/validation/passwordValidation");
/**
 * resetPasswordController - Controller function to reset user password.
 *
 * This controller:
 * 1. Retrieves email and password from the request body.
 *    - Returns a bad request error if email is missing.
 * 2. Validates the password using `passwordValidation` utility.
 *    - Returns a bad request error if validation fails.
 * 3. Hashes the password using `hashPassword` utility.
 *    - Returns a forbidden error if hashing fails.
 * 4. Calls the `resetPasswordUseCase` to execute resetting the user password.
 *    - Returns a forbidden error if resetting fails.
 *    - Returns a success response if password is reset successfully.
 * 5. Handles and logs any caught errors during the execution.
 */
const resetPasswordController = (dependencies) => {
    const { useCases: { resetPasswordUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email) {
                next(errorResponse_1.default.badRequest("credential is missing"));
            }
            let errors = false;
            if (password) {
                const { value, error } = passwordValidation_1.passwordValidation.validate({ password: password });
                errors = error;
            }
            if (errors) {
                next(errorResponse_1.default.badRequest(errors.message));
            }
            else {
                const hashedPassword = yield (0, hashpassword_1.hashPassword)(password);
                if (!hashedPassword) {
                    next(errorResponse_1.default.forbidden("issue in hashing the password"));
                }
                const resetPassword = yield resetPasswordUseCase(dependencies).execute(email, hashedPassword);
                if (!resetPassword) {
                    return next(errorResponse_1.default.forbidden("Error occured in resetting the data of user"));
                }
                else {
                    return res.status(200).send({
                        success: true,
                        message: "user password resetted"
                    });
                }
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.resetPasswordController = resetPasswordController;
