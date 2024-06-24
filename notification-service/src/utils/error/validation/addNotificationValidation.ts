import Joi from 'joi';

export const addNotificationValidation = Joi.object({
  recipient: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "Recipient must be a string",
    "string.pattern.base": "Invalid recipient ID",
    "any.required": "Recipient is required",
  }),
  message: Joi.string().required().messages({
    "string.base": "Message must be a string",
    "any.required": "Message is required",
  }),
  sender: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "Sender must be a string",
    "string.pattern.base": "Invalid sender ID",
    "any.required": "Sender is required",
  }),
  type: Joi.string().valid('info', 'warning', 'error', 'custom').required().messages({
    "string.base": "Type must be a string",
    "any.only": "Type must be one of 'info', 'warning', 'error', 'custom'",
    "any.required": "Type is required",
  }),
 
});


