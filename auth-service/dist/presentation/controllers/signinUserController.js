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
exports.signinUserController = void 0;
const config_1 = require("../../config/envConfig/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginValidation_1 = require("../../utils/validation/loginValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const signinUserController = (dependencies) => {
    const { useCases: { signinUserUseCase } } = dependencies;
    const generateAccessToken = (user) => {
        const payload = {
            _id: String(user === null || user === void 0 ? void 0 : user._id),
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role
        };
        return jsonwebtoken_1.default.sign(payload, String(config_1.JWT_SECRET), { expiresIn: '24h' });
    };
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = loginValidation_1.signinValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = value;
                const User = yield signinUserUseCase(dependencies).execute(data);
                if (User == false) {
                    return next(errorResponse_1.default.badRequest('incorrect password'));
                }
                else if (User == null) {
                    return next(errorResponse_1.default.notFound('user not found'));
                }
                else if ((User === null || User === void 0 ? void 0 : User.blocked) == true || User.deleted == true) {
                    return next(errorResponse_1.default.badRequest('user blocked or deleted by admin'));
                }
                else {
                    const accessToken = generateAccessToken(User);
                    res.cookie('user_token', accessToken, {
                        httpOnly: true
                    });
                    res.status(200).json({
                        success: true,
                        user: User,
                        message: "user authenticated"
                    });
                }
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.signinUserController = signinUserController;
