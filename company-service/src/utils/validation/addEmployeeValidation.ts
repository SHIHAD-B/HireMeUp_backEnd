import Joi from 'joi';


const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const addEmployeeValidation = Joi.object({
    companyId: Joi.string().pattern(objectIdRegex).messages({
        'string.pattern.base': 'Invalid company ID',
    }),
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
    }),
    profile: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Profile must be a string',
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    position: Joi.string().required().messages({
        'any.required': 'Position is required',
    }),
    department: Joi.string().required().messages({
        'any.required': 'Department is required',
    }),
});
