"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateProfileValidation = joi_1.default.object({
    id: joi_1.default.string().min(2).required(),
    data: joi_1.default.string().min(10).required(),
    field: joi_1.default.string().min(2).required()
});
