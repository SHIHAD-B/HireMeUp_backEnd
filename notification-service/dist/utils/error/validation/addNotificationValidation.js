"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotificationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addNotificationValidation = joi_1.default.object({
    recipient: joi_1.default.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.base": "Recipient must be a string",
        "string.pattern.base": "Invalid recipient ID",
        "any.required": "Recipient is required",
    }),
    message: joi_1.default.string().required().messages({
        "string.base": "Message must be a string",
        "any.required": "Message is required",
    }),
    sender: joi_1.default.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.base": "Sender must be a string",
        "string.pattern.base": "Invalid sender ID",
        "any.required": "Sender is required",
    }),
    type: joi_1.default.string().valid('info', 'warning', 'error', 'custom').required().messages({
        "string.base": "Type must be a string",
        "any.only": "Type must be one of 'info', 'warning', 'error', 'custom'",
        "any.required": "Type is required",
    }),
});
