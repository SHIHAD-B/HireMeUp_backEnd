"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.emailValidation = joi_1.default.object({
    email: joi_1.default.string().email()
        .required()
        .messages({
        'any.required': 'Email is required',
        'string.email': 'Email is not valid',
        'string.empty': 'Email is required',
    })
}).options({ abortEarly: false }).unknown(true);
