import Joi from "joi";

export const editUserValidation = Joi.object({
    username: Joi.string().min(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)).required()
})