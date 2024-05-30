import Joi from 'joi';


export const editCompanyValidation = Joi.object({
    _id: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) 
        .optional()
        .empty('')
        .messages({
            'string.email': 'Email must be a valid email address',
        }),
    company_name: Joi.string()
        .min(1)
        .max(50) 
        .optional()
        .empty('')
        .messages({
            'string.min': 'Company name must be at least 1 character long',
            'string.max': 'Company name cannot be longer than 255 characters',
        }),
    password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .optional()
        .empty('')
        .messages({
            'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character',
        }),
});
