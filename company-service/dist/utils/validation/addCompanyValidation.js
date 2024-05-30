"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompanyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addCompanyValidation = joi_1.default.object({
    company_name: joi_1.default.string()
        .regex(/^(?!.* {3})[A-Za-z]+(?: [A-Za-z]+)*(?: {2}[A-Za-z]+)*$/)
        .min(3)
        .max(20)
        .required()
        .messages({
        'string.pattern.base': 'Company must contain only letters and up to two spaces in between',
        'string.empty': 'Company is required',
        'string.min': 'Company must be at least 3 characters long',
        'string.max': 'Company cannot be longer than 20 characters'
    }),
    email: joi_1.default.string().email()
        .required()
        .messages({
        'any.required': 'Email is required',
        'string.email': 'Email is not valid',
        'string.empty': 'Email is required',
    }),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
        'string.pattern.base': 'Password is too weak',
        'string.empty': 'password is required',
    }),
}).options({ abortEarly: false }).unknown(true);
