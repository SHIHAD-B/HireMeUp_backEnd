"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const config_1 = require("../../config/envConfig/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    const payload = {
        _id: String(user === null || user === void 0 ? void 0 : user._id),
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    return jsonwebtoken_1.default.sign(payload, String(config_1.JWT_SECRET), { expiresIn: '30m' });
};
exports.generateAccessToken = generateAccessToken;
