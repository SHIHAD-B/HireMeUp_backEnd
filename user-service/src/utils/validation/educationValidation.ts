import Joi from 'joi'

const today = new Date();
today.setHours(0, 0, 0, 0);

export const educationValidation = Joi.object({
    _id: Joi.string().min(5).optional(),
    course: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': `"course" should be a type of 'text'`,
            'string.empty': `"course" cannot be empty`,
            'any.required': `"course" is required`,
            'string.min': `"course" should have a minimum length of {#limit}`,
        }),
    university: Joi.string()
        .min(5)
        .max(25)
        .pattern(/^[A-Za-z ]+$/)
        .required()
        .messages({
            'string.base': `"university" should be a type of 'text'`,
            'string.empty': `"university" cannot be empty`,
            'any.required': `"university" is required`,
            'string.min': `"university" should have a minimum length of {#limit}`,
            'string.max': `"university" should have a maximum length of {#limit}`,
            'string.pattern.base': `"university" should only contain letters and spaces`,
        }),
    grade: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': `"grade" should be a type of 'text'`,
            'string.empty': `"grade" cannot be empty`,
            'any.required': `"grade" is required`,
            'string.min': `"grade" should have a minimum length of {#limit}`,
        }),
    from: Joi.date()
        .max(today)
        .required()
        .messages({
            'date.base': `"from" should be a valid date`,
            'date.max': `"from" cannot be in the future`,
            'any.required': `"from" is required`,
        }),
        to: Joi.date()
        .min(Joi.ref('from'))
        .max('now') 
        .required()
        .messages({
          'date.min': 'To date cannot be before the from date',
          'date.max': 'To date cannot be in the future',
          'any.required': 'To date is required'
        }),
    description: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.base': `"description" should be a type of 'text'`,
            'string.empty': `"description" cannot be empty`,
            'any.required': `"description" is required`,
            'string.min': `"description" should have a minimum length of {#limit}`,
            'string.max': `"description" should have a maximum length of {#limit}`,
          
        }),
});

