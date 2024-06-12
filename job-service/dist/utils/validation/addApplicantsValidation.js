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
    schedule: joi_1.default.array().items(joi_1.default.object({
        date: joi_1.default.date().allow(null).optional(),
        feedback: joi_1.default.string().allow(null).optional(),
        status: joi_1.default.string().allow(null).optional(),
        time: joi_1.default.string().allow(null).optional(),
        title: joi_1.default.string().allow(null).optional(),
    })).optional(),
    userId: joi_1.default.string().required(),
    hiring_status: joi_1.default.string().allow(null).optional(),
    answers: joi_1.default.array().items(joi_1.default.object()).optional(),
    resume: joi_1.default.string().required(),
    hiring_info: joi_1.default.array().items(joi_1.default.object({
        date: joi_1.default.date().allow(null).optional(),
        interviewer: joi_1.default.string().allow(null).optional(),
        notes: joi_1.default.string().allow(null).optional(),
        status: joi_1.default.string().allow(null).optional()
    })).optional(),
});
