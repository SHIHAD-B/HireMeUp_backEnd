"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../error/errorResponse"));
const config_1 = require("../../config/envConfig/config");
const userAuthMiddleware = (req, res, next) => {
    try {
        const { user_token } = req.cookies;
        if (!user_token) {
            return next(errorResponse_1.default.badRequest("User token is missing."));
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(user_token, config_1.JWT_SECRET);
            req.user = decoded;
        }
        next();
    }
    catch (err) {
        return next(errorResponse_1.default.unauthorized("Invalid or expired user token."));
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
