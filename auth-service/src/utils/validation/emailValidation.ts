import Joi from "joi";

export const emailValidation = Joi.object({
    email: Joi.string().email()
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email is not valid',
            'string.empty': 'Email is required',
        })
}).options({ abortEarly: false }).unknown(true);


