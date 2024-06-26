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
const RequestsSchema = new mongoose_1.Schema({
    approval: { type: String, enum: ['approved', 'inProgress', 'rejected'] },
    status: { type: String, enum: ['firstAttempt', 'secondAttempt', 'completed'] },
    companyname: { type: String },
    viewdocument: {
        registration: { type: Boolean, default: false },
        license: { type: Boolean, default: false },
        tin: { type: Boolean, default: false },
        financialStatements: { type: Boolean, default: false },
        references: { type: Boolean, default: false }
    },
    email: { type: String },
    address: { type: String },
    registration: { type: String },
    license: { type: String },
    tin: { type: String },
    financialStatements: { type: String },
    references: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
});
const Requests = mongoose_1.default.model('Requests', RequestsSchema);
exports.default = Requests;
