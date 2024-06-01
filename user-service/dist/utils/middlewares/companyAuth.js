"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../error/errorResponse"));
const config_1 = require("../../config/envConfig/config");
const companyAuthMiddleware = (req, res, next) => {
    try {
        const { Company_token } = req.cookies;
        if (!Company_token) {
            return next(errorResponse_1.default.badRequest("company token is missing........"));
        }
        const decoded = jsonwebtoken_1.default.verify(Company_token, config_1.JWT_SECRET);
        if (!decoded) {
            return next(errorResponse_1.default.badRequest("Invalid company token."));
        }
        req.company = decoded;
        next();
    }
    catch (err) {
        return next(errorResponse_1.default.unauthorized("Invalid or expired company token."));
    }
};
exports.companyAuthMiddleware = companyAuthMiddleware;
