import Joi from "joi";

export const addressValidation = Joi.object({
    houseNumber: Joi.string().required().messages({
        'any.required': 'House Number is required'
    }),
    locality: Joi.string().required().messages({
        'any.required': 'Locality is required'
    }),
    pin: Joi.number()
        .integer()
        .min(100000)
        .max(999999)
        .required()
        .messages({
            'number.base': 'Pin should be a numeric value',
            'number.integer': 'Pin should be a numeric value',
            'number.min': 'Pin should be a 6-digit number',
            'number.max': 'Pin should be a 6-digit number',
            'any.required': 'Pin is required'
        }),
    country: Joi.string().required().messages({
        'any.required': 'Country is required'
    }),
    state: Joi.string().required().messages({
        'any.required': 'State is required'
    }),
    city: Joi.string().required().messages({
        'any.required': 'City is required'
    })
});
