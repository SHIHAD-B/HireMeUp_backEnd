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
const config_1 = require("../../config/envConfig/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginValidation_1 = require("../../utils/validation/loginValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const adminSigninController = (dependencies) => {
    const { useCases: { adminSigninUseCase } } = dependencies;
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
                const admin = yield adminSigninUseCase(dependencies).execute(data);
                if (admin == false) {
                    return next(errorResponse_1.default.badRequest('incorrect password'));
                }
                else if (admin == null) {
                    return next(errorResponse_1.default.notFound('admin not found'));
                }
                else if ((admin === null || admin === void 0 ? void 0 : admin.blocked) == true || admin.deleted == true) {
                    return next(errorResponse_1.default.badRequest('admin blocked or deleted by admin'));
                }
                else {
                    const accessToken = generateAccessToken(admin);
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
