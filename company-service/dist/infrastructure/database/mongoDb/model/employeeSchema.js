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
const EmployeeSchema = new mongoose_1.Schema({
    companyId: { type: mongoose_1.Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    profile: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }
});
const Employee = mongoose_1.default.model('Employee', EmployeeSchema);
exports.default = Employee;
