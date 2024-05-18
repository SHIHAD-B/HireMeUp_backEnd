"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addCategoryValidation = joi_1.default.object({
    description: joi_1.default.string().min(5).required(),
    category: joi_1.default.string().min(4).max(40).required(),
});
