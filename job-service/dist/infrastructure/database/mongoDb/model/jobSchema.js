"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const JobsSchema = new mongoose_1.Schema({
    companyId: { type: mongoose_1.Schema.Types.ObjectId },
    description: { type: String },
    deleted: { type: Boolean, default: false },
    salary_from: { type: Number },
    responsibilities: { type: String },
    required_skills: { type: [String] },
    requirements: { type: String },
    category: { type: mongoose_1.Schema.Types.ObjectId },
    salary_to: { type: Number },
    job_title: { type: String },
    type: { type: String, enum: ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'] },
    benefits: [{
            description: { type: String },
            icon: { type: Number },
            name: { type: String },
        }],
    qualification: { type: String },
    slot: { type: Number },
    start_date: { type: Date },
    end_date: { type: Date },
    level: { type: String, enum: ['entry', 'mid', 'director', 'vp or above'] },
    createdAt: { type: Date, default: Date.now },
    expires: {
        type: Date, default: function () {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 30);
            return currentDate;
        }
    }
});
const Jobs = mongoose_1.default.model('Jobs', JobsSchema);
exports.default = Jobs;
