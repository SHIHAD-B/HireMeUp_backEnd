import Joi from "joi";


export const editCategoryValidation = Joi.object({
    _id: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    category: Joi.string().min(4).max(40).required(),
});