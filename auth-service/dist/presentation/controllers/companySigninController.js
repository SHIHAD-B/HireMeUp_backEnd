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
exports.companySigninController = void 0;
const config_1 = require("../../config/envConfig/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginValidation_1 = require("../../utils/validation/loginValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const companySigninController = (dependencies) => {
    const { useCases: { companySigninUseCase } } = dependencies;
    const generateAccessToken = (company) => {
        const payload = {
            _id: String(company === null || company === void 0 ? void 0 : company._id),
            email: company === null || company === void 0 ? void 0 : company.email,
            role: company === null || company === void 0 ? void 0 : company.role
        };
        return jsonwebtoken_1.default.sign(payload, String(config_1.JWT_SECRET), { expiresIn: '24h' });
    };
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "body from back end");
            const { value, error } = loginValidation_1.signinValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const data = value;
                const Company = yield companySigninUseCase(dependencies).execute(data);
                if (Company == false) {
                    return next(errorResponse_1.default.badRequest('incorrect password'));
                }
                else if (Company == null) {
                    return next(errorResponse_1.default.notFound('Company not found'));
                }
                else {
                    const accessToken = generateAccessToken(Company);
                    res.cookie('Company_token', accessToken, {
                        httpOnly: true
                    });
                    res.status(200).json({
                        success: true,
                        user: Company,
                        message: "Company authenticated"
                    });
                }
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.companySigninController = companySigninController;
