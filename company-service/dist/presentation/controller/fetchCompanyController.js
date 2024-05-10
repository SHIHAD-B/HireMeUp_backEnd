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
exports.fetchCompanyController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/envConfig/config");
const fetchCompanyController = (dependencies) => {
    const { useCases: { fetchCompanyUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { Company_token } = req.cookies;
            if (!Company_token) {
                return next(errorResponse_1.default.badRequest("company token is missing."));
            }
            const deToken = jsonwebtoken_1.default.verify(Company_token, config_1.JWT_SECRET, (error, decode) => {
                if (error) {
                    return null;
                }
                return decode;
            });
            const { email } = deToken;
            if (!email) {
                return next(errorResponse_1.default.badRequest("company email is missing."));
            }
            const user = yield fetchCompanyUseCase(dependencies).execute(email);
            if (!user) {
                return next(errorResponse_1.default.notFound("company not found or unable to fetch company."));
            }
            else if (user.blocked == true || user.deleted == true) {
                return res.status(200).json({
                    success: false,
                    user: null,
                    message: "company is blocked or deleted"
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: "company fetched successfully."
                });
            }
        }
        catch (error) {
            console.error("Error fetching company:", error);
            return next(errorResponse_1.default.internalError("Failed to fetch company."));
        }
    });
};
exports.fetchCompanyController = fetchCompanyController;
