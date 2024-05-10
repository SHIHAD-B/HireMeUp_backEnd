import Joi from "joi";

export const addPlanValidation = Joi.object({
    duration: Joi.number().min(1).max(365).required(),
    description: Joi.string().min(5).max(1000).required(),
    price: Joi.number().min(1).max(10000).required(),
    name: Joi.string().min(5).max(20).required(),
    discount: Joi.number().min(0).max(100).required()
});
