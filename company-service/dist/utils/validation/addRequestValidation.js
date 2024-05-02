"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addRequestValidation = joi_1.default.object({
    companyname: joi_1.default.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(20)
        .required()
        .messages({
        'string.pattern.base': 'Username must contain only letters',
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 4 characters long',
        'string.max': 'Username cannot be longer than 20 characters'
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
    document: joi_1.default.string()
        .min(3)
        .max(20)
        .required()
        .messages({
        'string.empty': 'document is required',
        'string.min': 'invalid document path',
        'string.max': 'invalid document path'
    }),
}).options({ abortEarly: false }).unknown(true);
