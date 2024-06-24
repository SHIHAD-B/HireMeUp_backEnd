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
exports.signupUserController = void 0;
const generateOtp_1 = require("../../utils/otp/generateOtp");
const sentOtp_1 = require("../../utils/otp/sentOtp");
const hashpassword_1 = require("../../utils/hash/hashpassword");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const signupValidation_1 = require("../../utils/validation/signupValidation");
const client_1 = __importDefault(require("../../infrastructure/rabbitmq/client"));
const accessToken_1 = require("../../utils/generateToken/accessToken");
/**
 * signupGoogleController - Handles user sign-up/sign-in using Google OAuth process.
 *
 * This controller:
 * 1. Decodes the JWT credentials from the request body.
 * 2. Checks if the user's email already exists using emailExistUseCase.
 * 3. If the user's email exists:
 *    - Checks if the user is blocked or deleted by admin and returns an error if true.
 *    - Generates an access token and sets it in an HTTP-only cookie.
 *    - Returns a success response with the existing user's details.
 * 4. If the user's email doesn't exist:
 *    - Generates a random password for the user.
 *    - Hashes the generated password.
 *    - Creates a new user using signupUserUseCase with the provided Google credentials.
 *    - Returns an error response if failed to hash the password or add the user.
 *    - Generates an access token for the new user and sets it in an HTTP-only cookie.
 *    - Returns a success response with the new user's details.
 * 5. Returns an error response if the user's email is not found in the JWT credentials.
 */
const signupUserController = (dependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase, verifyOtpUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = signupValidation_1.signupValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = {
                    email: value.email,
                    phone: value.phone
                };
                const userExist = yield emailExistUseCase(dependencies).execute(data);
                if (typeof userExist !== 'boolean' && userExist !== null) {
                    let emailerr = "";
                    let phoneerr = "";
                    if ((userExist === null || userExist === void 0 ? void 0 : userExist.email) == value.email) {
                        emailerr = "user already exists";
                    }
                    if ((userExist === null || userExist === void 0 ? void 0 : userExist.phone) == value.phone) {
                        phoneerr = "number already used";
                    }
                    return next(errorResponse_1.default.conflict(emailerr + phoneerr));
                }
                if (!(value === null || value === void 0 ? void 0 : value.otp)) {
                    const otp = yield (0, generateOtp_1.generateOtp)();
                    if (otp) {
                        const otpData = {
                            email: data.email,
                            otp: otp
                        };
                        const client = yield client_1.default.getInstance();
                        const result = yield client.produce(otpData, "addOtp", "toUser");
                        if (result) {
                            yield (0, sentOtp_1.sendOtp)(data === null || data === void 0 ? void 0 : data.email, otp).then((response) => {
                                return res.status(200).send({
                                    success: true,
                                    user: value,
                                    message: 'An Otp has been sent to the email'
                                });
                            });
                        }
                    }
                }
                else {
                    const otpVerfication = yield verifyOtpUseCase(dependencies).execute(data.email, value === null || value === void 0 ? void 0 : value.otp);
                    if (!otpVerfication) {
                        return next(errorResponse_1.default.unauthorized("incorrect otp"));
                    }
                    const password = yield (0, hashpassword_1.hashPassword)(value.password);
                    if (!password) {
                        return next(errorResponse_1.default.forbidden('password required'));
                    }
                    else {
                        value.password = password;
                    }
                    const user = yield signupUserUseCase(dependencies).execute(value);
                    if (!user) {
                        return next(errorResponse_1.default.notFound('failed to add user'));
                    }
                    const accessToken = yield (0, accessToken_1.generateAccessToken)(user);
                    res.cookie('user_token', accessToken, {
                        httpOnly: true
                    });
                    return res.status(200).send({
                        success: true,
                        user: user,
                        message: "user signed in"
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.signupUserController = signupUserController;
