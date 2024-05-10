"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlanValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addPlanValidation = joi_1.default.object({
    duration: joi_1.default.number().min(1).max(365).required(),
    description: joi_1.default.string().min(5).max(1000).required(),
    price: joi_1.default.number().min(1).max(10000).required(),
    name: joi_1.default.string().min(5).max(20).required(),
    discount: joi_1.default.number().min(0).max(100).required()
});
