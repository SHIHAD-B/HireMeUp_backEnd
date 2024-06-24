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
exports.companySignupController = void 0;
const generateOtp_1 = require("../../utils/otp/generateOtp");
const sentOtp_1 = require("../../utils/otp/sentOtp");
const hashpassword_1 = require("../../utils/hash/hashpassword");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addRequestValidation_1 = require("../../utils/validation/addRequestValidation");
const client_1 = __importDefault(require("../../infrastructure/rabbitmq/client"));
const companySignupController = (dependencies) => {
    const { useCases: { companySignupUseCase, companyEmailExistUseCase, verifyOtpUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = addRequestValidation_1.addRequestValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = value;
                const companyExist = yield companyEmailExistUseCase(dependencies).execute(data === null || data === void 0 ? void 0 : data.email);
                if (companyExist) {
                    return next(errorResponse_1.default.conflict("company already exists"));
                }
                if (!(data === null || data === void 0 ? void 0 : data.otp)) {
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
                                    user: data,
                                    message: 'An Otp has been sent to the email'
                                });
                            });
                        }
                    }
                }
                else {
                    const otpVerfication = yield verifyOtpUseCase(dependencies).execute(data.email, data === null || data === void 0 ? void 0 : data.otp);
                    if (!otpVerfication) {
                        return next(errorResponse_1.default.unauthorized("incorrect otp"));
                    }
                    const password = yield (0, hashpassword_1.hashPassword)(data.password);
                    if (!password) {
                        return next(errorResponse_1.default.forbidden('password required'));
                    }
                    else {
                        data.password = password;
                    }
                    const user = yield companySignupUseCase(dependencies).execute(data);
                    if (!user) {
                        return next(errorResponse_1.default.notFound('failed to add company'));
                    }
                    return res.status(200).send({
                        success: true,
                        user: user,
                        message: "reqeust sent for validation successfully"
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.companySignupController = companySignupController;
