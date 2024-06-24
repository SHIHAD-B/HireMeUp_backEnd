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
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/envConfig/config");
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        _id: String(user._id),
        email: user.email,
        role: user.role,
    };
    const refreshToken = jsonwebtoken_1.default.sign(payload, String(config_1.JWT_REFRESH_SECRET), { expiresIn: '7d' });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    const data = {
        token: String(refreshToken),
        coreId: user._id,
        expiryDate: new Date(expiryDate)
    };
    return data;
});
exports.generateRefreshToken = generateRefreshToken;
