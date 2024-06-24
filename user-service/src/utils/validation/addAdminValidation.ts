import Joi from "joi";

export const addAdminValidation = Joi.object({
   name: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.pattern.base': 'Username must contain only letters',
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 4 characters long',
            'string.max': 'Username cannot be longer than 20 characters'
        }),
        access:Joi.string().required() .messages({
            'string.empty': 'access is required'
        }),
    email: Joi.string().email()
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email is not valid',
            'string.empty': 'Email is required',
        }),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password is too weak',
            'string.empty': 'password is required',
        })
}).options({ abortEarly: false }).unknown(true);
