"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const today = new Date();
today.setHours(0, 0, 0, 0);
exports.educationValidation = joi_1.default.object({
    _id: joi_1.default.string().min(5).optional(),
    course: joi_1.default.string()
        .min(3)
        .required()
        .messages({
        'string.base': `"course" should be a type of 'text'`,
        'string.empty': `"course" cannot be empty`,
        'any.required': `"course" is required`,
        'string.min': `"course" should have a minimum length of {#limit}`,
    }),
    university: joi_1.default.string()
        .min(5)
        .max(25)
        .pattern(/^[A-Za-z ]+$/)
        .required()
        .messages({
        'string.base': `"university" should be a type of 'text'`,
        'string.empty': `"university" cannot be empty`,
        'any.required': `"university" is required`,
        'string.min': `"university" should have a minimum length of {#limit}`,
        'string.max': `"university" should have a maximum length of {#limit}`,
        'string.pattern.base': `"university" should only contain letters and spaces`,
    }),
    grade: joi_1.default.string()
        .min(3)
        .required()
        .messages({
        'string.base': `"grade" should be a type of 'text'`,
        'string.empty': `"grade" cannot be empty`,
        'any.required': `"grade" is required`,
        'string.min': `"grade" should have a minimum length of {#limit}`,
    }),
    from: joi_1.default.date()
        .max(today)
        .required()
        .messages({
        'date.base': `"from" should be a valid date`,
        'date.max': `"from" cannot be in the future`,
        'any.required': `"from" is required`,
    }),
    to: joi_1.default.date()
        .min(joi_1.default.ref('from'))
        .max(today)
        .required()
        .messages({
        'date.base': `"to" should be a valid date`,
        'date.min': `"to" cannot be before "from"`,
        'date.max': `"to" cannot be in the future`,
        'any.required': `"to" is required`,
    }),
    description: joi_1.default.string()
        .min(5)
        .max(500)
        .required()
        .messages({
        'string.base': `"description" should be a type of 'text'`,
        'string.empty': `"description" cannot be empty`,
        'any.required': `"description" is required`,
        'string.min': `"description" should have a minimum length of {#limit}`,
        'string.max': `"description" should have a maximum length of {#limit}`,
    }),
});
