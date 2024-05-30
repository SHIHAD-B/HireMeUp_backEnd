"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCompanyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.editCompanyValidation = joi_1.default.object({
    _id: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional()
        .empty('')
        .messages({
        'string.email': 'Email must be a valid email address',
    }),
    company_name: joi_1.default.string()
        .min(1)
        .max(50)
        .optional()
        .empty('')
        .messages({
        'string.min': 'Company name must be at least 1 character long',
        'string.max': 'Company name cannot be longer than 255 characters',
    }),
    password: joi_1.default.string()
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .optional()
        .empty('')
        .messages({
        'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character',
    }),
});
