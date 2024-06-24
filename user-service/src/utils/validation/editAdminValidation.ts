import Joi from 'joi';
import { Types } from 'mongoose';

export const editAdminValidation = Joi.object({
  _id: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation').optional(),
  password: Joi.string().optional(),
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  access: Joi.string().valid('can-view', 'can-edit').optional(),
  role: Joi.string().valid('sub-admin', 'admin').default('sub-admin').optional(),
  blocked: Joi.boolean().default(false).optional(),
  createdAt: Joi.date().optional(),
});
