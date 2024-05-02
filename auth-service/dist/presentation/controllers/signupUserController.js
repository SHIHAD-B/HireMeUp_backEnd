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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/envConfig/config");
const signupValidation_1 = require("../../utils/validation/signupValidation");
const client_1 = __importDefault(require("../../infrastructure/rabbitmq/client"));
const signupUserController = (dependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase, verifyOtpUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = signupValidation_1.signupValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = value;
                const userExist = yield emailExistUseCase(dependencies).execute(data === null || data === void 0 ? void 0 : data.email);
                if (userExist) {
                    return next(errorResponse_1.default.conflict("user already exists"));
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
                                console.log(response);
                                return res.status(200).send({
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
                    const user = yield signupUserUseCase(dependencies).execute(data);
                    if (!user) {
                        return next(errorResponse_1.default.notFound('failed to add user'));
                    }
                    const payload = {
                        _id: String(user._id),
                        email: user.email,
                        role: user.role
                    };
                    const accessToken = jsonwebtoken_1.default.sign(payload, String(config_1.JWT_SECRET), { expiresIn: '24h' });
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
