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
exports.adminSigninController = void 0;
const loginValidation_1 = require("../../utils/validation/loginValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const accessToken_1 = require("../../utils/generateToken/accessToken");
/**
 * adminSigninController - Handles admin sign-in process.
 *
 * This controller:
 * 1. Validates the request data using signinValidation.
 * 2. Checks if the admin exists and the credentials are correct using adminSigninUseCase.
 * 3. If the password is incorrect or the admin is not found:
 *    - Returns appropriate error responses.
 * 4. If the admin is blocked:
 *    - Returns an error response indicating the admin is blocked or deleted.
 * 5. If the credentials are correct:
 *    - Generates an access token and sets it in an HTTP-only cookie.
 *    - Returns a success response with the admin details.
 */
const adminSigninController = (dependencies) => {
    const { useCases: { adminSigninUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = loginValidation_1.signinValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = value;
                const admin = yield adminSigninUseCase(dependencies).execute(data);
                if (admin == false) {
                    return next(errorResponse_1.default.badRequest('incorrect password.'));
                }
                else if (admin == true) {
                    return next(errorResponse_1.default.badRequest('incorrect password'));
                }
                else if (admin == null) {
                    return next(errorResponse_1.default.notFound('admin not found'));
                }
                else if ((admin === null || admin === void 0 ? void 0 : admin.blocked) == true) {
                    return next(errorResponse_1.default.badRequest('admin blocked or deleted by admin..'));
                }
                else {
                    const accessToken = (0, accessToken_1.generateAccessToken)(admin);
                    res.cookie('admin_token', accessToken, {
                        httpOnly: true
                    });
                    res.status(200).json({
                        success: true,
                        user: admin,
                        message: "admin authenticated"
                    });
                }
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.adminSigninController = adminSigninController;
