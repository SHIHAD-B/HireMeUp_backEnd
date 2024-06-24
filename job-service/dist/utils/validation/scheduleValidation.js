"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.scheduleValidation = joi_1.default.object({
    companyId: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    jobId: joi_1.default.string().required(),
    interviewer: joi_1.default.string().required(),
    title: joi_1.default.string().allow(null).optional(),
    status: joi_1.default.string().allow(null).optional(),
    date: joi_1.default.date().allow(null).optional()
});
