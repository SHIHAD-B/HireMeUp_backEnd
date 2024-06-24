"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApplicantsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addApplicantsValidation = joi_1.default.object({
    jobId: joi_1.default.string().required(),
    companyId: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    hiring_status: joi_1.default.string().allow(null).optional(),
    answers: joi_1.default.array().items(joi_1.default.object()).optional(),
    resume: joi_1.default.string().required(),
    hiring_info: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().allow(null).optional(),
        notes: joi_1.default.string().allow(null).optional()
    })).optional(),
});
