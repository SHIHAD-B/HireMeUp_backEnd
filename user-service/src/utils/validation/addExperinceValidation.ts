import joi from 'joi'

const today = new Date();
today.setHours(0, 0, 0, 0);

export const experienceValidation = joi.object({
  _id: joi.string().min(5).optional(),
  company: joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Length must be greater than 3',
      'any.required': 'Field is required'
    }),
  designation: joi.string()
    .min(5)
    .max(25)
    .pattern(/^[A-Za-z ]+$/)
    .messages({
      'string.min': 'Must be greater than 5 letters',
      'string.max': 'Must be 25 characters or less',
      'string.pattern.base': 'Field must contain only letters and spaces',
      'any.required': 'Designation is required'
    }),
  location: joi.string()
    .required()
    .messages({
      'any.required': 'Field is required'
    }),
  from: joi.date()
    .max(today.toISOString().split('T')[0])
    .required()
    .messages({
      'date.max': 'From date cannot be in the future',
      'any.required': 'From date is required'
    }),
  to: joi.date()
    .min(joi.ref('from'))
    .max(today.toISOString().split('T')[0])
    .required()
    .messages({
      'date.min': 'To date cannot be before the from date',
      'date.max': 'To date cannot be in the future',
      'any.required': 'To date is required'
    })
});
