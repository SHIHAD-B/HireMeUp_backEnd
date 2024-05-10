"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPlanValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.editPlanValidation = joi_1.default.object({
    _id: joi_1.default.string().required(),
    duration: joi_1.default.number().min(1).max(365).optional(),
    description: joi_1.default.string().min(5).max(1000).optional(),
    price: joi_1.default.number().min(1).max(10000).optional(),
    name: joi_1.default.string().min(5).max(20).optional(),
    discount: joi_1.default.number().min(1).max(100).optional()
});
