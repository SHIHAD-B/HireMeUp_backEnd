import Joi from "joi";

export const passwordValidation = Joi.object({
 
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password is too weak',
            'string.empty': 'password is required',
        })
});