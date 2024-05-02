"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.editUserValidation = joi_1.default.object({
    username: joi_1.default.string().min(20).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)).required()
});
