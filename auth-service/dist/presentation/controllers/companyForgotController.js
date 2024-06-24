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
exports.companyForgotController = void 0;
const generateOtp_1 = require("../../utils/otp/generateOtp");
const sentOtp_1 = require("../../utils/otp/sentOtp");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const emailValidation_1 = require("../../utils/validation/emailValidation");
const client_1 = __importDefault(require("../../infrastructure/rabbitmq/client"));
/**
 * companyForgotController - Handles company forgot password process.
 *
 * This controller:
 * 1. Validates the request data using emailValidation.
 * 2. Checks if the company exists using companyEmailExistUseCase.
 * 3. If the company does not exist:
 *    - Returns an error response indicating the company is not found.
 * 4. If no OTP is provided:
 *    - Generates an OTP.
 *    - Sends the OTP to the company's email via RabbitMQ.
 *    - Returns a success response indicating the OTP was sent.
 * 5. If an OTP is provided:
 *    - Verifies the OTP using verifyOtpUseCase.
 *    - Returns a success response if the OTP is verified.
 *    - Returns an error response if the OTP is incorrect.
 */
const companyForgotController = (dependencies) => {
    const { useCases: { companyEmailExistUseCase, verifyOtpUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error, value } = emailValidation_1.emailValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(error.message));
            }
            const { email, otp } = value;
            const userExist = yield companyEmailExistUseCase(dependencies).execute(email);
            if (!userExist) {
                return next(errorResponse_1.default.badRequest("company not found"));
            }
            if (!otp) {
                const generatedOtp = yield (0, generateOtp_1.generateOtp)();
                if (!generatedOtp) {
                    return next(errorResponse_1.default.internalError("Failed to generate OTP"));
                }
                const otpData = {
                    email,
                    otp: generatedOtp
                };
                const client = yield client_1.default.getInstance();
                const result = yield client.produce(otpData, "addOtp", "toUser");
                if (!result) {
                    return next(errorResponse_1.default.internalError("Failed to send OTP"));
                }
                yield (0, sentOtp_1.sendOtp)(email, generatedOtp);
                return res.status(200).send({
                    success: true,
                    user: { email: email },
                    message: 'An OTP has been sent to the email'
                });
            }
            else {
                const otpVerification = yield verifyOtpUseCase(dependencies).execute(email, otp);
                if (!otpVerification) {
                    return next(errorResponse_1.default.unauthorized("Incorrect OTP"));
                }
                return res.status(200).send({
                    success: true,
                    user: userExist,
                    message: "OTP verified"
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.companyForgotController = companyForgotController;
