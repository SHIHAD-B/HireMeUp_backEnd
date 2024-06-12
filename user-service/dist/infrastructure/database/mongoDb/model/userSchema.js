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
const UsersSchema = new mongoose_1.Schema({
    phone: { type: Number },
    username: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    password: { type: String },
    email: { type: String },
    dob: { type: Date },
    profile: { type: String },
    skills: [{ type: String, }],
    education: {
        university: { type: String },
        course: { type: String },
        description: { type: String },
        from: { type: String },
        grade: { type: String },
        to: { type: String },
    },
    cv: { type: String },
    about: { type: String },
    experiences: [{
            description: { type: String },
            designation: { type: String },
            company: { type: String },
            from: { type: Date },
            location: { type: String },
            to: { type: Date },
        }],
    contacts: {
        email: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
        phone: { type: String },
        portfolio: { type: String },
        twitter: { type: String },
    },
    online_status: { type: String, enum: ['online', 'offline'] },
    blocked: { type: Boolean },
    deleted: { type: Boolean },
    subscription: {
        subscriptionId: { type: mongoose_1.Schema.Types.ObjectId },
        planId: { type: mongoose_1.Schema.Types.ObjectId },
        name: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        createdAt: { type: Date }
    },
    expiredSubscriptions: [{
            subscriptionId: { type: mongoose_1.Schema.Types.ObjectId },
            planId: { type: mongoose_1.Schema.Types.ObjectId },
            name: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            createdAt: { type: Date }
        }]
});
const Users = mongoose_1.default.model('Users', UsersSchema);
exports.default = Users;
