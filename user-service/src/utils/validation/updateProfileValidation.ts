import joi from "joi";

export const updateProfileValidation = joi.object({

    id: joi.string().min(2).required(),
    data: joi.string().min(10).required(),
    field: joi.string().min(2).required()
});