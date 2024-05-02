import Joi from "joi";

export const signinValidation = Joi.object({
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


