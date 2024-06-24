import Joi from 'joi';
import { EMAIL } from '../../config/envConfig/config';


const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;

export const setProfileOneValidation = Joi.object({
    _id: Joi.string().required().messages({
        'any.required': 'id is required',
    }),
    email: Joi.string().required().messages({
        'any.required': 'Email is required',
    }),
    icon: Joi.string().required().messages({
        'any.required': 'icon is required',
    }),
    company_name: Joi.string().required().messages({
        'any.required': 'Company name is required',
    }),
    employees: Joi.string().pattern(/^\d+-\d+$/, 'range').required().required().messages({
        'array.base': 'Employees must be an array',
        'array.includes': 'Each employee entry must be a string in the format "50-100"',
        'any.required': 'Employees range is required',
    }),
    industry: Joi.string().required().messages({
        'any.required': 'Industry is required',
    }),
    founded: Joi.date().required().messages({
        'date.base': 'Founded date must be a valid date',
        'any.required': 'Founded date is required',
    }),
    website: Joi.string().pattern(websiteRegex).required().messages({
        'string.pattern.base': 'Invalid website URL',
        'any.required': 'Website is required',
    }),
    location: Joi.array().items(Joi.string().required()).min(1).messages({
        'array.base': 'Location must be an array',
        'array.min': 'At least one location is required',
        'any.required': 'Location is required',
    }),
    tech_stack: Joi.array().items(Joi.string().required()).min(1).messages({
        'array.base': 'Tech stack must be an array',
        'array.min': 'At least one tech stack item is required',
        'any.required': 'Tech stack item is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
    }),
});
