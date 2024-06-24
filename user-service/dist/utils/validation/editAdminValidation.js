"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAdminValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.editAdminValidation = joi_1.default.object({
    _id: joi_1.default.string().custom((value, helpers) => {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'ObjectId validation').optional(),
    password: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().optional(),
    access: joi_1.default.string().valid('can-view', 'can-edit').optional(),
    role: joi_1.default.string().valid('sub-admin', 'admin').default('sub-admin').optional(),
    blocked: joi_1.default.boolean().default(false).optional(),
    createdAt: joi_1.default.date().optional(),
});
