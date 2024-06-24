"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProfileOneValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
exports.setProfileOneValidation = joi_1.default.object({
    _id: joi_1.default.string().required().messages({
        'any.required': 'id is required',
    }),
    email: joi_1.default.string().required().messages({
        'any.required': 'Email is required',
    }),
    icon: joi_1.default.string().required().messages({
        'any.required': 'icon is required',
    }),
    company_name: joi_1.default.string().required().messages({
        'any.required': 'Company name is required',
    }),
    employees: joi_1.default.string().pattern(/^\d+-\d+$/, 'range').required().required().messages({
        'array.base': 'Employees must be an array',
        'array.includes': 'Each employee entry must be a string in the format "50-100"',
        'any.required': 'Employees range is required',
    }),
    industry: joi_1.default.string().required().messages({
        'any.required': 'Industry is required',
    }),
    founded: joi_1.default.date().required().messages({
        'date.base': 'Founded date must be a valid date',
        'any.required': 'Founded date is required',
    }),
    website: joi_1.default.string().pattern(websiteRegex).required().messages({
        'string.pattern.base': 'Invalid website URL',
        'any.required': 'Website is required',
    }),
    location: joi_1.default.array().items(joi_1.default.string().required()).min(1).messages({
        'array.base': 'Location must be an array',
        'array.min': 'At least one location is required',
        'any.required': 'Location is required',
    }),
    tech_stack: joi_1.default.array().items(joi_1.default.string().required()).min(1).messages({
        'array.base': 'Tech stack must be an array',
        'array.min': 'At least one tech stack item is required',
        'any.required': 'Tech stack item is required',
    }),
    description: joi_1.default.string().required().messages({
        'any.required': 'Description is required',
    }),
});
