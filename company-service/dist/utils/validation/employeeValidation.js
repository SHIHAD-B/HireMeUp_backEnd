"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.employeeValidation = joi_1.default.object({
    _id: joi_1.default.string().required().messages({
        'any.required': 'ID is required',
    }),
    companyId: joi_1.default.string().pattern(objectIdRegex).messages({
        'string.pattern.base': 'Invalid company ID',
    }),
    firstName: joi_1.default.string().required().messages({
        'any.required': 'First name is required',
    }),
    profile: joi_1.default.string().optional().allow(null, '').messages({
        'string.base': 'Profile must be a string',
    }),
    lastName: joi_1.default.string().required().messages({
        'any.required': 'Last name is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    position: joi_1.default.string().required().messages({
        'any.required': 'Position is required',
    }),
    department: joi_1.default.string().required().messages({
        'any.required': 'Department is required',
    }),
});
