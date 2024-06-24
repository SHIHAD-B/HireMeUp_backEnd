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
exports.signupGoogleController = void 0;
const generatePassword_1 = require("../../utils/password/generatePassword");
const hashpassword_1 = require("../../utils/hash/hashpassword");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/envConfig/config");
const jwt_decode_1 = require("jwt-decode");
const accessToken_1 = require("../../utils/generateToken/accessToken");
const signupGoogleController = (dependencies) => {
    const { useCases: { signupUserUseCase, emailExistUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = (0, jwt_decode_1.jwtDecode)(req.body.id.credential);
            if (credentials.email) {
                let userData = {
                    email: undefined,
                    username: undefined,
                    password: undefined,
                    role: "user"
                };
                const emailExist = yield emailExistUseCase(dependencies).execute({ email: credentials.email });
                if (emailExist) {
                    if (emailExist.blocked == true || emailExist.deleted == true) {
                        return next(errorResponse_1.default.badRequest('user blocked or deleted by admin'));
                    }
                    const accessToken = yield (0, accessToken_1.generateAccessToken)(emailExist);
                    res.cookie('user_token', accessToken, { httpOnly: true });
                    return res.status(200).send({
                        success: true,
                        user: emailExist
                    });
                }
                else {
                    const generatedPassword = (0, generatePassword_1.generatePassword)();
                    const password = yield (0, hashpassword_1.hashPassword)(generatedPassword);
                    if (!password) {
                        return next(errorResponse_1.default.forbidden('password required'));
                    }
                    else {
                        userData.email = credentials.email;
                        userData.password = password;
                        userData.username = credentials.given_name;
                        const user = yield signupUserUseCase(dependencies).execute(userData);
                        if (!user) {
                            return next(errorResponse_1.default.internalError('failed to add user'));
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
            else {
                return res.status(400).send({
                    success: true,
                    user: null,
                    error: "user not found"
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.signupGoogleController = signupGoogleController;
