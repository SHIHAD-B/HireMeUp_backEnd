"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.editUserValidation = joi_1.default.object({
    _id: joi_1.default.string().required(),
    username: joi_1.default.string().min(3).required(),
    phone: joi_1.default.number().optional(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
        'string.pattern.base': 'Password is too weak',
        'string.empty': 'password is required',
    }).optional(),
    gender: joi_1.default.string().optional(),
    dob: joi_1.default.date().optional(),
    profile: joi_1.default.string().optional(),
    skills: joi_1.default.array().items(joi_1.default.string()).optional(),
    education: joi_1.default.object({
        description: joi_1.default.string().optional(),
        from: joi_1.default.string().optional(),
        grade: joi_1.default.string().optional(),
        to: joi_1.default.string().optional()
    }).optional(),
    cv: joi_1.default.string().optional(),
    about: joi_1.default.string().optional(),
    experiences: joi_1.default.object({
        description: joi_1.default.string().optional(),
        designation: joi_1.default.string().optional(),
        from: joi_1.default.date().optional(),
        location: joi_1.default.string().optional(),
        to: joi_1.default.date().optional()
    }).optional(),
    contacts: joi_1.default.object({
        email: joi_1.default.string().email().optional(),
        instagram: joi_1.default.string().optional(),
        linkedin: joi_1.default.string().optional(),
        phone: joi_1.default.string().optional(),
        portfolio: joi_1.default.string().optional(),
        twitter: joi_1.default.string().optional()
    }).optional(),
    onlineStatus: joi_1.default.string().optional(),
    blocked: joi_1.default.boolean().optional(),
    __v: joi_1.default.number().optional(),
    deleted: joi_1.default.boolean().optional(),
    subscription: joi_1.default.object({
        _id: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        subscriptionId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        planId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        userId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        name: joi_1.default.string().optional(),
        start_date: joi_1.default.date().optional(),
        end_date: joi_1.default.date().optional(),
        createdAt: joi_1.default.date().optional()
    }).optional(),
    expiredSubscriptions: joi_1.default.array().items(joi_1.default.object({
        _id: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        subscriptionId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        planId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        userId: joi_1.default.string().custom((value, helpers) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        name: joi_1.default.string().optional(),
        start_date: joi_1.default.date().optional(),
        end_date: joi_1.default.date().optional(),
        createdAt: joi_1.default.date().optional()
    })).optional()
});
