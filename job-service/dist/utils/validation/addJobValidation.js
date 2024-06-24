"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJobValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addJobValidation = joi_1.default.object({
    companyId: joi_1.default.string().required(),
    description: joi_1.default.string().min(5).required(),
    salary_from: joi_1.default.number().min(0).required(),
    salary_to: joi_1.default.number().min(joi_1.default.ref('salary_from')).required(),
    responsibilities: joi_1.default.string().min(5).required(),
    questions: joi_1.default.array().items(joi_1.default.string()).min(0).optional(),
    required_skills: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    requirements: joi_1.default.string().min(5).required(),
    category: joi_1.default.string().required(),
    job_title: joi_1.default.string().required(),
    location: joi_1.default.string().empty('').allow(null).optional(),
    type: joi_1.default.string().required(),
    benefits: joi_1.default.array().items(joi_1.default.object({
        description: joi_1.default.string().allow(null).optional(),
        icon: joi_1.default.number().allow(null).optional(),
        name: joi_1.default.string().allow(null).optional()
    })).optional(),
    qualification: joi_1.default.string().required(),
    slot: joi_1.default.number().min(1).required(),
    start_date: joi_1.default.date().required(),
    end_date: joi_1.default.date().required(),
    level: joi_1.default.string().empty('').allow(null).optional()
});
