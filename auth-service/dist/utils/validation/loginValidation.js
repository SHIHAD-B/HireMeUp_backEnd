"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signinValidation = joi_1.default.object({
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
    })
}).options({ abortEarly: false }).unknown(true);
