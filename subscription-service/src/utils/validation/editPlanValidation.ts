import Joi from "joi";

export const editPlanValidation = Joi.object({
    _id:Joi.string().required(),
    duration: Joi.number().min(1).max(365).optional(),
    description: Joi.string().min(5).max(1000).optional(),
    price: Joi.number().min(1).max(10000).optional(),
    name: Joi.string().min(5).max(20).optional(),
    discount: Joi.number().min(1).max(100).optional()
});
