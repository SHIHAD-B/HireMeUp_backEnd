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
const loginValidation_1 = require("../../utils/validation/loginValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const accessToken_1 = require("../../utils/generateToken/accessToken");
const refreshToken_1 = require("../../utils/generateToken/refreshToken");
const signinUserController = (dependencies) => {
    const { useCases: { signinUserUseCase, storeRefreshTokenUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { value, error } = loginValidation_1.signinValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            const data = value;
            const User = yield signinUserUseCase(dependencies).execute(data);
            if (User == false || User == true) {
                return next(errorResponse_1.default.badRequest('incorrect password'));
            }
            else if (User == null) {
                return next(errorResponse_1.default.badRequest('user not found'));
            }
            else if (User.blocked || User.deleted) {
                return next(errorResponse_1.default.badRequest('user blocked or deleted by admin'));
            }
            else {
                const accessToken = (0, accessToken_1.generateAccessToken)(User);
                const refreshToken = yield (0, refreshToken_1.generateRefreshToken)(User);
                yield storeRefreshTokenUseCase(dependencies).execute(refreshToken);
                res.cookie('user_token', accessToken, {
                    httpOnly: true,
                });
                res.status(200).json({
                    success: true,
                    user: User,
                    accessToken,
                    refreshToken: refreshToken.token,
                    message: "user authenticated",
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.signinUserController = signinUserController;
