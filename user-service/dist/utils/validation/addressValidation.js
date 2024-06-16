"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addressValidation = joi_1.default.object({
    houseNumber: joi_1.default.string().required().messages({
        'any.required': 'House Number is required'
    }),
    locality: joi_1.default.string().required().messages({
        'any.required': 'Locality is required'
    }),
    pin: joi_1.default.number()
        .integer()
        .min(100000)
        .max(999999)
        .required()
        .messages({
        'number.base': 'Pin should be a numeric value',
        'number.integer': 'Pin should be a numeric value',
        'number.min': 'Pin should be a 6-digit number',
        'number.max': 'Pin should be a 6-digit number',
        'any.required': 'Pin is required'
    }),
    country: joi_1.default.string().required().messages({
        'any.required': 'Country is required'
    }),
    state: joi_1.default.string().required().messages({
        'any.required': 'State is required'
    }),
    city: joi_1.default.string().required().messages({
        'any.required': 'City is required'
    })
});
