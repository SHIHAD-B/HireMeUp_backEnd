import Joi from "joi";
import { Types } from "mongoose";


export const editUserValidation = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string().min(3).required(),
    phone: Joi.number().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password is too weak',
            'string.empty': 'password is required',
        }).optional(),
    gender: Joi.string().optional(),
    dob: Joi.date().optional(),
    profile: Joi.string().optional(),
    skills: Joi.array().items(Joi.string()).optional(),
    education: Joi.array().items(Joi.object({
        university: Joi.string().optional(),
        course: Joi.string().optional(),
        description: Joi.string().optional(),
        from: Joi.string().optional(),
        grade: Joi.string().optional(),
        to: Joi.string().optional()
    })).optional(),
    cv: Joi.string().optional(),
    about: Joi.string().optional(),
    experiences: Joi.array().items(Joi.object({
        description: Joi.string().optional(),
        company: Joi.string().optional(),
        designation: Joi.string().optional(),
        from: Joi.date().optional(),
        location: Joi.string().optional(),
        to: Joi.date().optional()
    })).optional(),
    contacts: Joi.object({
        email: Joi.string().email().optional(),
        instagram: Joi.string().optional(),
        linkedin: Joi.string().optional(),
        phone: Joi.string().optional(),
        portfolio: Joi.string().optional(),
        twitter: Joi.string().optional()
    }).optional(),
    onlineStatus: Joi.string().optional(),
    blocked: Joi.boolean().optional(),
    __v: Joi.number().optional(),
    deleted: Joi.boolean().optional(),
    subscription: Joi.object({
        _id: Joi.string().custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        subscriptionId: Joi.string().custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        planId: Joi.string().custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        userId: Joi.string().custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').optional(),
        name: Joi.string().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        createdAt: Joi.date().optional()
    }).optional(),
    expiredSubscriptions: Joi.array().items(
        Joi.object({
            _id: Joi.string().custom((value, helpers) => {
                if (!Types.ObjectId.isValid(value)) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'ObjectId validation').optional(),
            subscriptionId: Joi.string().custom((value, helpers) => {
                if (!Types.ObjectId.isValid(value)) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'ObjectId validation').optional(),
            planId: Joi.string().custom((value, helpers) => {
                if (!Types.ObjectId.isValid(value)) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'ObjectId validation').optional(),
            userId: Joi.string().custom((value, helpers) => {
                if (!Types.ObjectId.isValid(value)) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'ObjectId validation').optional(),
            name: Joi.string().optional(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional(),
            createdAt: Joi.date().optional()
        })
    ).optional()
})







