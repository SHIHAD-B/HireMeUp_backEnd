"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const config_1 = require("../../config/envConfig/config");
const adminAuthMiddleware = (req, res, next) => {
    try {
        const { admin_token } = req.cookies;
        if (!admin_token) {
            return next(errorResponse_1.default.badRequest("admin token is missing........"));
        }
        const decoded = jsonwebtoken_1.default.verify(admin_token, config_1.JWT_SECRET);
        if (!decoded) {
            return next(errorResponse_1.default.badRequest("Invalid admin token."));
        }
        req.admin = decoded;
        next();
    }
    catch (err) {
        return next(errorResponse_1.default.unauthorized("Invalid or expired admin token."));
    }
};
exports.adminAuthMiddleware = adminAuthMiddleware;
