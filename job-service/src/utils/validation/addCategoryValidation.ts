import Joi from "joi";


export const addCategoryValidation = Joi.object({
    description: Joi.string().min(5).required(),
    category: Joi.string().min(4).max(40).required(),
});