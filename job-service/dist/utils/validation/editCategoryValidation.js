"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.editCategoryValidation = joi_1.default.object({
    _id: joi_1.default.string().min(5).required(),
    description: joi_1.default.string().min(5).required(),
    category: joi_1.default.string().min(4).max(40).required(),
});
